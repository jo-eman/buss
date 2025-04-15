document.addEventListener('DOMContentLoaded', () => {
    // Hämta referenser till HTML-element
    const startStopInput = document.getElementById('start-stop');
    const endStopInput = document.getElementById('end-stop');
    const dateInput = document.getElementById('travel-date');
    const timeInput = document.getElementById('travel-time');
    const searchButton = document.getElementById('search-button');
    const resultsDiv = document.getElementById('results');
    const stopsDatalist = document.getElementById('stops-list');

    // --- Fyll i Datalist med hållplatser ---
    processedTimetableData.allaHållplatser.forEach(stop => {
        
        const option = document.createElement('option');
        option.value = stop;
        stopsDatalist.appendChild(option);
    });

    // --- Sätt dagens datum och tid som standard ---
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(today.getDate()).padStart(2, '0');
    const hh = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');
    dateInput.value = `${yyyy}-${mm}-${dd}`;
    timeInput.value = `${hh}:${min}`;


    // --- Event Listener för sökknappen ---
    searchButton.addEventListener('click', findRoutes);

    // --- Funktioner ---

    // Hjälpfunktion för att konvertera "HH:MM" till minuter sedan midnatt
    function timeToMinutes(timeStr) {
        if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) {
            return null; // Ogiltig tid
        }
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    // Hjälpfunktion för att få veckodagstyp och säsong
    function getScheduleContext(dateStr) {
        const date = new Date(dateStr);
        const dayOfWeek = date.getDay(); // 0 = Söndag, 1 = Måndag, ..., 6 = Lördag
        const yyyy_mm_dd = dateStr; // Formatet är redan YYYY-MM-DD

        let dayType;
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            dayType = "Måndag-Fredag";
        } else if (dayOfWeek === 6) {
            dayType = "Lördag"; // Kräver data
        } else {
            dayType = "Söndag"; // Kräver data (och helgdagslogik)
        }

        // Enkel säsongslogik baserat på datum i 2025
        const month = date.getMonth() + 1; // 1-12
        const day = date.getDate();
        let season = "vinter"; // Default
        if (month > 6 || (month === 6 && day >= 7)) { // Från 7 juni
           if (month < 8 || (month === 8 && day <= 17)) { // Till 17 augusti
               season = "sommar";
           }
        }

        return { dayType, season, yyyy_mm_dd };
    }


    // --- Huvudfunktion för att hitta rutter ---
    function findRoutes() {
        const startStop = startStopInput.value.trim(); // Trimma input direkt
        const endStop = endStopInput.value.trim();     // Trimma input direkt
        const selectedDate = dateInput.value;
        const selectedTime = timeInput.value;
    
        // **DEBUG LOG:** Start av sökning
        console.log(`\n--- Ny sökning ---`);
        console.log(`Från: "${startStop}", Till: "${endStop}", Datum: ${selectedDate}, Tid: ${selectedTime}`);
    
        resultsDiv.innerHTML = ''; // Rensa tidigare resultat
    
        // Validering
        if (!startStop || !endStop || !selectedDate || !selectedTime) {
            resultsDiv.innerHTML = '<p class="error">Fyll i alla fält.</p>';
            console.error("Validering misslyckades: Alla fält ej ifyllda.");
            return;
        }
        if (startStop === endStop) {
             resultsDiv.innerHTML = '<p class="error">Start- och destinationshållplats kan inte vara samma.</p>';
             console.error("Validering misslyckades: Start och destination är samma.");
            return;
        }
         // Använd processedTimetableData här om allaHållplatser finns där, annars timetableData
        const allStopsList = processedTimetableData.allaHållplatser || timetableData.allaHållplatser;
        if (!allStopsList.includes(startStop) || !allStopsList.includes(endStop)) {
             resultsDiv.innerHTML = '<p class="error">Ogiltig starthållplats eller destinationshållplats vald.</p>';
             console.error(`Validering misslyckades: Ogiltig hållplats. Start: "${startStop}", End: "${endStop}". Finns i listan? Start: ${allStopsList.includes(startStop)}, End: ${allStopsList.includes(endStop)}`);
            return;
        }
    
        const { dayType, season, yyyy_mm_dd } = getScheduleContext(selectedDate);
        const selectedMinutes = timeToMinutes(selectedTime);
    
        // **DEBUG LOG:** Kontext
        console.log(`Kontext: DayType="${dayType}", Season="${season}", DateStr="${yyyy_mm_dd}", SelectedMinutes=${selectedMinutes}`);
    
        let foundRoutes = [];
    
        // --- Sök igenom tidtabellen ---
        // **VIKTIGT:** Använd processedTimetableData här!
        processedTimetableData.linjer.forEach(linje => {
            // **DEBUG LOG:** Loopar genom linje för direkta/första ben
            // console.log(`Processing Line (A/Direct): ${linje.identifierare}`);
    
            const schema = linje.scheman.find(s => s.period === season && s.dagar.includes(dayType));
    
            if (schema) {
                // **DEBUG LOG:** Hittade schema
                // console.log(` Found matching schema: ${schema.period} / ${schema.dagar.join(',')}`);
    
                if (schema.ingaTrafikDagar && schema.ingaTrafikDagar.includes(yyyy_mm_dd)) {
                    // **DEBUG LOG:** Ingen trafik-dag
                    console.log(`  Skipping schema for ${linje.identifierare} due to Ingen Trafik-dag: ${yyyy_mm_dd}`);
                    return;
                }
    
                // --- Sök DIREKTA rutter ---
                schema.turer.forEach((tur, turIndex) => {
                     // **DEBUG LOG:** Bearbetar tur för direktresa
                     // console.log(`  Checking Direct: Tur ${turIndex} on ${linje.identifierare}`);
                     let startIndex = -1;
                     let endIndex = -1;
                     let departureTime = null;
                     let arrivalTime = null;
    
                     // 1. Hitta FÖRSTA förekomsten av startStop
                     for (let i = 0; i < tur.length; i++) {
                         if (tur[i].hållplats.trim() === startStop && tur[i].tid !== null) {
                             startIndex = i;
                             departureTime = tur[i].tid;
                             // **DEBUG LOG:** Hittade start för direkt
                             // console.log(`   Found start "${startStop}" at index ${i}, time ${departureTime}`);
                             break;
                         }
                     }
    
                     // 2. Om start hittades, leta efter FÖRSTA endStop EFTER start
                     if (startIndex !== -1) {
                         for (let i = startIndex + 1; i < tur.length; i++) {
                             if (tur[i].hållplats.trim() === endStop && tur[i].tid !== null) {
                                 endIndex = i;
                                 arrivalTime = tur[i].tid;
                                  // **DEBUG LOG:** Hittade end för direkt
                                  // console.log(`   Found end "${endStop}" at index ${i}, time ${arrivalTime}`);
                                 break;
                             }
                         }
                     }
    
                     // Kolla om en giltig direkt rutt hittades
                     if (startIndex !== -1 && endIndex !== -1) {
                         const departureMinutes = timeToMinutes(departureTime);
                         if (departureMinutes !== null && departureMinutes >= selectedMinutes) {
                              // **DEBUG LOG:** LÄGGER TILL DIREKTRESA
                              console.log(`   >>> Adding DIRECT route: ${linje.identifierare} Tur ${turIndex}, ${departureTime} -> ${arrivalTime}`);
                             foundRoutes.push({
                                 type: 'direct',
                                 lineName: linje.linjeNamn,
                                 lineId: linje.identifierare,
                                 startStop: startStop,
                                 endStop: endStop,
                                 departureTime: departureTime,
                                 arrivalTime: arrivalTime,
                                 departureMinutes: departureMinutes
                             });
                         } else {
                             // **DEBUG LOG:** Direktresa hittad men för tidig
                             // console.log(`   Direct route found but too early: Dep ${departureMinutes}, Sel ${selectedMinutes}`);
                         }
                     } else {
                          // **DEBUG LOG:** Ingen komplett direktresa på denna tur
                         // if (startIndex !== -1) console.log(`   Direct route check failed for Tur ${turIndex}: Start found at ${startIndex}, but End ("${endStop}") not found after it.`);
                     }
                }); // Slut på tur-iteration för direkt
    
                // --- Sök efter BYTEN ---
                schema.turer.forEach((turA, turAIndex) => {
                     // **DEBUG LOG:** Startar sökning för byten från Tur A
                    // console.log(` Checking Transfers: Starting Leg A = ${linje.identifierare} Tur ${turAIndex}`);
                    let startAIndex = -1;
                    let departureTimeA = null;
    
                    // Hitta start på första benet (turA)
                    for (let i = 0; i < turA.length; i++) {
                       if (turA[i].hållplats.trim() === startStop && turA[i].tid !== null) {
                           startAIndex = i;
                           departureTimeA = turA[i].tid;
                           // **DEBUG LOG:** Hittade start för Leg A
                           // console.log(`  Found start "${startStop}" for Leg A at index ${i}, time ${departureTimeA}`);
                           break;
                       }
                    }
    
                    // Om start hittades och tiden är ok
                    if (startAIndex !== -1) {
                        const departureMinutesA = timeToMinutes(departureTimeA);
                        if(departureMinutesA !== null && departureMinutesA >= selectedMinutes) {
                             // **DEBUG LOG:** Leg A tid är ok, letar byteshållplatser
                            // console.log(`  Leg A departure time ${departureTimeA} (${departureMinutesA} min) is valid. Looking for transfer stops...`);
    
                            // Hitta möjliga byteshållplatser på Tur A *efter* start
                            for (let j = startAIndex + 1; j < turA.length; j++) {
                                const transferStop = turA[j].hållplats;
                                const arrivalAtTransferTime = turA[j].tid;
                                const arrivalAtTransferMinutes = timeToMinutes(arrivalAtTransferTime);
    
                                // Om det är en giltig byteshållplats med tid
                                if (transferStop && arrivalAtTransferMinutes !== null) {
                                    // **DEBUG LOG:** Potentiell byteshållplats
                                    console.log(`   Potential Transfer Stop on Leg A: "${transferStop}" at ${arrivalAtTransferTime} (${arrivalAtTransferMinutes} min)`);
    
                                    // Sök nu efter en Tur B från en *annan* linje (eller samma) som går från transferStop till endStop
                                    // **VIKTIGT:** Använd processedTimetableData här!
                                    processedTimetableData.linjer.forEach(linjeB => {
                                         // **DEBUG LOG:** Loopar genom linje för Leg B
                                        // console.log(`    Checking Line B: ${linjeB.identifierare}`);
                                        const schemaB = linjeB.scheman.find(s => s.period === season && s.dagar.includes(dayType));
    
                                        // Om schema B finns och det inte är ingen trafik-dag
                                        if (schemaB && (!schemaB.ingaTrafikDagar || !schemaB.ingaTrafikDagar.includes(yyyy_mm_dd))) {
                                            // **DEBUG LOG:** Hittade matchande schema för linje B
                                            // console.log(`     Found matching schema for Line B ${linjeB.identifierare}: ${schemaB.period} / ${schemaB.dagar.join(',')}`);
    
                                            // Loopa genom turer i schema B
                                            schemaB.turer.forEach((turB, turBIndex) => {
                                                 // **DEBUG LOG:** Loopar genom tur B
                                                // console.log(`      Checking Tur B: ${linjeB.identifierare} Tur ${turBIndex}`);
    
                                                // Undvik att byta till exakt samma buss/tur-instans
                                                if (linje.identifierare === linjeB.identifierare && turAIndex === turBIndex) {
                                                    // **DEBUG LOG:** Hoppar över samma tur
                                                    // console.log(`       Skipping same trip instance for transfer.`);
                                                    return;
                                                }
    
                                                let transferBIndex = -1;
                                                let endBIndex = -1;
                                                let departureTimeB = null;
                                                let arrivalTimeB = null;
    
                                                // Hitta FÖRSTA förekomsten av transferStop på turB
                                                for(let k = 0; k < turB.length; k++) {
                                                    if (turB[k].hållplats.trim() === transferStop.trim() && turB[k].tid !== null) {
                                                        transferBIndex = k;
                                                        departureTimeB = turB[k].tid;
                                                         // **DEBUG LOG:** Hittade transfer stop på Leg B
                                                         // console.log(`       Found transfer stop "${transferStop}" on Tur B at index ${k}, time ${departureTimeB}`);
                                                        break;
                                                    }
                                                }
    
                                                // Om transfer stop hittades, leta efter FÖRSTA endStop EFTER transferStop på turB
                                                if (transferBIndex !== -1) {
                                                    for(let k = transferBIndex + 1; k < turB.length; k++) {
                                                        if (turB[k].hållplats.trim() === endStop && turB[k].tid !== null) {
                                                            endBIndex = k;
                                                            arrivalTimeB = turB[k].tid;
                                                             // **DEBUG LOG:** Hittade end stop på Leg B
                                                            // console.log(`       Found end stop "${endStop}" on Tur B at index ${k}, time ${arrivalTimeB}`);
                                                            break;
                                                        }
                                                    }
                                                }
    
                                                // Kolla om det är en giltig andra etapp (båda stopp funna i ordning)
                                                if (transferBIndex !== -1 && endBIndex !== -1) {
                                                    const departureMinutesB = timeToMinutes(departureTimeB);
                                                    const minimumTransferMinutes = 1; // Använd fixen
    
                                                    // **DEBUG LOG:** Kollar tidskrav för byte
                                                    console.log(`       Checking timing for transfer: Leg B departs ${departureTimeB} (${departureMinutesB} min). Need >= ${arrivalAtTransferMinutes} + ${minimumTransferMinutes}.`);
    
                                                    // Kräver att avgång B är *efter* ankomst A (med minst X min marginal)
                                                    if (departureMinutesB !== null && departureMinutesB >= arrivalAtTransferMinutes + minimumTransferMinutes) {
                                                        // **DEBUG LOG:** LÄGGER TILL BYTESRESA
                                                        console.log(`        >>> Timing OK. Adding TRANSFER route: ${linje.identifierare} Tur ${turAIndex} -> ${linjeB.identifierare} Tur ${turBIndex} via "${transferStop}"`);
                                                         foundRoutes.push({
                                                            type: 'transfer',
                                                            lineNameA: linje.linjeNamn,
                                                            lineIdA: linje.identifierare,
                                                            startStopA: startStop,
                                                            departureTimeA: departureTimeA,
                                                            transferStop: transferStop,
                                                            arrivalTimeA: arrivalAtTransferTime,
                                                            lineNameB: linjeB.linjeNamn,
                                                            lineIdB: linjeB.identifierare,
                                                            departureTimeB: departureTimeB,
                                                            endStopB: endStop,
                                                            arrivalTimeB: arrivalTimeB,
                                                            departureMinutes: departureMinutesA
                                                        });
                                                    } else {
                                                        // **DEBUG LOG:** Tidskrav för byte ej uppfyllt
                                                       // console.log(`        Timing FAILED for transfer.`);
                                                    }
                                                } // Slut på if (transferBIndex !== -1 && endBIndex !== -1)
                                            }); // Slut turB iteration
                                        } // Slut if schemaB
                                    }); // Slut linjeB iteration
                                } // Slut if transferStop valid
                            } // Slut j (transfer stop iteration)
                        } // Slut if departureMinutesA valid
                    } // Slut if startAIndex valid
                }); // Slut turA iteration (för byten)
    
            } // Slut på if(schema)
        }); // Slut på linje-iteration
    
        // **DEBUG LOG:** Före sortering
        console.log(`Found ${foundRoutes.length} potential routes before sorting.`);
    
        // --- Sortera resultaten efter avgångstid ---
        // (Använder den förbättrade sorteringen som prioriterar direkt)
        foundRoutes.sort((a, b) => {
            if (a.departureMinutes !== b.departureMinutes) {
                return a.departureMinutes - b.departureMinutes;
            }
            if (a.type !== b.type) {
                return a.type.localeCompare(b.type); // 'direct' kommer före 'transfer'
            }
            return 0;
        });
    
        // **DEBUG LOG:** Efter sortering
        console.log(`Found ${foundRoutes.length} potential routes after sorting.`);
    
        // --- Visa resultaten ---
        if (foundRoutes.length === 0) {
             // **DEBUG LOG:** Inga resultat
            console.log("No routes found.");
            // Kolla om dagen var en "Ingen trafik"-dag generellt
            let isNoTrafficDay = false;
            // **VIKTIGT:** Använd processedTimetableData här också
             processedTimetableData.linjer.forEach(linje => {
                 const schema = linje.scheman.find(s => s.period === season && s.dagar.includes(dayType));
                 if(schema && schema.ingaTrafikDagar && schema.ingaTrafikDagar.includes(yyyy_mm_dd)) {
                     isNoTrafficDay = true;
                 }
             });
    
            if(isNoTrafficDay) {
                 resultsDiv.innerHTML = `<p class="no-result">Ingen trafik på det valda datumet (${yyyy_mm_dd}). Kontrollera helgdagar.</p>`;
            } else if (dayType !== "Måndag-Fredag") {
                 resultsDiv.innerHTML = `<p class="no-result">Inga resor hittades för ${startStop} till ${endStop} efter kl ${selectedTime} på ${selectedDate}. OBS: Endast Måndag-Fredag data är för närvarande inlagd.</p>`;
            }
             else {
                 resultsDiv.innerHTML = `<p class="no-result">Inga resor hittades för ${startStop} till ${endStop} efter kl ${selectedTime} på ${selectedDate}.</p>`;
            }
    
        } else {
            // **DEBUG LOG:** Visar resultat
            console.log("Displaying results:");
            foundRoutes.forEach((route, index) => {
                // console.log(` Result ${index + 1}: Type=${route.type}, DepTime=${route.departureTime || route.departureTimeA}`);
                const item = document.createElement('div');
                item.classList.add('result-item');
                if (route.type === 'direct') {
                     item.innerHTML = `
                        <strong>Direkt: ${route.lineId}</strong> (${route.lineName})<br>
                        Avgång: <strong>${route.departureTime}</strong> från ${route.startStop}<br>
                        Ankomst: <strong>${route.arrivalTime}</strong> till ${route.endStop}
                    `;
                } else if (route.type === 'transfer') {
                     const waitMinutes = timeToMinutes(route.departureTimeB) - timeToMinutes(route.arrivalTimeA);
                     item.innerHTML = `
                        <strong>Byte:</strong><br>
                        1. Buss <strong>${route.lineIdA}</strong> (${route.lineNameA})<br>
                           &nbsp;&nbsp; Avgång: <strong>${route.departureTimeA}</strong> från ${route.startStopA}<br>
                           &nbsp;&nbsp; Ankomst: <strong>${route.arrivalTimeA}</strong> till ${route.transferStop}<br>
                        <div class="transfer-info">
                           &nbsp;&nbsp; Byt vid ${route.transferStop} (Väntetid: ${waitMinutes} min)
                        </div>
                        2. Buss <strong>${route.lineIdB}</strong> (${route.lineNameB})<br>
                           &nbsp;&nbsp; Avgång: <strong>${route.departureTimeB}</strong> från ${route.transferStop}<br>
                           &nbsp;&nbsp; Ankomst: <strong>${route.arrivalTimeB}</strong> till ${route.endStopB}
                    `;
                }
                resultsDiv.appendChild(item);
            });
        }
        console.log(`--- Sökning klar ---`);
    } // Slut på findRoutes

}); // Slut på DOMContentLoaded