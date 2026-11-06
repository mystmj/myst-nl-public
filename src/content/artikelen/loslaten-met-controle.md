---
titel: "Ik lees geen code meer. En dat is geen roekeloosheid."
datum: 2026-11-05
auteur: Senne
categorie: Agentic werken
samenvatting: "Waarom Senne geen code meer leest die een agent schrijft, waar hij de controle wel neerlegt, en hoe je dat zelf ervaart in onze workshop agentic werken."
concept: false
volgorde: 2
afbeelding: /og/loslaten-met-controle.png
---

Ik lees al een tijd geen code meer. Ook de code die een agent voor mij schrijft, loop ik niet regel voor regel na. Dat klinkt als iets wat je in een teamoverleg beter niet hardop zegt. Toch denk ik dat het de juiste vraag oproept, voor wie een bedrijf leidt, maar net zo goed voor wie elke dag code schrijft of een platform beheert: kan agentic dit al?

## Waar het begon

Na een workshop van [Victor Rentea](https://victorrentea.ro) op een conferentie ben ik gestopt met het lezen van code. Dat is ook de reden dat wij nu zelf een workshop geven. Hij gaat over agentic werken, maar het eigenlijke doel is een ander: deelnemers laten merken dat je een agent kunt loslaten, zolang je weet waar je de controle neerlegt.

## Een voorbeeld

Stel dat een afdeling al jaren verdrinkt in papier en pdf's: contracten, facturen, bonnetjes. Er bestaat open source software die dat doorzoekbaar maakt. Normaal begint dat met een ticket bij een platformteam: een server, een database, een webadres met certificaat, een plek om de bestanden te bewaren.

In de workshop zet een deelnemer dat zelf neer, door de eigen agent erom te vragen. Er wordt geen configuratie met de hand getypt, alleen opdrachten gegeven. Klaar is het pas als een pdf uploaden en erin zoeken werkt, het systeem op een eigen webadres via HTTPS bereikbaar is en de data een herstart overleeft. Dat kost een deelnemer ongeveer 30 minuten.

Dat betekent niet dat een agent een platformteam vervangt. Het betekent wel dat de grens van wat je "even regelt" een flink stuk is opgeschoven.

## "Maar wie controleert dit dan?"

Dat is de vraag die elke manager stelt, en elke developer of ops engineer ook: wie staat er uiteindelijk voor in? Het is een terechte vraag. Het antwoord is: ik controleer het nog steeds, alleen niet meer door code te lezen. Het controlepunt is verplaatst naar plekken waar je er meer aan hebt:

- **Tests.** Gedrag dat kapot kan gaan staat vast in tests die je ziet slagen of falen.
- **Review agents.** Een reviewer en een security agent kijken met een andere opdracht naar hetzelfde werk. In de workshop bouwt elke deelnemer deze zelf. Een app is pas klaar als ze ernaar gekeken hebben en elke bevinding is verwerkt of bewust afgewezen.
- **CI en een testomgeving.** Wat een agent maakt gaat niet rechtstreeks naar de plek waar het ertoe doet.
- **Je eigen goedkeuring.** De mens beslist nog steeds, maar over uitkomsten in plaats van over regels code.
- **Een kleine blast radius.** Hoe erg kan het ergste geval zijn? In de workshop werken deelnemers op een wegwerpcluster. Kapotmaken mag, en met één commando zetten we alles terug.

Dat is wat ik bedoel met loslaten mét controle. Het is geen blind vertrouwen. Het is vertrouwen dat je opbouwt door te controleren op de plek waar dat het meest oplevert.

## Wat dit voor een bedrijf betekent

Ik weet niet precies hoe snel dit gaat. Wat ik wel zie is een richting, en die raakt meer mensen dan alleen developers.

- **Developers** schrijven minder zelf en besteden meer tijd aan specificeren en verifiëren.
- **Ops teams** voeren minder wijzigingen met de hand uit en bepalen vooral de poorten en grenzen waarbinnen een agent mag werken.
- **Alle anderen** die een probleem helder kunnen beschrijven en weten wat "goed" is, kunnen steeds meer zelf bouwen. Dat betekent niet dat iedereen overal aan mag zitten. Wat een collega zelf bouwt gaat door dezelfde tests, reviews en goedkeuring als al het andere, en draait eerst op een plek waar het weinig kwaad kan. Er kunnen dus meer mensen bouwen, maar wie er verantwoordelijk blijft voor wat live gaat verandert niet.

Wie hier nu over nadenkt, kiest zelf hoe het bij het eigen bedrijf past. Wie wacht, krijgt het toch, maar op een moment dat een ander kiest, en met een achterstand op wie eerder begon.

## Zelf ervaren

In de workshop krijgt elke deelnemer een eigen werkplek met Claude Code en toegang tot een gedeeld cluster. Je kiest een doel, bijvoorbeeld het documentsysteem hierboven, bouwt je eigen agents en maakt daarna bewust iets kapot om te zien hoe je agents het herstellen. Je loopt geen theorie door, je merkt zelf waar je kunt loslaten en waar niet.

## Tot slot

**Wil je dit met je team ervaren?** Dan organiseren wij de workshop bij jou op kantoor. Dat kost niets. Jij regelt de ruimte en de catering, en we vragen één ding: iedereen heeft een eigen Claude abonnement (minimaal Pro). Het cluster waarop gewerkt wordt regelen wij. De workshop duurt ongeveer vier uur en is voor maximaal 12 deelnemers. Mail naar [info@myst.nl](mailto:info@myst.nl) en we plannen het samen.

**Ben je zelf engineer en denk je "hier wil ik wel werken"?** Wij zijn een kleine club senior cloud engineers waar je zelf kiest aan welke opdrachten je werkt. Solliciteren kan via de terminal op [shell.myst.nl](https://shell.myst.nl), of mail je cv en een korte motivatie naar [info@myst.nl](mailto:info@myst.nl).
