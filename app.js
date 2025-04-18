import { transitData, getAllStopNames, getStopNameById } from './tidtabell.js';


document.addEventListener('DOMContentLoaded', () => {
    // --- Hämta data EFTER att DOM är laddad ---
    // Kontrollera att transitData finns och innehåller nödvändiga delar
    if (typeof transitData !== 'object' || transitData === null ||
        !transitData.stops || !transitData.routes || !transitData.calendar ||
        !transitData.calendarDates || !transitData.trips) {

        console.error("Tidtabellsdata (transitData eller dess nycklar) kunde inte hittas eller är ofullständig. Kontrollera att tidtabell.js laddats korrekt före app.js och exporterar 'transitData'.");
        const resultsDiv = document.getElementById('results');
        if (resultsDiv) {
            resultsDiv.innerHTML = '<p class="error">Ett kritiskt fel uppstod vid laddning av tidtabellsdata. Sidan kan inte fungera korrekt.</p>';
        }
        // Försök ändå att referera DOM-element för att undvika fler fel nedan, men funktionen blir begränsad
        const startStopInput = document.getElementById('start-stop');
        const endStopInput = document.getElementById('end-stop');
        const searchButton = document.getElementById('search-button');
        if (startStopInput) startStopInput.disabled = true;
        if (endStopInput) endStopInput.disabled = true;
        if (searchButton) searchButton.disabled = true;
        return; // Avbryt om grundläggande data saknas
    }

    // Nu är det säkert att destrukturera
    const { stops, routes, calendar, calendarDates, trips } = transitData;

    // --- DOM Referenser ---
    const startStopInput = document.getElementById('start-stop');
    const endStopInput = document.getElementById('end-stop');
    const dateInput = document.getElementById('travel-date');
    const timeInput = document.getElementById('travel-time');
    const searchButton = document.getElementById('search-button');
    const resultsDiv = document.getElementById('results');
    const stopsDatalist = document.getElementById('stops-list');

    // --- Ladda sparade hållplatser från localStorage ---
    let shouldAutoSearch = false; // Flagga för att veta om vi ska köra en sökning direkt
    let initialStartStop = null;
    let initialEndStop = null;
    try {
        const savedStart = localStorage.getItem('lastStartStop');
        const savedEnd = localStorage.getItem('lastEndStop');

        if (savedStart && savedEnd) {
            startStopInput.value = savedStart;
            endStopInput.value = savedEnd;
            initialStartStop = savedStart; // Spara för ev. auto-sök
            initialEndStop = savedEnd;     // Spara för ev. auto-sök
            shouldAutoSearch = true; // Vi har värden, så vi kan söka
            console.log(`Laddade från localStorage: start="${savedStart}", end="${savedEnd}"`);
        } else {
             console.log("Inga sparade hållplatser hittades i localStorage.");
        }
    } catch (e) {
        console.error("Kunde inte läsa från localStorage:", e);
        // Fortsätt utan sparade värden
    }

    // --- Fyll i Datalist ---
    try {
        getAllStopNames().forEach(stopName => {
            const option = document.createElement('option');
            option.value = stopName;
            stopsDatalist.appendChild(option);
        });
    } catch (e) {
        console.error("Kunde inte fylla i hållplatslistan:", e);
    }

    // --- Sätt dagens datum och tid ---
    // Detta körs ALLTID, så även vid auto-sök används aktuell tid
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const hh = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');
    dateInput.value = `${yyyy}-${mm}-${dd}`;
    timeInput.value = `${hh}:${min}`;

    // --- Event Listener ---
    searchButton.addEventListener('click', findRoutes);

    // --- Hjälpfunktioner ---

    // Konvertera HH:MM eller HH:MM+ till minuter sedan midnatt.
    function timeToMinutes(timeStr) {
        if (!timeStr || typeof timeStr !== 'string') return null;
        const hasPlus = timeStr.endsWith('+');
        const cleanTimeStr = hasPlus ? timeStr.slice(0, -1) : timeStr;

        if (!cleanTimeStr.includes(':')) return null;

        const parts = cleanTimeStr.split(':');
        if (parts.length !== 2) return null; // Säkerställ att det finns exakt en kolon

        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);

        // Kontrollera att det blev giltiga nummer och inom rimliga gränser
        if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours >= 48 || minutes < 0 || minutes >= 60) {
            // Tillåt timmar upp till 47 för tider efter midnatt (t.ex. 25:30)
            console.warn(`Ogiltig tid upptäckt i timeToMinutes: "${timeStr}"`);
            return null;
        }
        // Lägg till 1 minut om det fanns ett '+' för att säkerställa >= jämförelser
        return hours * 60 + minutes + (hasPlus ? 1 : 0);
    }


    // Hämtar hållplats-ID från namn (case-insensitive sökning)
    function getStopIdByName(name) {
        if (!name) return null; // Hantera null/undefined input
        const lowerCaseName = name.toLowerCase().trim();
        for (const stopId in stops) {
            // Säkerställ att stops[stopId] och dess namn-egenskap finns
            if (stops[stopId] && stops[stopId].name && stops[stopId].name.toLowerCase() === lowerCaseName) {
                return stopId;
            }
        }
        return null;
    }

    // Funktion för att få giltiga service_id för ett datum
    function getActiveServiceIds(dateStr) {
        const date = new Date(dateStr);
        // Hantera potentiellt ogiltigt datum
        if (isNaN(date.getTime())) {
            console.error(`Ogiltigt datumformat mottaget: ${dateStr}`);
            return [];
        }
        const yyyymmdd = dateStr.replace(/-/g, '');
        const dayOfWeek = date.getDay(); // 0=Söndag, 1=Måndag, ..., 6=Lördag
        const validServiceIds = new Set(); // Använd Set för att undvika dubbletter

        // Kolla vanliga veckodagar från calendar.txt
        for (const serviceId in calendar) {
            const rule = calendar[serviceId];
            let isActiveBasedOnDay = false;

            // Kontrollera datumintervall
            if (yyyymmdd >= rule.start_date && yyyymmdd <= rule.end_date) {
                // Kontrollera veckodag
                switch (dayOfWeek) {
                    case 0: isActiveBasedOnDay = rule.sunday === 1; break;
                    case 1: isActiveBasedOnDay = rule.monday === 1; break;
                    case 2: isActiveBasedOnDay = rule.tuesday === 1; break;
                    case 3: isActiveBasedOnDay = rule.wednesday === 1; break;
                    case 4: isActiveBasedOnDay = rule.thursday === 1; break;
                    case 5: isActiveBasedOnDay = rule.friday === 1; break;
                    case 6: isActiveBasedOnDay = rule.saturday === 1; break;
                }
            }

            if (isActiveBasedOnDay) {
                validServiceIds.add(serviceId);
            }
        }

        // Kolla undantag från calendar_dates.txt
        for (const serviceId in calendarDates) {
            const exceptionsForService = calendarDates[serviceId];
            if (exceptionsForService && exceptionsForService[yyyymmdd] !== undefined) {
                const exceptionType = exceptionsForService[yyyymmdd];
                if (exceptionType === 1) {
                    // Lägg till tjänst för detta datum
                    validServiceIds.add(serviceId);
                } else if (exceptionType === 2) {
                    // Ta bort tjänst för detta datum (om den fanns)
                    validServiceIds.delete(serviceId);
                }
            }
        }

        return Array.from(validServiceIds); // Konvertera tillbaka till Array
    }


    // --- HJÄLPFUNKTIONER för "Via"-hållplatser ---
    function getEffectiveDepartureTime(stopTimes, index) {
        if (index < 0 || index >= stopTimes.length) return null;
        if (stopTimes[index].departure_time) {
            return stopTimes[index].departure_time;
        }
        for (let k = index - 1; k >= 0; k--) {
            if (stopTimes[k].departure_time) {
                return stopTimes[k].departure_time + "+";
            }
        }
        return null;
    }

    function getEffectiveArrivalTime(stopTimes, index) {
        if (index < 0 || index >= stopTimes.length) return null;
        if (stopTimes[index].arrival_time) {
            return stopTimes[index].arrival_time;
        }
        for (let k = index - 1; k >= 0; k--) {
             if (stopTimes[k].arrival_time) {
                 return stopTimes[k].arrival_time + "+";
             }
             if (stopTimes[k].departure_time) {
                  return stopTimes[k].departure_time + "+";
             }
        }
        return null;
    }


    // --- Huvudfunktion för sökning ---
    function findRoutes() {
        const startStopName = startStopInput.value.trim();
        const endStopName = endStopInput.value.trim();
        const selectedDate = dateInput.value;
        const selectedTime = timeInput.value;

        console.log(`\n--- Ny sökning ---`);
        console.log(`Från: "${startStopName}", Till: "${endStopName}", Datum: ${selectedDate}, Tid: ${selectedTime}`);

        resultsDiv.innerHTML = '<p>Söker...</p>'; // Ge feedback direkt

        // --- Validering ---
        if (!startStopName || !endStopName || !selectedDate || !selectedTime) {
            resultsDiv.innerHTML = '<p class="error">Fyll i alla fält (Från, Till, Datum, Tid).</p>';
            console.error("Validering: Fält saknas.");
            return;
        }
         if (startStopName.toLowerCase() === endStopName.toLowerCase()) {
             resultsDiv.innerHTML = '<p class="error">Start- och destinationshållplats kan inte vara samma.</p>';
             console.error("Validering: Samma start/slut.");
            return;
        }
        const startStopId = getStopIdByName(startStopName);
        const endStopId = getStopIdByName(endStopName);

        if (!startStopId) {
             resultsDiv.innerHTML = `<p class="error">Ogiltig starthållplats vald: "${startStopName}". Välj från listan.</p>`;
             console.error(`Validering: Ogiltig starthållplats: "${startStopName}"`);
             return;
        }
         if (!endStopId) {
             resultsDiv.innerHTML = `<p class="error">Ogiltig destinationshållplats vald: "${endStopName}". Välj från listan.</p>`;
             console.error(`Validering: Ogiltig sluthållplats: "${endStopName}"`);
             return;
        }
        console.log(`Hittade ID:n: Start=${startStopId}, Slut=${endStopId}`);

        // --- SPARA till localStorage EFTER validering ---
        try {
            localStorage.setItem('lastStartStop', startStopName);
            localStorage.setItem('lastEndStop', endStopName);
            console.log(`Sparade i localStorage: start="${startStopName}", end="${endStopName}"`);
        } catch (e) {
            console.error("Kunde inte spara till localStorage:", e);
            // Informera inte användaren nödvändigtvis, men logga felet.
        }

        // --- Kontext ---
        const activeServiceIds = getActiveServiceIds(selectedDate);
        const selectedMinutes = timeToMinutes(selectedTime);

        if (activeServiceIds.length === 0) {
            resultsDiv.innerHTML = `<p class="no-result">Ingen trafik hittades för det valda datumet (${selectedDate}). Kontrollera veckodag och eventuella helgdagar.</p>`;
            console.log("Inga aktiva service_id hittades för datumet.");
            return;
        }
        if (selectedMinutes === null) {
             resultsDiv.innerHTML = `<p class="error">Ogiltigt tidformat angivet: "${selectedTime}". Använd formatet HH:MM.</p>`;
             console.error("Validering: Ogiltig tid.");
            return;
        }

        console.log(`Aktiva Service ID:n: ${activeServiceIds.join(', ')}, Vald tid i minuter: ${selectedMinutes}`);


        // Använd en setTimeout för att simulera asynkronitet och låta "Söker..." visas
        setTimeout(() => {
            let foundRoutes = [];
            const minimumTransferMinutes = 1; // Minsta tid för byte i minuter

            for (const tripId in trips) {
                const trip = trips[tripId];

                if (!activeServiceIds.includes(trip.service_id)) {
                    continue;
                }

                const stopTimes = trip.stop_times;
                if (!stopTimes || stopTimes.length < 2) continue; // Säkerställ att stopTimes finns

                // --- Sök DIREKTA Rutter (modifierad logik) ---
                let startIndex = -1;
                let endIndex = -1;
                let effectiveDepartureTime = null;
                let effectiveArrivalTime = null;
                let departureMinutes = null;

                // 1. Hitta index för starthållplatsen
                for (let i = 0; i < stopTimes.length; i++) {
                    if (stopTimes[i].stop_id === startStopId) {
                        startIndex = i;
                        break;
                    }
                }

                // 2. Om starthållplats finns, hämta effektiv avgångstid och validera mot vald tid
                if (startIndex !== -1) {
                    effectiveDepartureTime = getEffectiveDepartureTime(stopTimes, startIndex);
                    if (effectiveDepartureTime) {
                        departureMinutes = timeToMinutes(effectiveDepartureTime);
                        if (departureMinutes === null || departureMinutes < selectedMinutes) {
                            startIndex = -1; // Markera som ogiltig start (för tidig eller ogiltig tid)
                        }
                    } else {
                        startIndex = -1; // Markera som ogiltig start om ingen effektiv tid finns
                    }
                }

                // 3. Om vi har en giltig start, hitta index för sluthållplats EFTER start
                if (startIndex !== -1) {
                    for (let i = startIndex + 1; i < stopTimes.length; i++) {
                        if (stopTimes[i].stop_id === endStopId) {
                            endIndex = i;
                            break;
                        }
                    }
                }

                 // 4. Om sluthållplats finns, hämta effektiv ankomsttid
                if (endIndex !== -1) {
                    effectiveArrivalTime = getEffectiveArrivalTime(stopTimes, endIndex);
                    if (!effectiveArrivalTime) {
                        // Behandla som ogiltigt slut om ingen ankomsttid kan bestämmas
                        endIndex = -1;
                    }
                }

                 // 5. Om både giltig start och slut hittades, lägg till rutten
                if (startIndex !== -1 && endIndex !== -1) {
                    console.log(`   >>> Hittade DIREKT (Effektiv): ${tripId}, ${getStopNameById(startStopId)} (${effectiveDepartureTime}) -> ${getStopNameById(endStopId)} (${effectiveArrivalTime})`);
                    const routeInfo = routes[trip.route_id] || { name: 'Okänd linje', identifierare: trip.route_id };
                    foundRoutes.push({
                        type: 'direct',
                        tripId: tripId,
                        lineName: routeInfo.name,
                        lineId: routeInfo.identifierare,
                        startStopName: getStopNameById(startStopId),
                        endStopName: getStopNameById(endStopId),
                        departureTime: effectiveDepartureTime,
                        arrivalTime: effectiveArrivalTime,
                        departureMinutes: departureMinutes // Används för sortering
                     });
                }

                // --- Sök Rutter med ETT BYTE (modifierad logik) ---
                 let startAIndex = -1;
                 let effectiveDepartureTimeA = null;
                 let departureMinutesA = null;

                 // 1. Hitta första giltiga startindex A för denna tur
                 for (let i = 0; i < stopTimes.length; i++) {
                     if (stopTimes[i].stop_id === startStopId) {
                         const effDepTimeA = getEffectiveDepartureTime(stopTimes, i);
                         if (effDepTimeA) {
                             const depMinsA = timeToMinutes(effDepTimeA);
                             if (depMinsA !== null && depMinsA >= selectedMinutes) {
                                 startAIndex = i;
                                 effectiveDepartureTimeA = effDepTimeA;
                                 departureMinutesA = depMinsA;
                                 break; // Hittat en giltig startpunkt för ben A på denna tur
                             }
                         }
                     }
                 }

                 if (startAIndex !== -1) {
                    // Loopa igenom möjliga byteshållplatser *efter* start på tur A
                    for (let j = startAIndex + 1; j < stopTimes.length; j++) {
                        const transferStopId = stopTimes[j].stop_id;
                         // Hoppa över om bytesplatsen är samma som slutdestinationen (onödigt byte)
                        if (transferStopId === endStopId) continue;

                        const effectiveArrivalAtTransferA = getEffectiveArrivalTime(stopTimes, j);
                        const arrivalAtTransferMinutesA = timeToMinutes(effectiveArrivalAtTransferA);

                        if (arrivalAtTransferMinutesA !== null) {
                            // Sök efter en *annan* tur (tripB)
                            for (const tripIdB in trips) {
                                if (tripId === tripIdB) continue; // Inte samma tur

                                const tripB = trips[tripIdB];
                                if (!activeServiceIds.includes(tripB.service_id)) continue;

                                const stopTimesB = tripB.stop_times;
                                if (!stopTimesB || stopTimesB.length < 2) continue;

                                let transferBIndex = -1;
                                let endBIndex = -1;
                                let effectiveDepartureAtTransferB = null;
                                let departureAtTransferMinutesB = null;
                                let effectiveFinalArrivalTimeB = null;

                                // 3. Hitta första giltiga avgång från byte på tur B
                                for (let k = 0; k < stopTimesB.length; k++) {
                                    if (stopTimesB[k].stop_id === transferStopId) {
                                        const effDepTimeB = getEffectiveDepartureTime(stopTimesB, k);
                                        if (effDepTimeB) {
                                             const depMinsB = timeToMinutes(effDepTimeB);
                                             // Tidskrav: Avgång B >= Ankomst A + Minsta Bytestid
                                             if (depMinsB !== null && depMinsB >= arrivalAtTransferMinutesA + minimumTransferMinutes) {
                                                 transferBIndex = k;
                                                 effectiveDepartureAtTransferB = effDepTimeB;
                                                 departureAtTransferMinutesB = depMinsB;
                                                 break; // Hittat giltig avgång från byte
                                             }
                                         }
                                     }
                                }

                                // 4. Om giltig avgång från byte hittades, leta efter slutdestination B *efter* bytet
                                if (transferBIndex !== -1) {
                                    for (let k = transferBIndex + 1; k < stopTimesB.length; k++) {
                                        if (stopTimesB[k].stop_id === endStopId) {
                                            effectiveFinalArrivalTimeB = getEffectiveArrivalTime(stopTimesB, k);
                                            if (effectiveFinalArrivalTimeB) { // Kräver en giltig ankomsttid
                                                endBIndex = k;
                                                break; // Hittat slutstopp B
                                            }
                                        }
                                    }
                                }

                                // 6. Om hela kedjan (A -> byte -> B -> slut) hittades
                                if (transferBIndex !== -1 && endBIndex !== -1) {
                                    console.log(`   >>> Hittade BYTE (Effektiv): ${tripId} (${getStopNameById(startStopId)} ${effectiveDepartureTimeA}) -> ${tripIdB} via ${getStopNameById(transferStopId)} (${effectiveArrivalAtTransferA} / ${effectiveDepartureAtTransferB}) -> ${getStopNameById(endStopId)} (${effectiveFinalArrivalTimeB})`);
                                    const routeInfoA = routes[trip.route_id] || { name: 'Okänd linje', identifierare: trip.route_id };
                                    const routeInfoB = routes[tripB.route_id] || { name: 'Okänd linje', identifierare: tripB.route_id };

                                    foundRoutes.push({
                                        type: 'transfer',
                                        // Leg A
                                        tripIdA: tripId,
                                        lineNameA: routeInfoA.name,
                                        lineIdA: routeInfoA.identifierare,
                                        startStopNameA: getStopNameById(startStopId),
                                        departureTimeA: effectiveDepartureTimeA,
                                        transferStopName: getStopNameById(transferStopId),
                                        arrivalTimeA: effectiveArrivalAtTransferA,
                                        // Leg B
                                        tripIdB: tripIdB,
                                        lineNameB: routeInfoB.name,
                                        lineIdB: routeInfoB.identifierare,
                                        departureTimeB: effectiveDepartureAtTransferB,
                                        endStopNameB: getStopNameById(endStopId),
                                        arrivalTimeB: effectiveFinalArrivalTimeB,
                                        // Sortering
                                        departureMinutes: departureMinutesA // Sortera på FÖRSTA benets effektiva avgång
                                    });
                                     // Eftersom vi hittat ett byte för denna tur A från denna bytesplats,
                                     // behöver vi inte leta fler turer B från *samma* bytesplats (stop j).
                                     // Om vi vill visa *alla* möjliga byten, ta bort denna break.
                                     // Om vi bara vill visa det *första* bytet per bytesplats, behåll break.
                                     // För nu, låt oss tillåta flera bytesalternativ från samma hållplats A.
                                     // break; // Potentiell optimering, men kan missa alternativ
                                }
                            } 
                        } 
                    } 
                } 

            } 

            // --- Sortera och Visa Resultat ---
            console.log(`Hittade ${foundRoutes.length} potentiella rutter före sortering.`);
            resultsDiv.innerHTML = ''; // Rensa "Söker..." eller tidigare resultat

            // Sortera: 1. Avgångstid (minuter), 2. Direkt före byte, 3. Ankomsttid (minuter)
            foundRoutes.sort((a, b) => {
                if (a.departureMinutes !== b.departureMinutes) {
                    return a.departureMinutes - b.departureMinutes;
                }
                if (a.type === 'direct' && b.type === 'transfer') return -1;
                if (a.type === 'transfer' && b.type === 'direct') return 1;

                const arrivalMinsA = timeToMinutes(a.arrivalTime || a.arrivalTimeB);
                const arrivalMinsB = timeToMinutes(b.arrivalTime || b.arrivalTimeB);
                if (arrivalMinsA !== null && arrivalMinsB !== null) {
                    return arrivalMinsA - arrivalMinsB;
                }
                // Fallback om ankomsttider är ogiltiga för jämförelse
                if (arrivalMinsA !== null) return -1;
                if (arrivalMinsB !== null) return 1;
                return 0;
            });

            console.log(`Hittade ${foundRoutes.length} rutter efter sortering.`);

            if (foundRoutes.length === 0) {
                resultsDiv.innerHTML = `<p class="no-result">Inga resor hittades för ${startStopName} till ${endStopName} efter kl ${selectedTime} på ${selectedDate}.</p>`;
                console.log("Inga rutter hittades som matchade kriterierna.");
            } else {
                console.log("Visar resultat:");
                 // Begränsa antalet visade resultat om det blir för många
                const maxResultsToShow = 20;
                foundRoutes.slice(0, maxResultsToShow).forEach((route) => {
                    const item = document.createElement('div');
                    item.classList.add('result-item');

                    if (route.type === 'direct') {
                        item.innerHTML = `
                           <div class="route-header"><strong>Direkt: ${route.lineId}</strong> (${route.lineName})</div>
                           <div class="route-details">
                               Avgång: <strong>${route.departureTime}</strong> från ${getStopNameById(startStopId)}<br>
                               Ankomst: <strong>${route.arrivalTime}</strong> till ${getStopNameById(endStopId)}
                           </div>
                           <div class="route-debug"><small>(Tur: ${route.tripId})</small></div>
                       `;
                    } else if (route.type === 'transfer') {
                        const arrivalMinsA = timeToMinutes(route.arrivalTimeA);
                        const departureMinsB = timeToMinutes(route.departureTimeB);
                        let waitMinutes = "?";
                        if (arrivalMinsA !== null && departureMinsB !== null) {
                            const realArrivalMinsA = arrivalMinsA - (route.arrivalTimeA.endsWith('+') ? 1 : 0);
                            const realDepartureMinsB = departureMinsB - (route.departureTimeB.endsWith('+') ? 1 : 0);
                            waitMinutes = realDepartureMinsB - realArrivalMinsA;
                            if (waitMinutes < 0) waitMinutes = "?"; // Sanity check
                        }

                        item.innerHTML = `
                           <div class="route-header"><strong>Byte:</strong></div>
                           <div class="route-leg">
                               1. Buss <strong>${route.lineIdA}</strong> (${route.lineNameA})<br>
                               &nbsp;&nbsp; Avgång: <strong>${route.departureTimeA}</strong> från ${route.startStopNameA}<br>
                               &nbsp;&nbsp; Ankomst: <strong>${route.arrivalTimeA}</strong> vid ${route.transferStopName}
                           </div>
                           <div class="transfer-info">
                              &nbsp;&nbsp; Byt vid ${route.transferStopName} (Väntetid: ~${waitMinutes} min)
                           </div>
                           <div class="route-leg">
                               2. Buss <strong>${route.lineIdB}</strong> (${route.lineNameB})<br>
                               &nbsp;&nbsp; Avgång: <strong>${route.departureTimeB}</strong> från ${route.transferStopName}<br>
                               &nbsp;&nbsp; Ankomst: <strong>${route.arrivalTimeB}</strong> till ${route.endStopNameB}
                           </div>
                           <div class="route-debug"><small>(Turer: ${route.tripIdA} -> ${route.tripIdB})</small></div>
                       `;
                    }
                    resultsDiv.appendChild(item);
                });
                 if (foundRoutes.length > maxResultsToShow) {
                     const moreResults = document.createElement('p');
                     moreResults.innerHTML = `<i>Visar de första ${maxResultsToShow} av ${foundRoutes.length} resultaten.</i>`;
                     resultsDiv.appendChild(moreResults);
                 }
            }
            console.log(`--- Sökning klar ---`);

        }, 10); // Kort fördröjning för att UI ska uppdateras med "Söker..."

    } // Slut på findRoutes

    // --- Kör automatisk sökning om flaggan är satt ---
    if (shouldAutoSearch) {
        // Extra kontroll: Se till att de laddade värdena fortfarande är giltiga hållplatser
        // (om datan skulle ha ändrats sedan de sparades)
        if (getStopIdByName(initialStartStop) && getStopIdByName(initialEndStop)) {
            console.log("Kör automatisk sökning med sparade hållplatser och aktuell tid.");
            findRoutes(); // Kör sökningen direkt
        } else {
            console.warn("Sparade hållplatser är inte längre giltiga, avbryter automatisk sökning.");
            resultsDiv.innerHTML = '<p>Ange start och destination.</p>'; // Återställ meddelande
            // Rensa ogiltiga värden från localStorage? Valfritt.
            // try {
            //     localStorage.removeItem('lastStartStop');
            //     localStorage.removeItem('lastEndStop');
            // } catch(e) {}
        }
    } else {
        // Om ingen autosökning körs, visa standardmeddelandet
         resultsDiv.innerHTML = '<p>Välj start, destination, datum och tid för att söka.</p>';
    }


}); // Slut på DOMContentLoaded