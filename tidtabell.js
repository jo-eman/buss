// tidtabell.js - Normaliserad Data (GTFS-inspirerad)

// ==========================================================================
// 1. Hållplatser (Stops)
// ==========================================================================
// Unika ID:n för varje hållplats 
const stops = {
  "CEN": { name: "Centrum, Nygatan" },
  "POL": { name: "Polishuset" },
  "S13": { name: "Strandgatan 13" },
  "HRS": { name: "Hotell & Restaurangskolan" },
  "MUS": { name: "Musikinstitutet" },
  "GRI": { name: "Grindmattesvägen 2" },
  "DOK1": { name: "Doktorsvägen 1" },
  "DOK14": { name: "Doktorsvägen 14" },
  "UPP10": { name: "Uppgårdsvägen 10" },
  "UPP16": { name: "Uppgårdsvägen 16" },
  "MAX": { name: "Maxinge" },
  "TRA": { name: "Transmar" },
  "BOL": { name: "Bolstavägen" },
  "LIL": { name: "Lillåkersvägen" },
  "HOG10": { name: "Högbackagatan 10" },
  "HOG26": { name: "Högbackagatan 26" },
  "HIN": { name: "Hindersbölevägen" },
  "ORT30": { name: "Örtvägen 30" },
  "ORT40": { name: "Örtvägen 40" },
  "NAB": { name: "Nabben" },
  "SJU": { name: "Sjukhuset" },
  "STE": { name: "Stenhuggarvägen" },
  "KLI11": { name: "Klintvägen 11" },
  "KLI18": { name: "Klintvägen 18" },
  "ELV": { name: "Elverksgatan 2" },
  "RAD": { name: "Räddningsverket" },
  "YRK": { name: "Yrkesgymnasiet" },
  "IDR": { name: "Idrottsgården" },
  "NOR23": { name: "Norragatan 23" },
  "NYG17": { name: "Nygatan 17" },
  "BUS": { name: "Mariehamn, Bussplan" }, // Från Norra EM
  "TOR": { name: "Torget" },             // Från Södra
  "KYR": { name: "Kyrkan" },
  "UKR": { name: "Ukrainaplatsen" },
  "ADL": { name: "Hotell Adlon" },
  "HAM": { name: "Hamnterminalen" },
  "SKI57": { name: "Skillnadsgatan 57" },
  "SKI35": { name: "Skillnadsgatan 35" },
  "SKIV": { name: "Skillnadsgatan vsk." },
  "PIN": { name: "Pingstkyrkan" },
  "RIN": { name: "Ringvägen vsk." },
  "LOT": { name: "Lotsgatan 5" },
  "SEG13": { name: "Segelmakargatan 13" },
  "SEG3": { name: "Segelmakargatan 3" },
  "DOP": { name: "Doppingvägen vsk." },
  "SKR": { name: "Skrakvägen vsk." },
  "LER": { name: "Lervik" },
  "ESP": { name: "Espholm" },             // Från Södra Sommar / Järsö
  "NATBIO": { name: "Nåtö biologiska" },
  "BER": { name: "Bergö" },
  "GRAVP": { name: "Granö vändplan" },
  "JARV": { name: "Järsö vsk." },
  "LANVP": { name: "Langnäs vändplan" },
  "SALVP": { name: "Saltkråkan vändplan" },
  "GRAV": { name: "Granö vsk." },
  "HAV": { name: "Havsörnsvägen" },
  "LIN": { name: "Lindstigen" },
  "KÄL": { name: "Källstigen" },
  "SÄL": { name: "Sälgstigen" },
  "OVG": { name: "Övernäsgården" },
  "JUS": { name: "Juseliusvägen" },
  "GRO": { name: "Gröna Udden" },
  "PAR": { name: "Parkgatan" },
  "SKI12": { name: "Skillnadsgatan 12" },
  "TOR19": { name: "Torggatan 19" },
  "OES": { name: "Östra Esplanadgatan" },
  "SSK": { name: "Strandnäs skola" },      // Från Östra
  "KALV": { name: "Kalmsta vsk." },
  "SOL": { name: "Solberget" },
  "OKU": { name: "Österkullagatan" },
  "KALVP": { name: "Kalmarnäs vändplan" },
  "SOLV": { name: "Solberget vsk." },
  "VMA": { name: "Västra macken" },
  "TEK": { name: "Tekniska verken" },
  "ALA": { name: "Ålandsplan" },
  "BIO": { name: "Bio Savoy" },
  "STA": { name: "Stadshuset" },
  "YTS": { name: "Ytternäs skola" },
  "GRH": { name: "Granholm" },
  "NABY": { name: "Nåtö by vsk." },
  "GEH": { name: "GE-huset" },
  "OVS": { name: "Övernäs skola" }
};

// ==========================================================================
// 2. Linjer (Routes) - Behålls från föregående svar
// ==========================================================================
const routes = {
  "NOR": { name: "Norra linjen: CENTRUM – MAXINGE – HINDERSBÖLE – STRANDNÄS – SJUKHUSET – YRKESGYMNASIET – CENTRUM", identifierare: "Norra" },
  "SOD": { name: "Södra linjen: CENTRUM – HAMNTERMINALEN – YTTERNÄS – ÖSTERNÄS – KYRKAN – CENTRUM", identifierare: "Södra" },
  "OST": { name: "Östra linjen: CENTRUM – STRANDNÄS – SOLBERGET/KALMARNÄS – SJUKHUSET – CENTRUM", identifierare: "Östra" },
  "JAR": { name: "Järsölinjen: CENTRUM – YTTERNÄS – NÅTÖ – JÄRSÖ – YTTERNÄS – CENTRUM", identifierare: "Järsö" }
};

// ==========================================================================
// 3. Serviceperioder (Calendar) - Behålls från föregående svar
// ==========================================================================
const calendar = {
  "MF_WINTER_25": {
    monday: 1, tuesday: 1, wednesday: 1, thursday: 1, friday: 1,
    saturday: 0, sunday: 0,
    start_date: "20250101", end_date: "20251231"
  },
  "MF_SUMMER_25": {
    monday: 1, tuesday: 1, wednesday: 1, thursday: 1, friday: 1,
    saturday: 0, sunday: 0,
    start_date: "20250607", end_date: "20250817"
  }
};

