// tidtabell.js
const timetableData = {
    "linjer": [
      // ==========================================================================
      // Norra Linjen
      // ==========================================================================
      {
        "linjeNamn": "Norra linjen: CENTRUM – MAXINGE – HINDERSBÖLE – STRANDNÄS – SJUKHUSET – YRKESGYMNASIET – CENTRUM",
        "identifierare": "Norra",
        "scheman": [
          {
            "period": "vinter", // 1/1–6/6 & 18/8–31/12
            "dagar": ["Måndag-Fredag"],
            "ingaTrafikDagar": ["2025-01-01", "2025-01-06", "2025-04-18", "2025-04-21", "2025-05-01", "2025-05-29", "2025-12-24", "2025-12-25", "2025-12-26", "2025-12-31"],
            "hållplatser": [ // Definiera hållplatsordningen en gång
               "Centrum, Nygatan", "Polishuset", "Strandgatan 13", "Hotell & Restaurangskolan", "Musikinstitutet",
               "Grindmattesvägen 2", "Doktorsvägen 1", "Doktorsvägen 14", "Uppgårdsvägen 10", "Uppgårdsvägen 16",
               "Maxinge", "Transmar", "Bolstavägen", "Lillåkersvägen", "Högbackagatan 10", "Högbackagatan 26",
               "Hindersbölevägen", "Örtvägen 30", "Örtvägen 40", "Nabben", "Sjukhuset", "Stenhuggarvägen",
               "Klintvägen 11", "Klintvägen 18", "Elverksgatan 2", "Räddningsverket", "Yrkesgymnasiet",
               "Idrottsgården", "Norragatan 23", "Nygatan 17", "Centrum, Nygatan" // Sista är ankomst
            ],
             "hållplatser_em": [ // Eftermiddagsversion med Bussplan
               "Centrum, Nygatan", "Mariehamn, Bussplan", "Strandgatan 13", "Hotell & Restaurangskolan", "Musikinstitutet",
               "Grindmattesvägen 2", "Doktorsvägen 1", "Doktorsvägen 14", "Uppgårdsvägen 10", "Uppgårdsvägen 16",
               "Maxinge", "Transmar", "Bolstavägen", "Lillåkersvägen", "Högbackagatan 10", "Högbackagatan 26",
               "Hindersbölevägen", "Örtvägen 30", "Örtvägen 40", "Nabben", "Sjukhuset", "Stenhuggarvägen",
               "Klintvägen 11", "Klintvägen 18", "Elverksgatan 2", "Räddningsverket", "Yrkesgymnasiet",
               "Idrottsgården", "Norragatan 23", "Nygatan 17", "Centrum, Nygatan" // Sista är ankomst
            ],
            "turer": [
               // Morgon/Förmiddag (06:50 - 13:20) - Använder 'hållplatser'
               {"avgång": "06:50", "tider": ["06:50", "06:51", null, "06:52", null, "06:53", "06:55", null, "06:56", null, "06:58", "06:59", null, null, "07:00", null, "07:01", "07:02", null, "07:04", "07:06", "07:08", null, null, "07:09", null, "07:10", null, null, null, "07:16"]},
               {"avgång": "07:20", "tider": ["07:20", "07:21", null, "07:22", null, "07:23", "07:25", null, "07:26", null, "07:28", "07:29", null, null, "07:30", null, "07:31", "07:32", null, "07:34", "07:36", "07:38", null, null, "07:39", null, "07:40", null, null, null, "07:46"]},
               {"avgång": "07:50", "tider": ["07:50", "07:51", null, "07:52", null, "07:53", "07:55", null, "07:56", null, "07:58", "07:59", null, null, "08:00", null, "08:01", "08:02", null, "08:04", "08:06", "08:08", null, null, "08:09", null, "08:10", null, null, null, "08:16"]},
               {"avgång": "08:20", "tider": ["08:20", "08:21", null, "08:22", null, "08:23", "08:25", null, "08:26", null, "08:28", "08:29", null, null, "08:30", null, "08:31", "08:32", null, "08:34", "08:36", "08:38", null, null, "08:39", null, "08:40", null, null, null, "08:46"]},
               {"avgång": "08:50", "tider": ["08:50", "08:51", null, "08:52", null, "08:53", "08:55", null, "08:56", null, "08:58", "08:59", null, null, "09:00", null, "09:01", "09:02", null, "09:04", "09:06", "09:08", null, null, "09:09", null, "09:10", null, null, null, "09:16"]},
               {"avgång": "09:20", "tider": ["09:20", "09:21", null, "09:22", null, "09:23", "09:25", null, "09:26", null, "09:28", "09:29", null, null, "09:30", null, "09:31", "09:32", null, "09:34", "09:36", "09:38", null, null, "09:39", null, "09:40", null, null, null, "09:46"]},
               {"avgång": "09:50", "tider": ["09:50", "09:51", null, "09:52", null, "09:53", "09:55", null, "09:56", null, "09:58", "09:59", null, null, "10:00", null, "10:01", "10:02", null, "10:04", "10:06", "10:08", null, null, "10:09", null, "10:10", null, null, null, "10:16"]},
               {"avgång": "10:20", "tider": ["10:20", "10:21", null, "10:22", null, "10:23", "10:25", null, "10:26", null, "10:28", "10:29", null, null, "10:30", null, "10:31", "10:32", null, "10:34", "10:36", "10:38", null, null, "10:39", null, "10:40", null, null, null, "10:46"]},
               {"avgång": "11:20", "tider": ["11:20", "11:21", null, "11:22", null, "11:23", "11:25", null, "11:26", null, "11:28", "11:29", null, null, "11:30", null, "11:31", "11:32", null, "11:34", "11:36", "11:38", null, null, "11:39", null, "11:40", null, null, null, "11:46"]},
               {"avgång": "12:20", "tider": ["12:20", "12:21", null, "12:22", null, "12:23", "12:25", null, "12:26", null, "12:28", "12:29", null, null, "12:30", null, "12:31", "12:32", null, "12:34", "12:36", "12:38", null, null, "12:39", null, "12:40", null, null, null, "12:46"]},
               {"avgång": "13:20", "tider": ["13:20", "13:21", null, "13:22", null, "13:23", "13:25", null, "13:26", null, "13:28", "13:29", null, null, "13:30", null, "13:31", "13:32", null, "13:34", "13:36", "13:38", null, null, "13:39", null, "13:40", null, null, null, "13:46"]},
               // Eftermiddag (14:20 - 20:20) - Använder 'hållplatser_em'
               {"avgång": "14:20", "use_stops": "em", "tider": ["14:20", "14:21", null, "14:22", null, "14:23", "14:25", null, "14:26", null, "14:28", "14:29", null, null, "14:30", null, "14:31", "14:32", null, "14:34", "14:36", "14:38", null, null, "14:39", null, "14:40", null, null, null, "14:46"]},
               {"avgång": "14:50", "use_stops": "em", "tider": ["14:50", "14:51", null, "14:52", null, "14:53", "14:55", null, "14:56", null, "14:58", "14:59", null, null, "15:00", null, "15:01", "15:02", null, "15:04", "15:06", "15:08", null, null, "15:09", null, "15:10", null, null, null, "15:16"]},
               {"avgång": "15:20", "use_stops": "em", "tider": ["15:20", "15:21", null, "15:22", null, "15:23", "15:25", null, "15:26", null, "15:28", "15:29", null, null, "15:30", null, "15:31", "15:32", null, "15:34", "15:36", "15:38", null, null, "15:39", null, "15:40", null, null, null, "15:46"]},
               {"avgång": "15:50", "use_stops": "em", "tider": ["15:50", "15:51", null, "15:52", null, "15:53", "15:55", null, "15:56", null, "15:58", "15:59", null, null, "16:00", null, "16:01", "16:02", null, "16:04", "16:06", "16:08", null, null, "16:09", null, "16:10", null, null, null, "16:16"]},
               {"avgång": "16:20", "use_stops": "em", "tider": ["16:20", "16:21", null, "16:22", null, "16:23", "16:25", null, "16:26", null, "16:28", "16:29", null, null, "16:30", null, "16:31", "16:32", null, "16:34", "16:36", "16:38", null, null, "16:39", null, "16:40", null, null, null, "16:46"]},
               {"avgång": "16:50", "use_stops": "em", "tider": ["16:50", "16:51", null, "16:52", null, "16:53", "16:55", null, "16:56", null, "16:58", "16:59", null, null, "17:00", null, "17:01", "17:02", null, "17:04", "17:06", "17:08", null, null, "17:09", null, "17:10", null, null, null, "17:16"]},
               {"avgång": "17:20", "use_stops": "em", "tider": ["17:20", "17:21", null, "17:22", null, "17:23", "17:25", null, "17:26", null, "17:28", "17:29", null, null, "17:30", null, "17:31", "17:32", null, "17:34", "17:36", "17:38", null, null, "17:39", null, "17:40", null, null, null, "17:46"]},
               {"avgång": "17:50", "use_stops": "em", "tider": ["17:50", "17:51", null, "17:52", null, "17:53", "17:55", null, "17:56", null, "17:58", "17:59", null, null, "18:00", null, "18:01", "18:02", null, "18:04", "18:06", "18:08", null, null, "18:09", null, "18:10", null, null, null, "18:16"]},
               {"avgång": "18:20", "use_stops": "em", "tider": ["18:20", "18:21", null, "18:22", null, "18:23", "18:25", null, "18:26", null, "18:28", "18:29", null, null, "18:30", null, "18:31", "18:32", null, "18:34", "18:36", "18:38", null, null, "18:39", null, "18:40", null, null, null, "18:46"]},
               {"avgång": "19:20", "use_stops": "em", "tider": ["19:20", "19:21", null, "19:22", null, "19:23", "19:25", null, "19:26", null, "19:28", "19:29", null, null, "19:30", null, "19:31", "19:32", null, "19:34", "19:36", "19:38", null, null, "19:39", null, "19:40", null, null, null, "19:46"]},
               {"avgång": "20:20", "use_stops": "em", "tider": ["20:20", "20:21", null, "20:22", null, "20:23", "20:25", null, "20:26", null, "20:28", "20:29", null, null, "20:30", null, "20:31", "20:32", null, "20:34", "20:36", "20:38", null, null, "20:39", null, "20:40", null, null, null, "20:46"]}
            ]
          },
          {
            "period": "sommar", // 7/6–17/8
            "dagar": ["Måndag-Fredag"],
            "ingaTrafikDagar": ["2025-06-20"],
            "hållplatser": [ // Samma som vinter morgon
               "Centrum, Nygatan", "Polishuset", "Strandgatan 13", "Hotell & Restaurangskolan", "Musikinstitutet",
               "Grindmattesvägen 2", "Doktorsvägen 1", "Doktorsvägen 14", "Uppgårdsvägen 10", "Uppgårdsvägen 16",
               "Maxinge", "Transmar", "Bolstavägen", "Lillåkersvägen", "Högbackagatan 10", "Högbackagatan 26",
               "Hindersbölevägen", "Örtvägen 30", "Örtvägen 40", "Nabben", "Sjukhuset", "Stenhuggarvägen",
               "Klintvägen 11", "Klintvägen 18", "Elverksgatan 2", "Räddningsverket", "Yrkesgymnasiet",
               "Idrottsgården", "Norragatan 23", "Nygatan 17", "Centrum, Nygatan"
            ],
            "turer": [
               {"avgång": "07:20", "tider": ["07:20", "07:21", null, "07:22", null, "07:23", "07:25", null, "07:26", null, "07:28", "07:29", null, null, "07:30", null, "07:31", "07:32", null, "07:34", "07:36", "07:38", null, null, "07:39", null, "07:40", null, null, null, "07:46"]},
               {"avgång": "08:20", "tider": ["08:20", "08:21", null, "08:22", null, "08:23", "08:25", null, "08:26", null, "08:28", "08:29", null, null, "08:30", null, "08:31", "08:32", null, "08:34", "08:36", "08:38", null, null, "08:39", null, "08:40", null, null, null, "08:46"]},
               {"avgång": "09:20", "tider": ["09:20", "09:21", null, "09:22", null, "09:23", "09:25", null, "09:26", null, "09:28", "09:29", null, null, "09:30", null, "09:31", "09:32", null, "09:34", "09:36", "09:38", null, null, "09:39", null, "09:40", null, null, null, "09:46"]},
               {"avgång": "10:20", "tider": ["10:20", "10:21", null, "10:22", null, "10:23", "10:25", null, "10:26", null, "10:28", "10:29", null, null, "10:30", null, "10:31", "10:32", null, "10:34", "10:36", "10:38", null, null, "10:39", null, "10:40", null, null, null, "10:46"]},
               {"avgång": "11:20", "tider": ["11:20", "11:21", null, "11:22", null, "11:23", "11:25", null, "11:26", null, "11:28", "11:29", null, null, "11:30", null, "11:31", "11:32", null, "11:34", "11:36", "11:38", null, null, "11:39", null, "11:40", null, null, null, "11:46"]},
               {"avgång": "13:20", "tider": ["13:20", "13:21", null, "13:22", null, "13:23", "13:25", null, "13:26", null, "13:28", "13:29", null, null, "13:30", null, "13:31", "13:32", null, "13:34", "13:36", "13:38", null, null, "13:39", null, "13:40", null, null, null, "13:46"]},
               {"avgång": "14:20", "tider": ["14:20", "14:21", null, "14:22", null, "14:23", "14:25", null, "14:26", null, "14:28", "14:29", null, null, "14:30", null, "14:31", "14:32", null, "14:34", "14:36", "14:38", null, null, "14:39", null, "14:40", null, null, null, "14:46"]},
               {"avgång": "15:20", "tider": ["15:20", "15:21", null, "15:22", null, "15:23", "15:25", null, "15:26", null, "15:28", "15:29", null, null, "15:30", null, "15:31", "15:32", null, "15:34", "15:36", "15:38", null, null, "15:39", null, "15:40", null, null, null, "15:46"]},
               {"avgång": "16:20", "tider": ["16:20", "16:21", null, "16:22", null, "16:23", "16:25", null, "16:26", null, "16:28", "16:29", null, null, "16:30", null, "16:31", "16:32", null, "16:34", "16:36", "16:38", null, null, "16:39", null, "16:40", null, null, null, "16:46"]},
               {"avgång": "17:20", "tider": ["17:20", "17:21", null, "17:22", null, "17:23", "17:25", null, "17:26", null, "17:28", "17:29", null, null, "17:30", null, "17:31", "17:32", null, "17:34", "17:36", "17:38", null, null, "17:39", null, "17:40", null, null, null, "17:46"]}
            ]
          }
          // ... Här skulle scheman för Lördag/Söndag läggas till om datan fanns ...
        ]
      },
      // ==========================================================================
      // Östra Linjen
      // ==========================================================================
      {
         "linjeNamn": "Östra linjen: CENTRUM – STRANDNÄS – SOLBERGET/KALMARNÄS – SJUKHUSET – CENTRUM",
         "identifierare": "Östra",
         "scheman": [
              {
                "period": "vinter", // 1/1–6/6 & 18/8–31/12
                "dagar": ["Måndag-Fredag"],
                "ingaTrafikDagar": ["2025-01-01", "2025-01-06", "2025-04-18", "2025-04-21", "2025-05-01", "2025-05-29", "2025-12-24", "2025-12-25", "2025-12-26", "2025-12-31"],
                "hållplatser": [ // Grundläggande rutt
                  "Centrum, Nygatan", "Strandnäs skola", "Nabben", "Kalmsta vsk.", "Solberget", "Österkullagatan",
                  "Kalmarnäs vändplan", "Österkullagatan", "Solberget vsk.", "Kalmsta vsk.", "Nabben",
                  "Strandnäs skola", "Sjukhuset", "Västra macken", "Tekniska verken", "Ålandsplan",
                  "Bio Savoy", "Centrum, Nygatan"
                ],
                // Tiderna nedan inkluderar "override" logik från noteringarna mellan rubrik och tabell
                "turer": [

                  {"avgång": "07:20", "tider": ["07:20", null, "07:23", null, null, "07:30", "07:32", "07:34", null, null, "07:37", null, "07:38", null, "07:40", null, null, "07:43"]},

                  {"avgång": "07:50", "tider": ["07:50", null, "07:53", null, null, "08:00", "08:02", "08:04", "08:07", null, null, null, "08:08", null, "08:10", null, null, "08:13"]},

                  {"avgång": "08:20", "tider": ["08:20", null, "08:23", null, null, "08:30", "08:32", "08:34", "08:37", null, null, "08:38", "08:39", null, "08:41", null, null, "08:44"]},

                  {"avgång": "08:45", "tider": ["08:45", "08:50", null, null, "08:53", null, "09:00", "09:02", null, null, "09:07", null, "09:08", null, "09:10", null, null, "09:13"]},

                  {"avgång": "09:20", "tider": ["09:20", null, "09:23", null, null, "09:30", "09:32", "09:34", null, null, "09:37", null, "09:38", null, "09:40", null, null, "09:43"]},

                  {"avgång": "09:50", "tider": ["09:50", null, "09:53", null, null, "10:00", "10:02", "10:04", null, null, "10:07", null, "10:08", null, "10:10", null, null, "10:13"]},

                  {"avgång": "10:20", "tider": ["10:20", null, "10:23", null, null, "10:30", "10:32", "10:34", null, null, "10:37", null, "10:38", null, "10:40", null, null, "10:43"]},

                  {"avgång": "13:10", "tider": ["13:10", "13:15", "13:18", "13:21", null, null, "13:27", null, null, null, "13:32", null, "13:33", null, "13:35", null, null, "13:38"]},

                  {"avgång": "13:40", "tider": ["13:40", null, null, null, "13:43", null, "13:50", null, null, null, "13:54", null, "13:56", null, "13:58", null, null, "14:00"]},

                  {"avgång": "14:10", "tider": ["14:10", "14:15", "14:18", "14:21", null, null, "14:27", null, null, null, "14:32", null, "14:33", null, "14:35", null, null, "14:38"]},

                  {"avgång": "14:40", "tider": ["14:40", null, null, null, "14:43", null, "14:50", null, null, null, "14:54", null, "14:56", null, "14:58", null, null, "15:00"]},

                  {"avgång": "15:10", "tider": ["15:10", "15:15", "15:18", "15:21", null, null, "15:27", null, null, null, "15:32", null, "15:33", null, "15:35", null, null, "15:38"]},

                  {"avgång": "15:40", "tider": ["15:40", null, "15:43", "15:47", null, null, "15:52", "15:54", null, null, "15:57", null, "15:58", null, "16:00", null, null, "16:03"]},

                  {"avgång": "16:10", "tider": ["16:10", null, "16:13", "16:17", null, null, "16:22", "16:24", null, null, "16:27", null, "16:28", null, "16:30", null, null, "16:33"]},

                  {"avgång": "16:40", "tider": ["16:40", null, "16:43", "16:47", null, null, "16:52", "16:54", null, null, "16:57", null, "16:58", null, "17:00", null, null, "17:03"]},

                  {"avgång": "17:10", "tider": ["17:10", null, "17:13", "17:17", null, null, "17:22", "17:24", null, null, "17:27", null, "17:28", null, "17:30", null, null, "17:33"]},

                  {"avgång": "17:40", "tider": ["17:40", null, "17:43", "17:47", null, null, "17:52", "17:54", null, null, "17:57", null, "17:58", null, "18:00", null, null, "18:03"]},

                  {"avgång": "18:10", "tider": ["18:10", null, "18:13", "18:17", null, null, "18:22", "18:24", null, null, "18:27", null, "18:28", null, "18:30", null, null, "18:33"]},

                  {"avgång": "19:10", "tider": ["19:10", null, "19:13", "19:17", null, null, "19:22", "19:24", null, null, "19:27", null, "19:28", null, "19:30", null, null, "19:33"]},

                  {"avgång": "20:10", "tider": ["20:10", null, "20:13", "20:17", null, null, "20:22", "20:24", null, null, "20:27", null, "20:28", null, "20:30", null, null, "20:33"]}
               ]
              },
               {
                "period": "sommar", // 7/6–17/8
                "dagar": ["Måndag-Fredag"],
                "ingaTrafikDagar": ["2025-06-20"],
                "hållplatser": [ // Grundläggande rutt (liknande vinter)
                  "Centrum, Nygatan", "Strandnäs skola", "Nabben", "Kalmsta vsk.", "Solberget", "Österkullagatan",
                  "Kalmarnäs vändplan", "Österkullagatan", "Solberget", "Solberget vsk.", "Kalmsta vsk.", "Nabben",
                  "Strandnäs skola", "Sjukhuset", "Västra macken", "Tekniska verken", "Ålandsplan",
                  "Bio Savoy", "Centrum, Nygatan"
                ],
                "turer": [
                  {"avgång": "06:50", "tider": ["06:50", null, "06:53", null, null, null, "07:00", "07:02", "07:04", null, null, "07:07", null, "07:08", null, "07:10", null, null, "07:13"]},
                  {"avgång": "07:50", "tider": ["07:50", null, "07:53", null, null, null, "08:00", "08:02", "08:04", null, null, "08:07", null, "08:08", null, "08:10", null, null, "08:13"]},
                  {"avgång": "08:50", "tider": ["08:50", null, "08:53", null, null, null, "09:00", "09:02", "09:04", null, null, "09:07", null, "09:08", null, "09:10", null, null, "09:13"]},
                  {"avgång": "09:50", "tider": ["09:50", null, "09:53", null, null, null, "10:00", "10:02", "10:04", null, null, "10:07", null, "10:08", null, "10:10", null, null, "10:13"]},
                  {"avgång": "10:50", "tider": ["10:50", null, "10:53", null, null, null, "11:00", "11:02", "11:04", null, null, "11:07", null, "11:08", null, "11:10", null, null, "11:13"]},
                  {"avgång": "11:50", "tider": ["11:50", null, "11:53", null, null, null, "12:00", "12:02", "12:04", null, null, "12:07", null, "12:08", null, "12:10", null, null, "12:13"]},
                  // Avgång: 13:50 (Special via Solberget)
                  {"avgång": "13:50", "tider": ["13:50", null, "13:53", null, "13:57", null, "14:02", "14:04", null, null, null, "14:07", null, "14:08", null, "14:10", null, null, "14:13"]},
                  // Avgång: 14:50 (Special via Solberget)
                  {"avgång": "14:50", "tider": ["14:50", null, "14:53", null, "14:57", null, "15:02", "15:04", null, null, null, "15:07", null, "15:08", null, "15:10", null, null, "15:13"]},
                  // Avgång: 15:50 (Special via Solberget)
                  {"avgång": "15:50", "tider": ["15:50", null, "15:53", null, "15:57", null, "16:02", "16:04", null, null, null, "16:07", null, "16:08", null, "16:10", null, null, "16:13"]},
                  // Avgång: 16:50 (Special via Solberget)
                  {"avgång": "16:50", "tider": ["16:50", null, "16:53", null, "16:57", null, "17:02", "17:04", null, null, null, "17:07", null, "17:08", null, "17:10", null, null, "17:13"]},
                   // Avgång: 17:50 (Special via Solberget)
                  {"avgång": "17:50", "tider": ["17:50", null, "17:53", null, "17:57", null, "18:02", "18:04", null, null, null, "18:07", null, "18:08", null, "18:10", null, null, "18:13"]}
                ]
              }
              // ... Lördag/Söndag ...
         ]
      },
       // ==========================================================================
       // Södra Linjen
       // ==========================================================================
       {
        "linjeNamn": "Södra linjen: CENTRUM – HAMNTERMINALEN – YTTERNÄS – ÖSTERNÄS – KYRKAN – CENTRUM",
        "identifierare": "Södra",
        "scheman": [
          {
            "period": "vinter", // 1/1–6/6 och 18/8–31/12
            "dagar": ["Måndag-Fredag"],
            "ingaTrafikDagar": ["2025-01-01", "2025-01-06", "2025-04-18", "2025-04-21", "2025-05-01", "2025-05-29", "2025-12-24", "2025-12-25", "2025-12-26", "2025-12-31"],
            "hållplatser": [
                "Centrum, Nygatan", "Torget", "Kyrkan", "Ukrainaplatsen", "Hotell Adlon", "Hamnterminalen",
                "Skillnadsgatan 57", "Skillnadsgatan 35", "Skillnadsgatan vsk.", "Pingstkyrkan", "Ringvägen vsk.",
                "Lotsgatan 5", "Segelmakargatan 13", "Segelmakargatan 3", "Doppingvägen vsk.", "Skrakvägen vsk.",
                "Lervik", "Havsörnsvägen", "Lindstigen", "Källstigen", "Sälgstigen", "Övernäsgården",
                "Juseliusvägen", "Gröna Udden", "Parkgatan", "Skillnadsgatan 12", "Torggatan 19",
                "Torget", "Kyrkan", "Östra Esplanadgatan", "Nygatan 17", "Centrum, Nygatan" // Ankomst
            ],
            "turer": [
                // FM (06:50 - 13:50)
                {"avgång": "06:50", "tider": ["06:50", "06:52", "06:53", null, null, "06:55", "06:56", null, null, null, null, "06:59", null, null, "07:00", "07:01", "07:02", "07:03", "07:04", null, "07:05", null, "07:06", null, "07:07", null, null, "07:08", null, "07:09", null, "07:13"]},
                {"avgång": "07:20", "tider": ["07:20", "07:22", "07:23", null, null, "07:25", "07:26", null, null, null, null, "07:29", null, null, "07:30", "07:31", "07:32", "07:33", "07:34", null, "07:35", null, "07:36", null, "07:37", null, null, "07:38", null, "07:39", null, "07:43"]},
                {"avgång": "07:50", "tider": ["07:50", "07:52", "07:53", null, null, "07:55", "07:56", null, null, null, null, "07:59", null, null, "08:00", "08:01", "08:02", "08:03", "08:04", null, "08:05", null, "08:06", null, "08:07", null, null, "08:08", null, "08:09", null, "08:13"]},
                {"avgång": "08:20", "tider": ["08:20", "08:22", "08:23", null, null, "08:25", "08:26", null, null, null, null, "08:29", null, null, "08:30", "08:31", "08:32", "08:03", "08:34", null, "08:35", null, "08:36", null, "08:37", null, null, "08:38", null, "08:39", null, "08:43"]}, // Fel i original på Havsörnsv? 08:33 antas
                {"avgång": "08:50", "tider": ["08:50", "08:52", "08:53", null, null, "08:55", "08:56", null, null, null, null, "08:59", null, null, "09:00", "09:01", "09:02", "09:03", "09:04", null, "09:05", null, "09:06", null, "09:07", null, null, "09:08", null, "09:09", null, "09:13"]},
                {"avgång": "09:20", "tider": ["09:20", "09:22", "09:23", null, null, "09:25", "09:26", null, null, null, null, "09:29", null, null, "09:30", "09:31", "09:32", "09:33", "09:34", null, "09:35", null, "09:36", null, "09:37", null, null, "09:38", null, "09:39", null, "09:43"]},
                {"avgång": "09:50", "tider": ["09:50", "09:52", "09:53", null, null, "09:55", "09:56", null, null, null, null, "09:59", null, null, "10:00", "10:01", "10:02", "10:03", "10:04", null, "10:05", null, "10:06", null, "10:07", null, null, "10:08", null, "10:09", null, "10:13"]},
                {"avgång": "10:50", "tider": ["10:50", "10:52", "10:53", null, null, "10:55", "10:56", null, null, null, null, "10:59", null, null, "11:00", "11:01", "11:02", "11:03", "11:04", null, "11:05", null, "11:06", null, "11:07", null, null, "11:08", null, "11:09", null, "11:13"]},
                {"avgång": "11:50", "tider": ["11:50", "11:52", "11:53", null, null, "11:55", "11:56", null, null, null, null, "11:59", null, null, "12:00", "12:01", "12:02", "12:03", "12:04", null, "12:05", null, "12:06", null, "12:07", null, null, "12:08", null, "12:09", null, "12:13"]},
                {"avgång": "12:50", "tider": ["12:50", "12:52", "12:53", null, null, "12:55", "12:56", null, null, null, null, "12:59", null, null, "13:00", "13:01", "13:02", "13:03", "13:04", null, "13:05", null, "13:06", null, "13:07", null, null, "13:08", null, "13:09", null, "13:13"]},
                {"avgång": "13:50", "tider": ["13:50", "13:52", "13:53", null, null, "13:55", "13:56", null, null, null, null, "13:59", null, null, "14:00", "14:01", "14:02", "14:03", "14:04", null, "14:05", null, "14:06", null, "14:07", null, null, "14:08", null, "14:09", null, "14:13"]},
                // EM (14:20 - 20:50)
                {"avgång": "14:20", "tider": ["14:20", "14:22", "14:23", null, null, "14:25", "14:26", null, null, null, null, "14:29", null, null, "14:30", "14:31", "14:32", "14:33", "14:34", null, "14:35", null, "14:36", null, "14:37", null, null, "14:38", null, "14:39", null, "14:43"]},
                {"avgång": "14:50", "tider": ["14:50", "14:52", "14:53", null, null, "14:55", "14:56", null, null, null, null, "14:59", null, null, "15:00", "15:01", "15:02", "15:03", "15:04", null, "15:05", null, "15:06", null, "15:07", null, null, "15:08", null, "15:09", null, "15:13"]},
                {"avgång": "15:20", "tider": ["15:20", "15:22", "15:23", null, null, "15:25", "15:26", null, null, null, null, "15:29", null, null, "15:30", "15:31", "15:32", "15:33", "15:34", null, "15:35", null, "15:36", null, "15:37", null, null, "15:38", null, "15:39", null, "15:43"]},
                {"avgång": "15:50", "tider": ["15:50", "15:52", "15:53", null, null, "15:55", "15:56", null, null, null, null, "15:59", null, null, "16:00", "16:01", "16:02", "16:03", "16:04", null, "16:05", null, "16:06", null, "16:07", null, null, "16:08", null, "16:09", null, "16:13"]},
                {"avgång": "16:20", "tider": ["16:20", "16:22", "16:23", null, null, "16:25", "16:26", null, null, null, null, "16:29", null, null, "16:30", "16:31", "16:32", "16:33", "16:34", null, "16:35", null, "16:36", null, "16:37", null, null, "16:38", null, "16:39", null, "16:43"]},
                {"avgång": "16:50", "tider": ["16:50", "16:52", "16:53", null, null, "16:55", "16:56", null, null, null, null, "16:59", null, null, "17:00", "17:01", "17:02", "17:03", "17:04", null, "17:05", null, "17:06", null, "17:07", null, null, "17:08", null, "17:09", null, "17:13"]},
                {"avgång": "17:20", "tider": ["17:20", "17:22", "17:23", null, null, "17:25", "17:26", null, null, null, null, "17:29", null, null, "17:30", "17:31", "17:32", "17:33", "17:34", null, "17:35", null, "17:36", null, "17:37", null, null, "17:38", null, "17:39", null, "17:43"]},
                {"avgång": "17:50", "tider": ["17:50", "17:52", "17:53", null, null, "17:55", "17:56", null, null, null, null, "17:59", null, null, "18:00", "18:01", "18:02", "18:03", "18:04", null, "18:05", null, "18:06", null, "18:07", null, null, "18:08", null, "18:09", null, "18:13"]},
                {"avgång": "18:50", "tider": ["18:50", "18:52", "18:53", null, null, "18:55", "18:56", null, null, null, null, "18:59", null, null, "19:00", "19:01", "19:02", "19:03", "19:04", null, "19:05", null, "19:06", null, "19:07", null, null, "19:08", null, "19:09", null, "19:13"]},
                {"avgång": "19:50", "tider": ["19:50", "19:52", "19:53", null, null, "19:55", "19:56", null, null, null, null, "19:59", null, null, "20:00", "20:01", "20:02", "20:03", "20:04", null, "20:05", null, "20:06", null, "20:07", null, null, "20:08", null, "20:09", null, "20:13"]},
                {"avgång": "20:50", "tider": ["20:50", "20:52", "20:53", null, null, "20:55", "20:56", null, null, null, null, "20:59", null, null, "21:00", "21:01", "21:02", "21:03", "21:04", null, "21:05", null, "21:06", null, "21:07", null, null, "21:08", null, "21:09", null, "21:13"]}
            ]
          },
          {
            "period": "sommar", // 7/6–17/8
            "dagar": ["Måndag-Fredag"],
            "ingaTrafikDagar": ["2025-06-20"],
            "hållplatser": [ // Grundrutt
                "Centrum, Nygatan", "Torget", "Kyrkan", "Ukrainaplatsen", "Hotell Adlon", "Hamnterminalen",
                "Skillnadsgatan 57", "Skillnadsgatan 35", "Skillnadsgatan vsk.", "Pingstkyrkan", "Ringvägen vsk.",
                "Lotsgatan 5", "Segelmakargatan 13", "Segelmakargatan 3", "Doppingvägen vsk.", "Skrakvägen vsk.",
                "Lervik",
                // Järsö-tillägg (hållplatser som *kan* besökas på vissa turer)
                "Espholm", "Nåtö biologiska", "Bergö", "Granö vändplan", "Järsö vsk.", "Langnäs vändplan",
                "Saltkråkan vändplan", "Järsö vsk.", "Granö vsk.", "Bergö", "Nåtö biologiska", "Espholm",
                // Fortsättning grundrutt
                "Havsörnsvägen", "Lindstigen", "Källstigen", "Sälgstigen", "Övernäsgården",
                "Juseliusvägen", "Gröna Udden", "Parkgatan", "Skillnadsgatan 12", "Torggatan 19",
                "Torget", "Kyrkan", "Östra Esplanadgatan", "Nygatan 17", "Centrum, Nygatan" // Ankomst
            ],
            // Notera att Järsö-tillägget lägger till 12 hållplatser i mitten
            "turer": [
                 // Tiderna nedan är för *hela* listan inklusive Järsö-tillägget.
                 // De flesta turer har null för Järsö-delen.
                 {"avgång": "07:20", "tider": ["07:20", "07:22", "07:23", null, null, "07:25", "07:26", null, null, null, null, "07:29", null, null, "07:30", "07:31", "07:32", null, null, null, null, null, null, null, null, null, null, null, null, "07:33", "07:34", null, "07:35", null, "07:36", null, "07:37", null, null, "07:38", null, "07:39", null, "07:43"]},
                 {"avgång": "07:50", "tider": ["07:50", "07:52", "07:53", null, null, "07:55", "07:56", null, null, null, null, "07:59", null, null, "08:00", "08:01", "08:02", null, null, null, null, null, null, null, null, null, null, null, null, "08:03", "08:04", null, "08:05", null, "08:06", null, "08:07", null, null, "08:08", null, "08:09", null, "08:13"]},
                 {"avgång": "08:20", "tider": ["08:20", "08:22", "08:23", null, null, "08:25", "08:26", null, null, null, null, "08:29", null, null, "08:30", "08:31", "08:32", null, null, null, null, null, null, null, null, null, null, null, null, "08:33", "08:34", null, "08:35", null, "08:36", null, "08:37", null, null, "08:38", null, "08:39", null, "08:43"]},
                 {"avgång": "08:50", "tider": ["08:50", "08:52", "08:53", null, null, "08:55", "08:56", null, null, null, null, "08:59", null, null, "09:00", "09:01", "09:02", null, null, null, null, null, null, null, null, null, null, null, null, "09:03", "09:04", null, "09:05", null, "09:06", null, "09:07", null, null, "09:08", null, "09:09", null, "09:13"]},
                 // Avgång 09:20 - MED JÄRSÖ
                 {"avgång": "09:20", "tider": ["09:20", "09:22", "09:23", null, null, "09:25", "09:26", null, null, null, null, "09:29", null, null, "09:30", "09:31", "09:32", "09:33", "09:36", null, {"tid": "09:41", "note": "*"}, null, "09:50", {"tid": null, "note": "*"}, "09:52", null, null, "09:56", "10:01", "10:03", "10:04", null, "10:05", null, "10:06", null, "10:07", null, null, "10:08", null, "10:09", null, "10:13"]},
                 {"avgång": "10:20", "tider": ["10:20", "10:22", "10:23", null, null, "10:25", "10:26", null, null, null, null, "10:29", null, null, "10:30", "10:31", "10:32", null, null, null, null, null, null, null, null, null, null, null, null, "10:33", "10:34", null, "10:35", null, "10:36", null, "10:37", null, null, "10:38", null, "10:39", null, "10:43"]},
                 {"avgång": "10:50", "tider": ["10:50", "10:52", "10:53", null, null, "10:55", "10:56", null, null, null, null, "10:59", null, null, "11:00", "11:01", "11:02", null, null, null, null, null, null, null, null, null, null, null, null, "11:03", "11:04", null, "11:05", null, "11:06", null, "11:07", null, null, "11:08", null, "11:09", null, "11:13"]},
                 // Avgång 12:20 - MED JÄRSÖ
                 {"avgång": "12:20", "tider": ["12:20", "12:22", "12:23", null, null, "12:25", "12:26", null, null, null, null, "12:29", null, null, "12:30", "12:31", "12:32", "12:33", "12:36", null, {"tid": "12:41", "note": "*"}, null, "12:50", {"tid": null, "note": "*"}, "12:52", null, null, "12:56", "13:01", "13:03", "13:04", null, "13:05", null, "13:06", null, "13:07", null, null, "13:08", null, "13:09", null, "13:13"]},
                 {"avgång": "13:20", "tider": ["13:20", "13:22", "13:23", null, null, "13:25", "13:26", null, null, null, null, "13:29", null, null, "13:30", "13:31", "13:32", null, null, null, null, null, null, null, null, null, null, null, null, "13:33", "13:34", null, "13:35", null, "13:36", null, "13:37", null, null, "13:38", null, "13:39", null, "13:43"]},
                 {"avgång": "13:50", "tider": ["13:50", "13:52", "13:53", null, null, "13:55", "13:56", null, null, null, null, "13:59", null, null, "14:00", "14:01", "14:02", null, null, null, null, null, null, null, null, null, null, null, null, "14:03", "14:04", null, "14:05", null, "14:06", null, "14:07", null, null, "14:08", null, "14:09", null, "14:13"]},
                 {"avgång": "14:20", "tider": ["14:20", "14:22", "14:23", null, null, "14:25", "14:26", null, null, null, null, "14:29", null, null, "14:30", "14:31", "14:32", null, null, null, null, null, null, null, null, null, null, null, null, "14:33", "14:34", null, "14:35", null, "14:36", null, "14:37", null, null, "14:38", null, "14:39", null, "14:43"]},
                  // Avgång 14:50 - MED JÄRSÖ
                 {"avgång": "14:50", "tider": ["14:50", "14:52", "14:53", null, null, "14:55", "14:56", null, null, null, null, "14:59", null, null, "15:00", "15:01", "15:02", "15:03", "15:06", null, {"tid": "15:11", "note": "*"}, null, "15:20", {"tid": null, "note": "*"}, "15:22", null, null, "15:26", "15:31", "15:33", "15:34", null, "15:35", null, "15:36", null, "15:37", null, null, "15:38", null, "15:39", null, "15:43"]},
                 {"avgång": "15:50", "tider": ["15:50", "15:52", "15:53", null, null, "15:55", "15:56", null, null, null, null, "15:59", null, null, "16:00", "16:01", "16:02", null, null, null, null, null, null, null, null, null, null, null, null, "16:03", "16:04", null, "16:05", null, "16:06", null, "16:07", null, null, "16:08", null, "16:09", null, "16:13"]},
                 {"avgång": "16:20", "tider": ["16:20", "16:22", "16:23", null, null, "16:25", "16:26", null, null, null, null, "16:29", null, null, "16:30", "16:31", "16:32", null, null, null, null, null, null, null, null, null, null, null, null, "16:33", "16:34", null, "16:35", null, "16:36", null, "16:37", null, null, "16:38", null, "16:39", null, "16:43"]},
                 {"avgång": "16:50", "tider": ["16:50", "16:52", "16:53", null, null, "16:55", "16:56", null, null, null, null, "16:59", null, null, "17:00", "17:01", "17:02", null, null, null, null, null, null, null, null, null, null, null, null, "17:03", "17:04", null, "17:05", null, "17:06", null, "17:07", null, null, "17:08", null, "17:09", null, "17:13"]},
                 {"avgång": "17:20", "tider": ["17:20", "17:22", "17:23", null, null, "17:25", "17:26", null, null, null, null, "17:29", null, null, "17:30", "17:31", "17:32", null, null, null, null, null, null, null, null, null, null, null, null, "17:33", "17:34", null, "17:35", null, "17:36", null, "17:37", null, null, "17:38", null, "17:39", null, "17:43"]},
                 {"avgång": "17:50", "tider": ["17:50", "17:52", "17:53", null, null, "17:55", "17:56", null, null, null, null, "17:59", null, null, "18:00", "18:01", "18:02", null, null, null, null, null, null, null, null, null, null, null, null, "18:03", "18:04", null, "18:05", null, "18:06", null, "18:07", null, null, "18:08", null, "18:09", null, "18:13"]}
            ]
          }
          // ... Lördag/Söndag ...
        ]
      },
       // ==========================================================================
       // Västra Linjen
       // ==========================================================================
       {
        "linjeNamn": "Västra linjen: CENTRUM – ÅLANDSPLAN – MÖCKELÖ – ÅLANDSPLAN – CENTRUM",
        "identifierare": "Västra",
        "scheman": [
          {
            "period": "vinter", // 1/1–6/6 och 18/8–31/12
            "dagar": ["Måndag-Fredag"],
            "ingaTrafikDagar": ["2025-01-01", "2025-01-06", "2025-04-18", "2025-04-21", "2025-05-01", "2025-05-29", "2025-12-24", "2025-12-25", "2025-12-26", "2025-12-31"],
            "hållplatser": [
              "Centrum, Nygatan", "Ålandsplan", "Tekniska verken", "Västra macken", "Svibybro", "Lönnhagsvägen",
              "Norrgårdsvägen", "Möckelö strand", "Norrgårdsvägen", "Lönnhagsvägen", "Posten", "Källarvägen",
              "Dalkullavägen", "Kasbergsvägen", "Länsmansgränd", "Åbrinken", "Kasbrinken", "Åsvägen",
              "Västra macken", "Tekniska verken", "Ålandsplan", "Bio Savoy", "Centrum, Nygatan" // Ändrade sista till Nygatan
            ],
            "turer": [
                // FM (07:20 - 14:40)
                {"avgång": "07:20", "tider": ["07:20", null, "07:23", null, null, null, null, "07:30", null, null, null, "07:37", null, null, null, null, null, "07:41", null, "07:43", null, null, "07:47"]},
                {"avgång": "07:50", "tider": ["07:50", null, "07:53", null, null, null, null, "08:00", null, null, null, "08:07", null, null, null, null, null, "08:11", null, "08:13", null, null, "08:17"]},
                {"avgång": "08:20", "tider": ["08:20", null, "08:23", null, null, null, null, "08:30", null, null, null, "08:37", null, null, null, null, null, "08:41", null, "08:43", null, null, "08:47"]},
                {"avgång": "08:50", "tider": ["08:50", null, "08:53", null, null, null, null, "09:00", null, null, null, "09:07", null, null, null, null, null, "09:11", null, "09:13", null, null, "09:17"]},
                {"avgång": "09:20", "tider": ["09:20", null, "09:23", null, null, null, null, "09:30", null, null, null, "09:37", null, null, null, null, null, "09:41", null, "09:43", null, null, "09:47"]},
                {"avgång": "09:50", "tider": ["09:50", null, "09:53", null, null, null, null, "10:00", null, null, null, "10:07", null, null, null, null, null, "10:11", null, "10:13", null, null, "10:17"]},
                {"avgång": "10:20", "tider": ["10:20", null, "10:23", null, null, null, null, "10:30", null, null, null, "10:37", null, null, null, null, null, "10:41", null, "10:43", null, null, "10:47"]},
                {"avgång": "13:10", "tider": ["13:10", null, "13:13", null, null, null, null, "13:20", null, null, null, "13:27", null, null, null, null, null, "13:31", null, "13:33", null, null, "13:37"]},
                {"avgång": "13:40", "tider": ["13:40", null, "13:43", null, null, null, null, "13:50", null, null, null, "13:57", null, null, null, null, null, "14:01", null, "14:03", null, null, "14:07"]},
                {"avgång": "14:10", "tider": ["14:10", null, "14:13", null, null, null, null, "14:20", null, null, null, "14:27", null, null, null, null, null, "14:31", null, "14:33", null, null, "14:37"]},
                {"avgång": "14:40", "tider": ["14:40", null, "14:43", null, null, null, null, "14:50", null, null, null, "14:57", null, null, null, null, null, "15:01", null, "15:03", null, null, "15:07"]},
                // EM (15:10 - 20:40)
                {"avgång": "15:10", "tider": ["15:10", null, "15:13", null, null, null, null, "15:20", null, null, null, "15:27", null, null, null, null, null, "15:31", null, "15:33", null, null, "15:37"]},
                {"avgång": "15:40", "tider": ["15:40", null, "15:43", null, null, null, null, "15:50", null, null, null, "15:57", null, null, null, null, null, "16:01", null, "16:03", null, null, "16:07"]},
                {"avgång": "16:10", "tider": ["16:10", null, "16:13", null, null, null, null, "16:20", null, null, null, "16:27", null, null, null, null, null, "16:31", null, "16:33", null, null, "16:37"]},
                {"avgång": "16:40", "tider": ["16:40", null, "16:43", null, null, null, null, "16:50", null, null, null, "16:57", null, null, null, null, null, "17:01", null, "17:03", null, null, "17:07"]},
                {"avgång": "17:10", "tider": ["17:10", null, "17:13", null, null, null, null, "17:20", null, null, null, "17:27", null, null, null, null, null, "17:31", null, "17:33", null, null, "17:37"]},
                {"avgång": "17:40", "tider": ["17:40", null, "17:43", null, null, null, null, "17:50", null, null, null, "17:57", null, null, null, null, null, "18:01", null, "18:03", null, null, "18:07"]},
                {"avgång": "18:40", "tider": ["18:40", null, "18:43", null, null, null, null, "18:50", null, null, null, "18:57", null, null, null, null, null, "19:01", null, "19:03", null, null, "19:07"]},
                {"avgång": "19:40", "tider": ["19:40", null, "19:43", null, null, null, null, "19:50", null, null, null, "19:57", null, null, null, null, null, "20:01", null, "20:03", null, null, "20:07"]},
                {"avgång": "20:40", "tider": ["20:40", null, "20:43", null, null, null, null, "20:50", null, null, null, "20:57", null, null, null, null, null, "21:01", null, "21:03", null, null, "21:07"]}
            ]
          }
          // ... Inga sommarscheman för Västra angivna ...
          // ... Lördag/Söndag ...
        ]
      },
       // ==========================================================================
       // Järsölinjen (Vinter)
       // ==========================================================================
       {
        "linjeNamn": "Järsölinjen: CENTRUM – YTTERNÄS – NÅTÖ – JÄRSÖ – NÅTÖ – YTTERNÄS – (...) – CENTRUM",
        "identifierare": "Järsö",
        "scheman": [
          {
            "period": "vinter", // 1/1–6/6 och 18/8–31/12
            "dagar": ["Måndag-Fredag"],
            "ingaTrafikDagar": ["2025-01-01", "2025-01-06", "2025-04-18", "2025-04-21", "2025-05-01", "2025-05-29", "2025-12-24", "2025-12-25", "2025-12-26", "2025-12-31"],
            "hållplatser": [
                "Centrum, Nygatan", "Stadshuset", "Skillnadsgatan vsk.", "Pingstkyrkan", "Ringvägen vsk.",
                "Ytternäs skola", "Doppingvägen vsk.", "Skrakvägen vsk.", "Lervik", "Espholm", "Granholm",
                "Nåtö biologiska", "Nåtö by vsk.", "Bergö", "Granö vändplan", "Granö vsk.", "Järsö vsk.",
                "Langnäs vändplan", "Saltkråkan vändplan", "Järsö vsk.", "Granö vsk.", "Bergö",
                "Nåtö biologiska", "Granholm", "Espholm", "Lervik", "Skrakvägen vsk.", "Doppingvägen vsk.",
                "Ytternäs skola", "Ringvägen vsk.", "Pingstkyrkan", "GE-huset", "Övernäs skola",
                "Norragatan 23", "Nygatan 17", "Centrum, Nygatan" // Ankomst
            ],
            "turer": [
                {"avgång": "07:00", "tider": ["07:00", "07:02", null, null, null, "07:06", null, null, null, "07:08", null, "07:11", null, null, "07:16", null, null, "07:22", {"tid": "07:24", "note":"*"}, "07:27", null, "07:29", "07:31", null, "07:35", null, null, null, "07:37", null, null, "07:41", "07:44", null, null, "07:48"]},
                {"avgång": "07:55", "tider": ["07:55", "07:57", null, null, null, "08:01", null, null, null, "08:03", null, "08:06", null, null, "08:11", null, null, "08:17", {"tid": "08:20", "note":"*"}, "08:24", null, "08:26", "08:28", null, "08:32", null, null, null, "08:34", null, null, "08:39", "08:42", null, null, "08:46"]},
                {"avgång": "08:50", "tider": ["08:50", "08:52", null, null, null, "08:56", null, null, null, "08:58", null, "09:02", null, null, "09:07", null, null, "09:13", {"tid": null, "note":"*"}, "09:15", null, "09:17", "09:19", null, "09:23", null, null, null, "09:25", null, null, "09:30", "09:33", null, null, "09:37"]},
                {"avgång": "09:50", "tider": ["09:50", "09:52", null, null, null, "09:56", null, null, null, "09:58", null, "10:02", null, null, "10:07", null, null, "10:13", {"tid": null, "note":"*"}, "10:15", null, "10:17", "10:19", null, "10:23", null, null, null, "10:25", null, null, "10:30", "10:33", null, null, "10:39"]},
                {"avgång": "13:20", "tider": ["13:20", "13:22", null, null, null, "13:26", null, null, null, "13:28", null, "13:32", null, null, "13:37", null, null, "13:43", {"tid": null, "note":"*"}, "13:45", null, "13:47", "13:49", null, "13:53", null, null, null, "13:55", null, null, "14:00", "14:15", null, null, "14:19"], "note": "**"}, // Tur-not **
                {"avgång": "14:20", "tider": ["14:20", "14:22", null, null, null, "14:26", null, null, null, "14:28", null, "14:32", null, null, "14:37", null, null, "14:43", {"tid": null, "note":"*"}, "14:45", null, "14:47", "14:49", null, "14:53", null, null, null, "14:55", null, null, "15:00", "15:15", null, null, "15:19"]},
                {"avgång": "15:20", "tider": ["15:20", "15:22", null, null, null, "15:26", null, null, null, "15:28", null, "15:32", null, null, "15:37", null, null, "15:43", {"tid": null, "note":"*"}, "15:45", null, "15:47", "15:49", null, "15:53", null, null, null, "15:55", null, null, "16:00", "16:10", null, null, "16:14"]}, // Avvikande tid Övernäs skola
                {"avgång": "16:20", "tider": ["16:20", "16:22", null, null, null, "16:26", null, null, null, "16:28", null, "16:32", null, null, "16:37", null, null, "16:43", {"tid": null, "note":"*"}, "16:45", null, "16:47", "16:49", null, "16:53", null, null, null, "16:55", null, null, "17:00", "17:03", null, null, "17:07"]}, // Avvikande tid Övernäs skola
                {"avgång": "17:20", "tider": ["17:20", "17:22", null, null, null, "17:26", null, null, null, "17:28", null, "17:32", null, null, "17:37", null, null, "17:43", {"tid": null, "note":"*"}, "17:45", null, "17:47", "17:49", null, "17:53", null, null, null, "17:55", null, null, "18:00", "18:03", null, null, "18:07"]}  // Avvikande tid Övernäs skola
            ]
          }
          // ... Inga sommarscheman för Järsö angivna (ingår i Södra) ...
          // ... Lördag/Söndag ...
        ]
      }
    ],
    // ==========================================================================
    // Alla unika hållplatser (automatiskt genererad och sorterad lista rekommenderas i koden)
    // ==========================================================================
     "allaHållplatser": [
        "Bio Savoy", "Bolstavägen", "Bergö", "Centrum, Nygatan", "Dalkullavägen",
        "Doktorsvägen 1", "Doktorsvägen 14", "Doppingvägen vsk.", "Elverksgatan 2",
        "Espholm", "GE-huset", "Granholm", "Granö vsk.", "Granö vändplan", "Grindmattesvägen 2",
        "Gröna Udden", "Hamnterminalen", "Havsörnsvägen", "Hindersbölevägen", "Hotell Adlon",
        "Hotell & Restaurangskolan", "Högbackagatan 10", "Högbackagatan 26", "Idrottsgården",
        "Juseliusvägen", "Järsö vsk.", "Kalmarnäs vändplan", "Kalmsta vsk.", "Kasbergsvägen",
        "Kasbrinken", "Klintvägen 11", "Klintvägen 18", "Kyrkan", "Källarvägen", "Källstigen",
        "Langnäs vändplan", "Lervik", "Lillåkersvägen", "Lindstigen", "Lotsgatan 5", "Länsmansgränd",
        "Lönnhagsvägen", "Mariehamn, Bussplan", "Maxinge", "Musikinstitutet", "Möckelö strand",
        "Nabben", "Norragatan 23", "Norrgårdsvägen", "Nygatan 17", "Nåtö biologiska", "Nåtö by vsk.",
        "Parkgatan", "Pingstkyrkan", "Polishuset", "Posten", "Ringvägen vsk.", "Räddningsverket",
        "Saltkråkan vändplan", "Segelmakargatan 13", "Segelmakargatan 3", "Sjukhuset",
        "Skillnadsgatan 12", "Skillnadsgatan 35", "Skillnadsgatan 57", "Skillnadsgatan vsk.",
        "Skrakvägen vsk.", "Solberget", "Solberget vsk.", "Stadshuset", "Stenhuggarvägen",
        "Strandgatan 13", "Strandnäs skola", "Svibybro", "Sälgstigen", "Tekniska verken",
        "Torget", "Torggatan 19", "Transmar", "Ukrainaplatsen", "Uppgårdsvägen 10", "Uppgårdsvägen 16",
        "Västra macken", "Yrkesgymnasiet", "Ytternäs skola", "Åbrinken", "Ålandsplan", "Åsvägen",
        "Örnäsgården", // Kanske ska vara Övernäsgården? Använder det som står
        "Örtvägen 30", "Örtvägen 40", "Österkullagatan", "Östra Esplanadgatan", "Övernäs skola", "Övernäsgården"
      ].sort()
  };
  
  // Sanity check/Clean up 'allaHållplatser' more robustly if needed
  timetableData.allaHållplatser = [...new Set(timetableData.allaHållplatser.map(stop => stop.trim()).filter(stop => stop.length > 0))].sort();
  
  // Funktion för att konvertera schemat till det format app.js förväntar sig
  // (Kombinerar hållplatslistan med tidslistan för varje tur)
  function processTimeTableData(data) {
      data.linjer.forEach(linje => {
          linje.scheman.forEach(schema => {
              const processedTurer = [];
              const defaultHållplatser = schema.hållplatser; // Standard hållplatslista
              const emHållplatser = schema.hållplatser_em;   // EM-lista (Norra)
              const sommarHållplatser = schema.hållplatser; // Sommar-lista (Södra)
  
              schema.turer.forEach(turData => {
                  let currentHållplatser = defaultHållplatser;
                  if (turData.use_stops === "em" && emHållplatser) {
                      currentHållplatser = emHållplatser;
                  } else if (schema.period === "sommar" && linje.identifierare === "Södra" && sommarHållplatser) {
                      // Södra sommar använder sin specifika (längre) hållplatslista
                       currentHållplatser = sommarHållplatser;
                  } else if (!currentHållplatser){
                      // Fallback om hållplatser saknas (bör inte hända med strukturen ovan)
                      console.error("Hållplatslista saknas för", linje.identifierare, schema.period, turData.avgång);
                      return; // Hoppa över denna tur
                  }
  
  
                  if (turData.tider.length !== currentHållplatser.length) {
                       console.warn(`Varning: Olika antal tider (${turData.tider.length}) och hållplatser (${currentHållplatser.length}) för ${linje.identifierare} ${schema.period} ${turData.avgång}.`);
                       // Försök att hantera eller hoppa över turen
                       // return; // Eller försök matcha så långt det går
                   }
  
                  const tur = currentHållplatser.map((stopName, index) => {
                      const tidInfo = turData.tider[index];
                      if (typeof tidInfo === 'object' && tidInfo !== null) {
                          // Hantera objekt med tid och notering
                          return { hållplats: stopName, tid: tidInfo.tid, note: tidInfo.note };
                      } else {
                           // Hantera enkel tid-sträng eller null
                           return { hållplats: stopName, tid: tidInfo };
                       }
                  });
                   processedTurer.push(tur);
              });
              // Ersätt den gamla turstrukturen med den nya
              schema.turer = processedTurer;
  
              // Ta bort de separata hållplatslistorna om de inte behövs längre
              delete schema.hållplatser;
              delete schema.hållplatser_em;
          });
      });
      return data;
  }
  
  
  // Bearbeta datan till det format som app.js använde
  const processedTimetableData = processTimeTableData(timetableData);