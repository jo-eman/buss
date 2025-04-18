# 🚌 Bussplanerare Mariehamn (2025)

En enkel reseplanerare för Mariehamns lokaltrafik (stadsbussar), baserad på den publicerade tidtabellen för 2025.

**Prova appen här: [https://jo-eman.github.io/buss/](https://jo-eman.github.io/buss/)**

---

## ✨ Funktioner

* Sök bussresor mellan hållplatser inom Mariehamn.
* Använder den officiella tidtabellen för 2025.
* Välj start- och sluthållplats från en lista.
* Ange önskat datum och tid (avgång efter).
* **Nytt:** Kommer ihåg dina senast valda hållplatser mellan sessioner.
* **Nytt:** Söker automatiskt med senast valda hållplatser när appen öppnas (om val finns sparade).
* **Nytt:** Mörkt tema (Dark Mode) som standard, med möjlighet att växla till ljust tema.
* Mobilvänlig design.

---

## 🛠️ Teknisk Information

Projektet är byggt med enkla och robusta webbtekniker:

* HTML
* Tailwind
* Vanilla JavaScript (ES Modules)

Datastrukturen för tidtabellen finns i `tidtabell.js` och applikationslogiken i `app.js`.

---

## ✅ Genomförda Uppdateringar

* Fixat logiken för hållplatser markerade med "Via" eller "*" i tidtabellen.
* Förbättrat och förenklat datastrukturen samt logiken i `tidtabell.js`.
* Lagt till funktion för att spara senaste sökning i `localStorage`.
* Implementerat automatisk sökning vid start om sparad data finns.
* Infört mörkt tema som standard och en knapp för att växla tema.

---

## 📅 Framtida Utveckling (Roadmap / Todo)

* Förenkla och modularisera app.js och tidtabell.js
* Implementera funktion för att uppdatera befintliga tidtabeller samt läsa in nya tidtabeller
* Lägga till stöd för landsortsbussarna (regiontrafiken).
* Implementera geografisk sökning som hittar närmaste hållplats från din nuvarande position eller valda
* Eventuellt utforska integration med realtidsdata om/när det blir tillgängligt.

---

## ⭐ Gillar du projektet?

Ge det gärna en stjärna på GitHub!

<span class="inline-block align-middle">
     <iframe src="https://ghbtns.com/github-btn.html?user=jo-eman&repo=buss&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170" height="30" title="GitHub Star Button" loading="lazy"></iframe>
</span>

Du hittar källkoden här: [https://github.com/jo-eman/buss/](https://github.com/jo-eman/buss/)

---

*Ansvarsfriskrivning: Applikationen är under utveckling och kan innehålla felaktiga tider. Dubbelkolla alltid med den officiella tidtabellen vid behov.*