// ==========================================================================
// 4. Undantag & Specificering av Perioder (Calendar Dates) 
// ==========================================================================
const calendarDates = {
  "MF_WINTER_25": {
    // Ta bort sommardagar från vintertjänsten
    "20250607": 2, "20250608": 2, "20250609": 2, "20250610": 2, "20250611": 2,
    "20250612": 2, "20250613": 2, "20250614": 2, "20250615": 2, "20250616": 2,
    "20250617": 2, "20250618": 2, "20250619": 2, "20250620": 2,
    "20250621": 2, "20250622": 2, "20250623": 2, "20250624": 2, "20250625": 2,
    "20250626": 2, "20250627": 2, "20250628": 2, "20250629": 2, "20250630": 2,
    "20250701": 2, "20250702": 2, "20250703": 2, "20250704": 2, "20250705": 2,
    "20250706": 2, "20250707": 2, "20250708": 2, "20250709": 2, "20250710": 2,
    "20250711": 2, "20250712": 2, "20250713": 2, "20250714": 2, "20250715": 2,
    "20250716": 2, "20250717": 2, "20250718": 2, "20250719": 2, "20250720": 2,
    "20250721": 2, "20250722": 2, "20250723": 2, "20250724": 2, "20250725": 2,
    "20250726": 2, "20250727": 2, "20250728": 2, "20250729": 2, "20250730": 2,
    "20250731": 2, "20250801": 2, "20250802": 2, "20250803": 2, "20250804": 2,
    "20250805": 2, "20250806": 2, "20250807": 2, "20250808": 2, "20250809": 2,
    "20250810": 2, "20250811": 2, "20250812": 2, "20250813": 2, "20250814": 2,
    "20250815": 2, "20250816": 2, "20250817": 2,
    // Vinterhelgdagar (Ingen trafik)
    "20250101": 2, "20250106": 2, "20250418": 2, "20250421": 2, "20250501": 2,
    "20250529": 2, "20251224": 2, "20251225": 2, "20251226": 2, "20251231": 2,
  },
  "MF_SUMMER_25": {
    // Sommarhelgdagar (Ingen trafik)
    "20250620": 2
  }
};


// ==========================================================================
// Hjälpfunktion för att skapa stop_times (intern användning här)
// ==========================================================================
function createStopTimes(stopIdSequence, timeValues) {
    const stopTimes = [];
    let sequenceCounter = 1;
    const lastIndex = stopIdSequence.length - 1;

    stopIdSequence.forEach((stopId, index) => {
        const timeValue = timeValues[index];

        if (timeValue === '-' || timeValue === '–') { // Hoppa över hållplatsen
            return;
        }

        let arrival = null;
        let departure = null;

        if (timeValue === 'Via' || timeValue === 'via') {
            arrival = null;
            departure = null;
        } else if (typeof timeValue === 'string' && timeValue.includes(':')) {
            arrival = timeValue;
            departure = timeValue;
            if (sequenceCounter === 1) { // Första stoppet i sekvensen för *denna tur*
                arrival = null;
            }
            // Sista stoppet i *sekvensen för denna tur* ska ha departure=null
            // Vi vet inte om detta är sista stoppet än, kräver att titta framåt
            // Enklare: sätt departure=null om det är sista stoppet *i den definierade sekvensen* OCH det har en tid.
            // GTFS kräver dock att sista stoppet har arrival men inte departure.
        } else {
            // Okänt värde, behandla som Via? Eller logga fel?
             console.warn(`Okänt timeValue '${timeValue}' för stopId ${stopId}. Behandlas som Via.`);
             arrival = null;
             departure = null;
        }

         stopTimes.push({
             stop_id: stopId,
             arrival_time: arrival,
             departure_time: departure, // Justeras för sista stoppet nedan
             stop_sequence: sequenceCounter
         });
         sequenceCounter++;
    });

    // Justera departure_time för det faktiska sista stoppet i denna tur
    if (stopTimes.length > 0) {
        stopTimes[stopTimes.length - 1].departure_time = null;
    }

    return stopTimes;
}

// ==========================================================================
// Definiera Hållplatssekvenser för varje ruttvariant
// ==========================================================================
export const sequences = {
    NOR_FM: ["CEN", "POL", "S13", "HRS", "MUS", "GRI", "DOK1", "DOK14", "UPP10", "UPP16", "MAX", "TRA", "BOL", "LIL", "HOG10", "HOG26", "HIN", "ORT30", "ORT40", "NAB", "SJU", "STE", "KLI11", "KLI18", "ELV", "RAD", "YRK", "IDR", "NOR23", "NYG17", "CEN"],
    NOR_EM: ["CEN", "BUS", "S13", "HRS", "MUS", "GRI", "DOK1", "DOK14", "UPP10", "UPP16", "MAX", "TRA", "BOL", "LIL", "HOG10", "HOG26", "HIN", "ORT30", "ORT40", "NAB", "SJU", "STE", "KLI11", "KLI18", "ELV", "RAD", "YRK", "IDR", "NOR23", "NYG17", "CEN"],
    SOD_NO_JARSO: ["CEN", "TOR", "KYR", "UKR", "ADL", "HAM", "SKI57", "SKI35", "SKIV", "PIN", "RIN", "LOT", "SEG13", "SEG3", "DOP", "SKR", "LER", "HAV", "LIN", "KÄL", "SÄL", "OVG", "JUS", "GRO", "PAR", "SKI12", "TOR19", "TOR", "KYR", "OES", "NYG17", "CEN"],
    SOD_JARSO: ["CEN", "TOR", "KYR", "UKR", "ADL", "HAM", "SKI57", "SKI35", "SKIV", "PIN", "RIN", "LOT", "SEG13", "SEG3", "DOP", "SKR", "LER", "ESP", "NATBIO", "BER", "GRAVP", "JARV", "LANVP", "SALVP", "JARV", "GRAV", "BER", "NATBIO", "ESP", "HAV", "LIN", "KÄL", "SÄL", "OVG", "JUS", "GRO", "PAR", "SKI12", "TOR19", "TOR", "KYR", "OES", "NYG17", "CEN"],
    OST_BASE_WINTER: ["CEN", "SSK", "NAB", "KALV", "SOL", "OKU", "KALVP", "OKU", "SOLV", "KALV", "NAB", "SSK", "SJU", "VMA", "TEK", "ALA", "BIO", "CEN"], // Bas-sekvens, "-" hanteras per tur
    OST_BASE_SUMMER: ["CEN", "SSK", "NAB", "KALV", "SOL", "OKU", "KALVP", "OKU", "SOL", "SOLV", "KALV", "NAB", "SSK", "SJU", "VMA", "TEK", "ALA", "BIO", "CEN"], // Bas-sekvens, "-" hanteras per tur
    JAR_WINTER: ["CEN", "STA", "SKIV", "PIN", "RIN", "YTS", "DOP", "SKR", "LER", "ESP", "GRH", "NATBIO", "NABY", "BER", "GRAVP", "GRAV", "JARV", "LANVP", "SALVP", "JARV", "GRAV", "BER", "NATBIO", "GRH", "ESP", "LER", "SKR", "DOP", "YTS", "RIN", "PIN", "GEH", "OVS", "NOR23", "NYG17", "CEN"],
};


// ==========================================================================
// 5. Turer (Trips) - Komplett generering
// ==========================================================================
const trips = {
    // --- Norra Linjen - Vinter Mån-Fre (Förmiddag) ---
    "NOR_0650_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_FM, ["06:50", "06:51", "Via", "06:52", "Via", "06:53", "06:55", "Via", "06:56", "Via", "06:58", "06:59", "Via", "Via", "07:00", "Via", "07:01", "07:02", "Via", "07:04", "07:06", "07:08", "Via", "Via", "07:09", "Via", "07:10", "Via", "Via", "Via", "07:16"]) },
    "NOR_0720_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_FM, ["07:20", "07:21", "Via", "07:22", "Via", "07:23", "07:25", "Via", "07:26", "Via", "07:28", "07:29", "Via", "Via", "07:30", "Via", "07:31", "07:32", "Via", "07:34", "07:36", "07:38", "Via", "Via", "07:39", "Via", "07:40", "Via", "Via", "Via", "07:46"]) },
    "NOR_0750_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_FM, ["07:50", "07:51", "Via", "07:52", "Via", "07:53", "07:55", "Via", "07:56", "Via", "07:58", "07:59", "Via", "Via", "08:00", "Via", "08:01", "08:02", "Via", "08:04", "08:06", "08:08", "Via", "Via", "08:09", "Via", "08:10", "Via", "Via", "Via", "08:16"]) },
    "NOR_0820_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_FM, ["08:20", "08:21", "Via", "08:22", "Via", "08:23", "08:25", "Via", "08:26", "Via", "08:28", "08:29", "Via", "Via", "08:30", "Via", "08:31", "08:32", "Via", "08:34", "08:36", "08:38", "Via", "Via", "08:39", "Via", "08:40", "Via", "Via", "Via", "08:46"]) },
    "NOR_0850_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_FM, ["08:50", "08:51", "Via", "08:52", "Via", "08:53", "08:55", "Via", "08:56", "Via", "08:58", "08:59", "Via", "Via", "09:00", "Via", "09:01", "09:02", "Via", "09:04", "09:06", "09:08", "Via", "Via", "09:09", "Via", "09:10", "Via", "Via", "Via", "09:16"]) },
    "NOR_0920_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_FM, ["09:20", "09:21", "Via", "09:22", "Via", "09:23", "09:25", "Via", "09:26", "Via", "09:28", "09:29", "Via", "Via", "09:30", "Via", "09:31", "09:32", "Via", "09:34", "09:36", "09:38", "Via", "Via", "09:39", "Via", "09:40", "Via", "Via", "Via", "09:46"]) },
    "NOR_0950_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_FM, ["09:50", "09:51", "Via", "09:52", "Via", "09:53", "09:55", "Via", "09:56", "Via", "09:58", "09:59", "Via", "Via", "10:00", "Via", "10:01", "10:02", "Via", "10:04", "10:06", "10:08", "Via", "Via", "10:09", "Via", "10:10", "Via", "Via", "Via", "10:16"]) },
    "NOR_1020_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_FM, ["10:20", "10:21", "Via", "10:22", "Via", "10:23", "10:25", "Via", "10:26", "Via", "10:28", "10:29", "Via", "Via", "10:30", "Via", "10:31", "10:32", "Via", "10:34", "10:36", "10:38", "Via", "Via", "10:39", "Via", "10:40", "Via", "Via", "Via", "10:46"]) },
    "NOR_1120_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_FM, ["11:20", "11:21", "Via", "11:22", "Via", "11:23", "11:25", "Via", "11:26", "Via", "11:28", "11:29", "Via", "Via", "11:30", "Via", "11:31", "11:32", "Via", "11:34", "11:36", "11:38", "Via", "Via", "11:39", "Via", "11:40", "Via", "Via", "Via", "11:46"]) },
    "NOR_1220_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_FM, ["12:20", "12:21", "Via", "12:22", "Via", "12:23", "12:25", "Via", "12:26", "Via", "12:28", "12:29", "Via", "Via", "12:30", "Via", "12:31", "12:32", "Via", "12:34", "12:36", "12:38", "Via", "Via", "12:39", "Via", "12:40", "Via", "Via", "Via", "12:46"]) },
    "NOR_1320_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_FM, ["13:20", "13:21", "Via", "13:22", "Via", "13:23", "13:25", "Via", "13:26", "Via", "13:28", "13:29", "Via", "Via", "13:30", "Via", "13:31", "13:32", "Via", "13:34", "13:36", "13:38", "Via", "Via", "13:39", "Via", "13:40", "Via", "Via", "Via", "13:46"]) },

    // --- Norra Linjen - Vinter Mån-Fre (Eftermiddag) ---
    "NOR_1420_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_EM, ["14:20", "14:21", "Via", "14:22", "Via", "14:23", "14:25", "Via", "14:26", "Via", "14:28", "14:29", "Via", "Via", "14:30", "Via", "14:31", "14:32", "Via", "14:34", "14:36", "14:38", "Via", "Via", "14:39", "Via", "14:40", "Via", "Via", "Via", "14:46"]) },
    "NOR_1450_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_EM, ["14:50", "14:51", "Via", "14:52", "Via", "14:53", "14:55", "Via", "14:56", "Via", "14:58", "14:59", "Via", "Via", "15:00", "Via", "15:01", "15:02", "Via", "15:04", "15:06", "15:08", "Via", "Via", "15:09", "Via", "15:10", "Via", "Via", "Via", "15:16"]) },
    "NOR_1520_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_EM, ["15:20", "15:21", "Via", "15:22", "Via", "15:23", "15:25", "Via", "15:26", "Via", "15:28", "15:29", "Via", "Via", "15:30", "Via", "15:31", "15:32", "Via", "15:34", "15:36", "15:38", "Via", "Via", "15:39", "Via", "15:40", "Via", "Via", "Via", "15:46"]) },
    "NOR_1550_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_EM, ["15:50", "15:51", "Via", "15:52", "Via", "15:53", "15:55", "Via", "15:56", "Via", "15:58", "15:59", "Via", "Via", "16:00", "Via", "16:01", "16:02", "Via", "16:04", "16:06", "16:08", "Via", "Via", "16:09", "Via", "16:10", "Via", "Via", "Via", "16:16"]) },
    "NOR_1620_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_EM, ["16:20", "16:21", "Via", "16:22", "Via", "16:23", "16:25", "Via", "16:26", "Via", "16:28", "16:29", "Via", "Via", "16:30", "Via", "16:31", "16:32", "Via", "16:34", "16:36", "16:38", "Via", "Via", "16:39", "Via", "16:40", "Via", "Via", "Via", "16:46"]) },
    "NOR_1650_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_EM, ["16:50", "16:51", "Via", "16:52", "Via", "16:53", "16:55", "Via", "16:56", "Via", "16:58", "16:59", "Via", "Via", "17:00", "Via", "17:01", "17:02", "Via", "17:04", "17:06", "17:08", "Via", "Via", "17:09", "Via", "17:10", "Via", "Via", "Via", "17:16"]) },
    "NOR_1720_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_EM, ["17:20", "17:21", "Via", "17:22", "Via", "17:23", "17:25", "Via", "17:26", "Via", "17:28", "17:29", "Via", "Via", "17:30", "Via", "17:31", "17:32", "Via", "17:34", "17:36", "17:38", "Via", "Via", "17:39", "Via", "17:40", "Via", "Via", "Via", "17:46"]) },
    "NOR_1750_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_EM, ["17:50", "17:51", "Via", "17:52", "Via", "17:53", "17:55", "Via", "17:56", "Via", "17:58", "17:59", "Via", "Via", "18:00", "Via", "18:01", "18:02", "Via", "18:04", "18:06", "18:08", "Via", "Via", "18:09", "Via", "18:10", "Via", "Via", "Via", "18:16"]) },
    "NOR_1820_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_EM, ["18:20", "18:21", "Via", "18:22", "Via", "18:23", "18:25", "Via", "18:26", "Via", "18:28", "18:29", "Via", "Via", "18:30", "Via", "18:31", "18:32", "Via", "18:34", "18:36", "18:38", "Via", "Via", "18:39", "Via", "18:40", "Via", "Via", "Via", "18:46"]) },
    "NOR_1920_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_EM, ["19:20", "19:21", "Via", "19:22", "Via", "19:23", "19:25", "Via", "19:26", "Via", "19:28", "19:29", "Via", "Via", "19:30", "Via", "19:31", "19:32", "Via", "19:34", "19:36", "19:38", "Via", "Via", "19:39", "Via", "19:40", "Via", "Via", "Via", "19:46"]) },
    "NOR_2020_MF_WINTER_25": { route_id: "NOR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.NOR_EM, ["20:20", "20:21", "Via", "20:22", "Via", "20:23", "20:25", "Via", "20:26", "Via", "20:28", "20:29", "Via", "Via", "20:30", "Via", "20:31", "20:32", "Via", "20:34", "20:36", "20:38", "Via", "Via", "20:39", "Via", "20:40", "Via", "Via", "Via", "20:46"]) },

    // --- Norra Linjen - Sommar Mån-Fre ---
    "NOR_0720_MF_SUMMER_25": { route_id: "NOR", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.NOR_FM, ["07:20", "07:21", "Via", "07:22", "Via", "07:23", "07:25", "Via", "07:26", "Via", "07:28", "07:29", "Via", "Via", "07:30", "Via", "07:31", "07:32", "Via", "07:34", "07:36", "07:38", "Via", "Via", "07:39", "Via", "07:40", "Via", "Via", "Via", "07:46"]) },
    "NOR_0820_MF_SUMMER_25": { route_id: "NOR", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.NOR_FM, ["08:20", "08:21", "Via", "08:22", "Via", "08:23", "08:25", "Via", "08:26", "Via", "08:28", "08:29", "Via", "Via", "08:30", "Via", "08:31", "08:32", "Via", "08:34", "08:36", "08:38", "Via", "Via", "08:39", "Via", "08:40", "Via", "Via", "Via", "08:46"]) },
    "NOR_0920_MF_SUMMER_25": { route_id: "NOR", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.NOR_FM, ["09:20", "09:21", "Via", "09:22", "Via", "09:23", "09:25", "Via", "09:26", "Via", "09:28", "09:29", "Via", "Via", "09:30", "Via", "09:31", "09:32", "Via", "09:34", "09:36", "09:38", "Via", "Via", "09:39", "Via", "09:40", "Via", "Via", "Via", "09:46"]) },
    "NOR_1020_MF_SUMMER_25": { route_id: "NOR", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.NOR_FM, ["10:20", "10:21", "Via", "10:22", "Via", "10:23", "10:25", "Via", "10:26", "Via", "10:28", "10:29", "Via", "Via", "10:30", "Via", "10:31", "10:32", "Via", "10:34", "10:36", "10:38", "Via", "Via", "10:39", "Via", "10:40", "Via", "Via", "Via", "10:46"]) },
    "NOR_1120_MF_SUMMER_25": { route_id: "NOR", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.NOR_FM, ["11:20", "11:21", "Via", "11:22", "Via", "11:23", "11:25", "Via", "11:26", "Via", "11:28", "11:29", "Via", "Via", "11:30", "Via", "11:31", "11:32", "Via", "11:34", "11:36", "11:38", "Via", "Via", "11:39", "Via", "11:40", "Via", "Via", "Via", "11:46"]) },
    "NOR_1320_MF_SUMMER_25": { route_id: "NOR", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.NOR_FM, ["13:20", "13:21", "Via", "13:22", "Via", "13:23", "13:25", "Via", "13:26", "Via", "13:28", "13:29", "Via", "Via", "13:30", "Via", "13:31", "13:32", "Via", "13:34", "13:36", "13:38", "Via", "Via", "13:39", "Via", "13:40", "Via", "Via", "Via", "13:46"]) },
    "NOR_1420_MF_SUMMER_25": { route_id: "NOR", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.NOR_FM, ["14:20", "14:21", "Via", "14:22", "Via", "14:23", "14:25", "Via", "14:26", "Via", "14:28", "14:29", "Via", "Via", "14:30", "Via", "14:31", "14:32", "Via", "14:34", "14:36", "14:38", "Via", "Via", "14:39", "Via", "14:40", "Via", "Via", "Via", "14:46"]) },
    "NOR_1520_MF_SUMMER_25": { route_id: "NOR", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.NOR_FM, ["15:20", "15:21", "Via", "15:22", "Via", "15:23", "15:25", "Via", "15:26", "Via", "15:28", "15:29", "Via", "Via", "15:30", "Via", "15:31", "15:32", "Via", "15:34", "15:36", "15:38", "Via", "Via", "15:39", "Via", "15:40", "Via", "Via", "Via", "15:46"]) },
    "NOR_1620_MF_SUMMER_25": { route_id: "NOR", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.NOR_FM, ["16:20", "16:21", "Via", "16:22", "Via", "16:23", "16:25", "Via", "16:26", "Via", "16:28", "16:29", "Via", "Via", "16:30", "Via", "16:31", "16:32", "Via", "16:34", "16:36", "16:38", "Via", "Via", "16:39", "Via", "16:40", "Via", "Via", "Via", "16:46"]) },
    "NOR_1720_MF_SUMMER_25": { route_id: "NOR", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.NOR_FM, ["17:20", "17:21", "Via", "17:22", "Via", "17:23", "17:25", "Via", "17:26", "Via", "17:28", "17:29", "Via", "Via", "17:30", "Via", "17:31", "17:32", "Via", "17:34", "17:36", "17:38", "Via", "Via", "17:39", "Via", "17:40", "Via", "Via", "Via", "17:46"]) },

    // --- Södra Linjen - Vinter Mån-Fre (ANTAGANDE baserat på sommar, ej Järsö) ---

    "SOD_0720_MF_WINTER_25": { route_id: "SOD", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["07:20", "07:22", "07:23", "Via", "Via", "07:25", "07:26", "Via", "Via", "Via", "Via", "07:29", "Via", "Via", "07:30", "07:31", "07:32", "07:33", "07:34", "Via", "07:35", "Via", "07:36", "Via", "07:37", "Via", "Via", "07:38", "Via", "07:39", "Via", "07:43"]) },
    "SOD_0750_MF_WINTER_25": { route_id: "SOD", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["07:50", "07:52", "07:53", "Via", "Via", "07:55", "07:56", "Via", "Via", "Via", "Via", "07:59", "Via", "Via", "08:00", "08:01", "08:02", "08:03", "08:04", "Via", "08:05", "Via", "08:06", "Via", "08:07", "Via", "Via", "08:08", "Via", "08:09", "Via", "08:13"]) },
    "SOD_0820_MF_WINTER_25": { route_id: "SOD", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["08:20", "08:22", "08:23", "Via", "Via", "08:25", "08:26", "Via", "Via", "Via", "Via", "08:29", "Via", "Via", "08:30", "08:31", "08:32", "08:33", "08:34", "Via", "08:35", "Via", "08:36", "Via", "08:37", "Via", "Via", "08:38", "Via", "08:39", "Via", "08:43"]) },
    "SOD_0850_MF_WINTER_25": { route_id: "SOD", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["08:50", "08:52", "08:53", "Via", "Via", "08:55", "08:56", "Via", "Via", "Via", "Via", "08:59", "Via", "Via", "09:00", "09:01", "09:02", "09:03", "09:04", "Via", "09:05", "Via", "09:06", "Via", "09:07", "Via", "Via", "09:08", "Via", "09:09", "Via", "09:13"]) },
    "SOD_1020_MF_WINTER_25": { route_id: "SOD", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["10:20", "10:22", "10:23", "Via", "Via", "10:25", "10:26", "Via", "Via", "Via", "Via", "10:29", "Via", "Via", "10:30", "10:31", "10:32", "10:33", "10:34", "Via", "10:35", "Via", "10:36", "Via", "10:37", "Via", "Via", "10:38", "Via", "10:39", "Via", "10:43"]) },
    "SOD_1050_MF_WINTER_25": { route_id: "SOD", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["10:50", "10:52", "10:53", "Via", "Via", "10:55", "10:56", "Via", "Via", "Via", "Via", "10:59", "Via", "Via", "11:00", "11:01", "11:02", "11:03", "11:04", "Via", "11:05", "Via", "11:06", "Via", "11:07", "Via", "Via", "11:08", "Via", "11:09", "Via", "11:13"]) },
    "SOD_1320_MF_WINTER_25": { route_id: "SOD", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["13:20", "13:22", "13:23", "Via", "Via", "13:25", "13:26", "Via", "Via", "Via", "Via", "13:29", "Via", "Via", "13:30", "13:31", "13:32", "13:33", "13:34", "Via", "13:35", "Via", "13:36", "Via", "13:37", "Via", "Via", "13:38", "Via", "13:39", "Via", "13:43"]) },
    "SOD_1350_MF_WINTER_25": { route_id: "SOD", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["13:50", "13:52", "13:53", "Via", "Via", "13:55", "13:56", "Via", "Via", "Via", "Via", "13:59", "Via", "Via", "14:00", "14:01", "14:02", "14:03", "14:04", "Via", "14:05", "Via", "14:06", "Via", "14:07", "Via", "Via", "14:08", "Via", "14:09", "Via", "14:13"]) },
    "SOD_1420_MF_WINTER_25": { route_id: "SOD", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["14:20", "14:22", "14:23", "Via", "Via", "14:25", "14:26", "Via", "Via", "Via", "Via", "14:29", "Via", "Via", "14:30", "14:31", "14:32", "14:33", "14:34", "Via", "14:35", "Via", "14:36", "Via", "14:37", "Via", "Via", "14:38", "Via", "14:39", "Via", "14:43"]) },
    "SOD_1550_MF_WINTER_25": { route_id: "SOD", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["15:50", "15:52", "15:53", "Via", "Via", "15:55", "15:56", "Via", "Via", "Via", "Via", "15:59", "Via", "Via", "16:00", "16:01", "16:02", "16:03", "16:04", "Via", "16:05", "Via", "16:06", "Via", "16:07", "Via", "Via", "16:08", "Via", "16:09", "Via", "16:13"]) },
    "SOD_1620_MF_WINTER_25": { route_id: "SOD", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["16:20", "16:22", "16:23", "Via", "Via", "16:25", "16:26", "Via", "Via", "Via", "Via", "16:29", "Via", "Via", "16:30", "16:31", "16:32", "16:33", "16:34", "Via", "16:35", "Via", "16:36", "Via", "16:37", "Via", "Via", "16:38", "Via", "16:39", "Via", "16:43"]) },
    "SOD_1650_MF_WINTER_25": { route_id: "SOD", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["16:50", "16:52", "16:53", "Via", "Via", "16:55", "16:56", "Via", "Via", "Via", "Via", "16:59", "Via", "Via", "17:00", "17:01", "17:02", "17:03", "17:04", "Via", "17:05", "Via", "17:06", "Via", "17:07", "Via", "Via", "17:08", "Via", "17:09", "Via", "17:13"]) },
    "SOD_1720_MF_WINTER_25": { route_id: "SOD", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["17:20", "17:22", "17:23", "Via", "Via", "17:25", "17:26", "Via", "Via", "Via", "Via", "17:29", "Via", "Via", "17:30", "17:31", "17:32", "17:33", "17:34", "Via", "17:35", "Via", "17:36", "Via", "17:37", "Via", "Via", "17:38", "Via", "17:39", "Via", "17:43"]) },
    "SOD_1750_MF_WINTER_25": { route_id: "SOD", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["17:50", "17:52", "17:53", "Via", "Via", "17:55", "17:56", "Via", "Via", "Via", "Via", "17:59", "Via", "Via", "18:00", "18:01", "18:02", "18:03", "18:04", "Via", "18:05", "Via", "18:06", "Via", "18:07", "Via", "Via", "18:08", "Via", "18:09", "Via", "18:13"]) },
    
    // --- Södra Linjen - Sommar Mån-Fre (Utan Järsö) ---
    "SOD_0720_MF_SUMMER_25": { route_id: "SOD", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["07:20", "07:22", "07:23", "Via", "Via", "07:25", "07:26", "Via", "Via", "Via", "Via", "07:29", "Via", "Via", "07:30", "07:31", "07:32", "07:33", "07:34", "Via", "07:35", "Via", "07:36", "Via", "07:37", "Via", "Via", "07:38", "Via", "07:39", "Via", "07:43"]) },
    "SOD_0750_MF_SUMMER_25": { route_id: "SOD", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["07:50", "07:52", "07:53", "Via", "Via", "07:55", "07:56", "Via", "Via", "Via", "Via", "07:59", "Via", "Via", "08:00", "08:01", "08:02", "08:03", "08:04", "Via", "08:05", "Via", "08:06", "Via", "08:07", "Via", "Via", "08:08", "Via", "08:09", "Via", "08:13"]) },
    "SOD_0820_MF_SUMMER_25": { route_id: "SOD", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["08:20", "08:22", "08:23", "Via", "Via", "08:25", "08:26", "Via", "Via", "Via", "Via", "08:29", "Via", "Via", "08:30", "08:31", "08:32", "08:33", "08:34", "Via", "08:35", "Via", "08:36", "Via", "08:37", "Via", "Via", "08:38", "Via", "08:39", "Via", "08:43"]) },
    "SOD_0850_MF_SUMMER_25": { route_id: "SOD", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["08:50", "08:52", "08:53", "Via", "Via", "08:55", "08:56", "Via", "Via", "Via", "Via", "08:59", "Via", "Via", "09:00", "09:01", "09:02", "09:03", "09:04", "Via", "09:05", "Via", "09:06", "Via", "09:07", "Via", "Via", "09:08", "Via", "09:09", "Via", "09:13"]) },
    "SOD_1020_MF_SUMMER_25": { route_id: "SOD", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["10:20", "10:22", "10:23", "Via", "Via", "10:25", "10:26", "Via", "Via", "Via", "Via", "10:29", "Via", "Via", "10:30", "10:31", "10:32", "10:33", "10:34", "Via", "10:35", "Via", "10:36", "Via", "10:37", "Via", "Via", "10:38", "Via", "10:39", "Via", "10:43"]) },
    "SOD_1050_MF_SUMMER_25": { route_id: "SOD", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["10:50", "10:52", "10:53", "Via", "Via", "10:55", "10:56", "Via", "Via", "Via", "Via", "10:59", "Via", "Via", "11:00", "11:01", "11:02", "11:03", "11:04", "Via", "11:05", "Via", "11:06", "Via", "11:07", "Via", "Via", "11:08", "Via", "11:09", "Via", "11:13"]) },
    "SOD_1320_MF_SUMMER_25": { route_id: "SOD", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["13:20", "13:22", "13:23", "Via", "Via", "13:25", "13:26", "Via", "Via", "Via", "Via", "13:29", "Via", "Via", "13:30", "13:31", "13:32", "13:33", "13:34", "Via", "13:35", "Via", "13:36", "Via", "13:37", "Via", "Via", "13:38", "Via", "13:39", "Via", "13:43"]) },
    "SOD_1350_MF_SUMMER_25": { route_id: "SOD", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["13:50", "13:52", "13:53", "Via", "Via", "13:55", "13:56", "Via", "Via", "Via", "Via", "13:59", "Via", "Via", "14:00", "14:01", "14:02", "14:03", "14:04", "Via", "14:05", "Via", "14:06", "Via", "14:07", "Via", "Via", "14:08", "Via", "14:09", "Via", "14:13"]) },
    "SOD_1420_MF_SUMMER_25": { route_id: "SOD", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["14:20", "14:22", "14:23", "Via", "Via", "14:25", "14:26", "Via", "Via", "Via", "Via", "14:29", "Via", "Via", "14:30", "14:31", "14:32", "14:33", "14:34", "Via", "14:35", "Via", "14:36", "Via", "14:37", "Via", "Via", "14:38", "Via", "14:39", "Via", "14:43"]) },
    "SOD_1550_MF_SUMMER_25": { route_id: "SOD", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["15:50", "15:52", "15:53", "Via", "Via", "15:55", "15:56", "Via", "Via", "Via", "Via", "15:59", "Via", "Via", "16:00", "16:01", "16:02", "16:03", "16:04", "Via", "16:05", "Via", "16:06", "Via", "16:07", "Via", "Via", "16:08", "Via", "16:09", "Via", "16:13"]) },
    "SOD_1620_MF_SUMMER_25": { route_id: "SOD", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["16:20", "16:22", "16:23", "Via", "Via", "16:25", "16:26", "Via", "Via", "Via", "Via", "16:29", "Via", "Via", "16:30", "16:31", "16:32", "16:33", "16:34", "Via", "16:35", "Via", "16:36", "Via", "16:37", "Via", "Via", "16:38", "Via", "16:39", "Via", "16:43"]) },
    "SOD_1650_MF_SUMMER_25": { route_id: "SOD", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["16:50", "16:52", "16:53", "Via", "Via", "16:55", "16:56", "Via", "Via", "Via", "Via", "16:59", "Via", "Via", "17:00", "17:01", "17:02", "17:03", "17:04", "Via", "17:05", "Via", "17:06", "Via", "17:07", "Via", "Via", "17:08", "Via", "17:09", "Via", "17:13"]) },
    "SOD_1720_MF_SUMMER_25": { route_id: "SOD", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["17:20", "17:22", "17:23", "Via", "Via", "17:25", "17:26", "Via", "Via", "Via", "Via", "17:29", "Via", "Via", "17:30", "17:31", "17:32", "17:33", "17:34", "Via", "17:35", "Via", "17:36", "Via", "17:37", "Via", "Via", "17:38", "Via", "17:39", "Via", "17:43"]) },
    "SOD_1750_MF_SUMMER_25": { route_id: "SOD", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.SOD_NO_JARSO, ["17:50", "17:52", "17:53", "Via", "Via", "17:55", "17:56", "Via", "Via", "Via", "Via", "17:59", "Via", "Via", "18:00", "18:01", "18:02", "18:03", "18:04", "Via", "18:05", "Via", "18:06", "Via", "18:07", "Via", "Via", "18:08", "Via", "18:09", "Via", "18:13"]) },

    // ==========================================================
    // --- Järsölinjen - Vinter Mån-Fre ---
    // ==========================================================
    "JAR_0700_MF_WINTER_25": { route_id: "JAR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.JAR_WINTER, ["07:00", "07:02", "Via", "Via", "Via", "07:06", "Via", "Via", "Via", "07:08", "Via", "07:11", "Via", "Via", "07:16", "Via", "Via", "07:22", "07:24", "07:27", "Via", "07:29", "07:31", "Via", "07:35", "Via", "Via", "Via", "07:37", "Via", "Via", "07:41", "07:44", "Via", "Via", "07:48"]) },
    "JAR_0755_MF_WINTER_25": { route_id: "JAR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.JAR_WINTER, ["07:55", "07:57", "Via", "Via", "Via", "08:01", "Via", "Via", "Via", "08:03", "Via", "08:06", "Via", "Via", "08:11", "Via", "Via", "08:17", "08:20", "08:24", "Via", "08:26", "08:28", "Via", "08:32", "Via", "Via", "Via", "08:34", "Via", "Via", "08:39", "08:42", "Via", "Via", "08:46"]) },
    "JAR_0850_MF_WINTER_25": { route_id: "JAR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.JAR_WINTER, ["08:50", "08:52", "Via", "Via", "Via", "08:56", "Via", "Via", "Via", "08:58", "Via", "09:02", "Via", "Via", "09:07", "Via", "Via", "09:13", "Via", "09:15", "Via", "09:17", "09:19", "Via", "09:23", "Via", "Via", "Via", "09:25", "Via", "Via", "09:30", "09:33", "Via", "Via", "09:37"]) }, 
    "JAR_0950_MF_WINTER_25": { route_id: "JAR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.JAR_WINTER, ["09:50", "09:52", "Via", "Via", "Via", "09:56", "Via", "Via", "Via", "09:58", "Via", "10:02", "Via", "Via", "10:07", "Via", "Via", "10:13", "Via", "10:15", "Via", "10:17", "10:19", "Via", "10:23", "Via", "Via", "Via", "10:25", "Via", "Via", "10:30", "10:33", "Via", "Via", "10:39"]) }, 
    "JAR_1320_MF_WINTER_25": { route_id: "JAR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.JAR_WINTER, ["13:20", "13:22", "Via", "Via", "Via", "13:26", "Via", "Via", "Via", "13:28", "Via", "13:32", "Via", "Via", "13:37", "Via", "Via", "13:43", "Via", "13:45", "Via", "13:47", "13:49", "Via", "13:53", "Via", "Via", "Via", "13:55", "Via", "Via", "14:00", "14:15", "Via", "Via", "14:19"]) }, 
    "JAR_1420_MF_WINTER_25": { route_id: "JAR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.JAR_WINTER, ["14:20", "14:22", "Via", "Via", "Via", "14:26", "Via", "Via", "Via", "14:28", "Via", "14:32", "Via", "Via", "14:37", "Via", "Via", "14:43", "Via", "14:45", "Via", "14:47", "14:49", "Via", "14:53", "Via", "Via", "Via", "14:55", "Via", "Via", "15:00", "15:15", "Via", "Via", "15:19"]) }, 
    "JAR_1520_MF_WINTER_25": { route_id: "JAR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.JAR_WINTER, ["15:20", "15:22", "Via", "Via", "Via", "15:26", "Via", "Via", "Via", "15:28", "Via", "15:32", "Via", "Via", "15:37", "Via", "Via", "15:43", "Via", "15:45", "Via", "15:47", "15:49", "Via", "15:53", "Via", "Via", "Via", "15:55", "Via", "Via", "16:00", "16:10", "Via", "Via", "16:14"]) }, 
    "JAR_1620_MF_WINTER_25": { route_id: "JAR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.JAR_WINTER, ["16:20", "16:22", "Via", "Via", "Via", "16:26", "Via", "Via", "Via", "16:28", "Via", "16:32", "Via", "Via", "16:37", "Via", "Via", "16:43", "Via", "16:45", "Via", "16:47", "16:49", "Via", "16:53", "Via", "Via", "Via", "16:55", "Via", "Via", "17:00", "17:03", "Via", "Via", "17:07"]) }, 
    "JAR_1720_MF_WINTER_25": { route_id: "JAR", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.JAR_WINTER, ["17:20", "17:22", "Via", "Via", "Via", "17:26", "Via", "Via", "Via", "17:28", "Via", "17:32", "Via", "Via", "17:37", "Via", "Via", "17:43", "Via", "17:45", "Via", "17:47", "17:49", "Via", "17:53", "Via", "Via", "Via", "17:55", "Via", "Via", "18:00", "18:03", "Via", "Via", "18:07"]) }, 
    // --- Södra Linjen - Sommar Mån-Fre (Med Järsö) ---
    "SOD_0920_MF_SUMMER_25": { route_id: "SOD", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.SOD_JARSO, ["09:20", "09:22", "09:23", "Via", "Via", "09:25", "09:26", "Via", "Via", "Via", "Via", "09:29", "Via", "Via", "09:30", "09:31", "09:32", "09:33", "09:36", "Via", "09:41", "Via", "09:50", "Via", "09:52", "Via", "Via", "09:56", "10:01", "10:03", "10:04", "Via", "10:05", "Via", "10:06", "Via", "10:07", "Via", "Via", "10:08", "Via", "10:09", "Via", "10:13"]) },
    "SOD_1220_MF_SUMMER_25": { route_id: "SOD", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.SOD_JARSO, ["12:20", "12:22", "12:23", "Via", "Via", "12:25", "12:26", "Via", "Via", "Via", "Via", "12:29", "Via", "Via", "12:30", "12:31", "12:32", "12:33", "12:36", "Via", "12:41", "Via", "12:50", "Via", "12:52", "Via", "Via", "12:56", "13:01", "13:03", "13:04", "Via", "13:05", "Via", "13:06", "Via", "13:07", "Via", "Via", "13:08", "Via", "13:09", "Via", "13:13"]) },
    "SOD_1450_MF_SUMMER_25": { route_id: "SOD", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.SOD_JARSO, ["14:50", "14:52", "14:53", "Via", "Via", "14:55", "14:56", "Via", "Via", "Via", "Via", "14:59", "Via", "Via", "15:00", "15:01", "15:02", "15:03", "15:06", "Via", "15:11", "Via", "15:20", "Via", "15:22", "Via", "Via", "15:26", "15:31", "15:33", "15:34", "Via", "15:35", "Via", "15:36", "Via", "15:37", "Via", "Via", "15:38", "Via", "15:39", "Via", "15:43"]) },

    // --- Östra Linjen - Vinter Mån-Fre ---
    // OBS: Baserat på antagen sekvens och noggrann tolkning av den röriga tabellen. Kan behöva justeras.
    "OST_0720_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["07:20", "-", "07:23", "Via", "-", "07:30", "07:32", "07:34", "Via", "Via", "07:37", "-", "07:38", "Via", "07:40", "Via", "Via", "07:43"]) },
    "OST_0750_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["07:50", "-", "07:53", "Via", "-", "08:00", "08:02", "08:04", "08:07", "Via", "Via", "-", "08:08", "Via", "08:10", "Via", "Via", "08:13"]) },
    "OST_0820_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["08:20", "-", "08:23", "Via", "-", "08:30", "08:32", "08:34", "08:37", "Via", "Via", "08:38", "08:39", "Via", "08:41", "Via", "Via", "08:44"]) },
    "OST_0845_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["08:45", "08:50", "Via", "Via", "08:53", "Via", "09:00", "09:02", "Via", "Via", "09:07", "-", "09:08", "Via", "09:10", "Via", "Via", "09:13"]) },
    "OST_0920_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["09:20", "-", "09:23", "Via", "-", "09:30", "09:32", "09:34", "Via", "Via", "09:37", "-", "09:38", "Via", "09:40", "Via", "Via", "09:43"]) },
    "OST_0950_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["09:50", "-", "09:53", "Via", "-", "10:00", "10:02", "10:04", "Via", "Via", "10:07", "-", "10:08", "Via", "10:10", "Via", "Via", "10:13"]) },
    "OST_1020_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["10:20", "-", "10:23", "Via", "-", "10:30", "10:32", "10:34", "Via", "Via", "10:37", "-", "10:38", "Via", "10:40", "Via", "Via", "10:43"]) },
    "OST_1310_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["13:10", "13:15", "13:18", "13:21", "-", "Via", "13:27", "Via", "Via", "Via", "13:32", "-", "13:33", "Via", "13:35", "Via", "Via", "13:38"]) },
    "OST_1340_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["13:40", "-", "Via", "Via", "13:43", "Via", "13:50", "Via", "Via", "Via", "13:54", "-", "13:56", "Via", "13:58", "Via", "Via", "14:00"]) },
    "OST_1410_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["14:10", "14:15", "14:18", "14:21", "-", "Via", "14:27", "Via", "Via", "Via", "14:32", "-", "14:33", "Via", "14:35", "Via", "Via", "14:38"]) },
    "OST_1440_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["14:40", "-", "Via", "Via", "14:43", "Via", "14:50", "Via", "Via", "Via", "14:54", "-", "14:56", "Via", "14:58", "Via", "Via", "15:00"]) },
    "OST_1510_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["15:10", "15:15", "15:18", "15:21", "-", "Via", "15:27", "Via", "Via", "Via", "15:32", "-", "15:33", "Via", "15:35", "Via", "Via", "15:38"]) },
    "OST_1540_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["15:40", "-", "15:43", "15:47", "-", "Via", "15:52", "15:54", "Via", "Via", "15:57", "-", "15:58", "Via", "16:00", "Via", "Via", "16:03"]) },
    "OST_1610_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["16:10", "-", "16:13", "16:17", "-", "Via", "16:22", "16:24", "Via", "Via", "16:27", "-", "16:28", "Via", "16:30", "Via", "Via", "16:33"]) },
    "OST_1640_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["16:40", "-", "16:43", "16:47", "-", "Via", "16:52", "16:54", "Via", "Via", "16:57", "-", "16:58", "Via", "17:00", "Via", "Via", "17:03"]) },
    "OST_1710_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["17:10", "-", "17:13", "17:17", "-", "Via", "17:22", "17:24", "Via", "Via", "17:27", "-", "17:28", "Via", "17:30", "Via", "Via", "17:33"]) },
    "OST_1740_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["17:40", "-", "17:43", "17:47", "-", "Via", "17:52", "17:54", "Via", "Via", "17:57", "-", "17:58", "Via", "18:00", "Via", "Via", "18:03"]) },
    "OST_1810_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["18:10", "-", "18:13", "18:17", "-", "Via", "18:22", "18:24", "Via", "Via", "18:27", "-", "18:28", "Via", "18:30", "Via", "Via", "18:33"]) },
    "OST_1910_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["19:10", "-", "19:13", "19:17", "-", "Via", "19:22", "19:24", "Via", "Via", "19:27", "-", "19:28", "Via", "19:30", "Via", "Via", "19:33"]) },
    "OST_2010_MF_WINTER_25": { route_id: "OST", service_id: "MF_WINTER_25", stop_times: createStopTimes(sequences.OST_BASE_WINTER, ["20:10", "-", "20:13", "20:17", "-", "Via", "20:22", "20:24", "Via", "Via", "20:27", "-", "20:28", "Via", "20:30", "Via", "Via", "20:33"]) },

     // --- Östra Linjen - Sommar Mån-Fre ---
    "OST_0650_MF_SUMMER_25": { route_id: "OST", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.OST_BASE_SUMMER, ["06:50", "-", "06:53", "Via", "-", "Via", "07:00", "07:02", "07:04", "Via", "Via", "07:07", "-", "07:08", "Via", "07:10", "Via", "Via", "07:13"]) },
    "OST_0750_MF_SUMMER_25": { route_id: "OST", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.OST_BASE_SUMMER, ["07:50", "-", "07:53", "Via", "-", "Via", "08:00", "08:02", "08:04", "Via", "Via", "08:07", "-", "08:08", "Via", "08:10", "Via", "Via", "08:13"]) },
    "OST_0850_MF_SUMMER_25": { route_id: "OST", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.OST_BASE_SUMMER, ["08:50", "-", "08:53", "Via", "-", "Via", "09:00", "09:02", "09:04", "Via", "Via", "09:07", "-", "09:08", "Via", "09:10", "Via", "Via", "09:13"]) },
    "OST_0950_MF_SUMMER_25": { route_id: "OST", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.OST_BASE_SUMMER, ["09:50", "-", "09:53", "Via", "-", "Via", "10:00", "10:02", "10:04", "Via", "Via", "10:07", "-", "10:08", "Via", "10:10", "Via", "Via", "10:13"]) },
    "OST_1050_MF_SUMMER_25": { route_id: "OST", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.OST_BASE_SUMMER, ["10:50", "-", "10:53", "Via", "-", "Via", "11:00", "11:02", "11:04", "Via", "Via", "11:07", "-", "11:08", "Via", "11:10", "Via", "Via", "11:13"]) },
    "OST_1150_MF_SUMMER_25": { route_id: "OST", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.OST_BASE_SUMMER, ["11:50", "-", "11:53", "Via", "-", "Via", "12:00", "12:02", "12:04", "Via", "Via", "12:07", "-", "12:08", "Via", "12:10", "Via", "Via", "12:13"]) },
    "OST_1350_MF_SUMMER_25": { route_id: "OST", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.OST_BASE_SUMMER, ["13:50", "-", "13:53", "Via", "13:57", "Via", "14:02", "14:04", "-", "Via", "Via", "14:07", "-", "14:08", "Via", "14:10", "Via", "Via", "14:13"]) },
    "OST_1450_MF_SUMMER_25": { route_id: "OST", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.OST_BASE_SUMMER, ["14:50", "-", "14:53", "Via", "14:57", "Via", "15:02", "15:04", "-", "Via", "Via", "15:07", "-", "15:08", "Via", "15:10", "Via", "Via", "15:13"]) },
    "OST_1550_MF_SUMMER_25": { route_id: "OST", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.OST_BASE_SUMMER, ["15:50", "-", "15:53", "Via", "15:57", "Via", "16:02", "16:04", "-", "Via", "Via", "16:07", "-", "16:08", "Via", "16:10", "Via", "Via", "16:13"]) },
    "OST_1650_MF_SUMMER_25": { route_id: "OST", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.OST_BASE_SUMMER, ["16:50", "-", "16:53", "Via", "16:57", "Via", "17:02", "17:04", "-", "Via", "Via", "17:07", "-", "17:08", "Via", "17:10", "Via", "Via", "17:13"]) },
    "OST_1750_MF_SUMMER_25": { route_id: "OST", service_id: "MF_SUMMER_25", stop_times: createStopTimes(sequences.OST_BASE_SUMMER, ["17:50", "-", "17:53", "Via", "17:57", "Via", "18:02", "18:04", "-", "Via", "Via", "18:07", "-", "18:08", "Via", "18:10", "Via", "Via", "18:13"]) }
};

// ==========================================================================
// Exportera datan
// ==========================================================================
export const transitData = {
  stops,
  routes,
  calendar,
  calendarDates,
  trips
};

// ==========================================================================
// Hjälpfunktioner
// ==========================================================================
export function getAllStopNames() {
  const stopNames = new Set();
  for (const stopId in stops) {
    stopNames.add(stops[stopId].name);
  }
  return [...stopNames].sort();
}
export function getStopNameById(stopId) {
    return stops[stopId]?.name || null;
}