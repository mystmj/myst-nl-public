---
titel: Webwinkels die verklappen wie er klant is
datum: 2026-10-29
auteur: Senne
categorie: Security
samenvatting: Vul bij een webwinkel een onbekend e-mailadres in en je ziet meteen of iemand er klant is. Over account enumeration, waarom het een probleem is en hoe het netjes kan.
concept: false
volgorde: 1
afbeelding: /og/webwinkels-die-verklappen-wie-er-klant-is.png
---

Er is iets dat mij al een tijdje stoort bij het inloggen op webwinkels. Steeds vaker krijg je eerst een scherm met één veld, waarin je alleen je e-mailadres invult. Pas daarna beslist de website wat er gebeurt. Kent de winkel het adres, dan mag je door naar het wachtwoord of krijg je een inlogcode. Kent de winkel het adres niet, dan kom je op een pagina terecht waar je een nieuw account kunt aanmaken.

Op het eerste gezicht lijkt dat handig. Eén veld, weinig gedoe, lekker simpel. In de praktijk vind ik het vooral irritant, en eerlijk gezegd ook een beetje ongemakkelijk. Dat heeft twee redenen.

## Password managers

Ik gebruik een password manager en voor veel websites ook een eigen e-mailadres via een aliasdienst. Elke website krijgt zo een ander e-mailadres en een ander wachtwoord. Dat is veiliger, met als bijwerking dat ik mijn e-mailadres vaak niet uit mijn hoofd weet. Dat hoeft ook niet, daar heb ik de password manager voor.

Password managers werken alleen het best op een ouderwetse loginpagina, met het e-mailadres en het wachtwoord samen op één scherm. Bij een loginflow waarin je eerst alleen je e-mailadres invult, wordt de pagina lang niet altijd goed herkend. Dan moet ik zelf de juiste gegevens erbij zoeken, het adres overnemen, op verder klikken en daarna het wachtwoord alsnog invullen. Wat bedoeld is als gemak, kost mij juist extra handelingen.

Vervelend, maar daar zou ik nog geen blog over schrijven. Het tweede bezwaar weegt een stuk zwaarder.

## Twee verschillende schermen

Het probleem zit in het verschil tussen wat je te zien krijgt. Vul je een adres in dat de winkel kent, dan ga je door naar de login. Vul je een adres in dat de winkel niet kent, dan krijg je een registratiescherm. Ik heb het bij vijf grote webwinkels geprobeerd met een verzonnen adres, en bij alle vijf kreeg ik direct te horen dat er nog geen account bestond.

De website vertelt daarmee iedereen die het wil weten of een bepaald e-mailadres er een account heeft. Dat lijkt onschuldig, maar het is een bekend beveiligingsprobleem met een eigen naam: account enumeration, ook wel email enumeration. OWASP omschrijft het als een situatie waarin je aan het gedrag van een login- of registratieproces kunt aflezen welke gebruikers er bestaan, en raadt daarom aan om bij authenticatie altijd een algemene reactie te geven.

Google biedt in zijn identityplatform zelfs een aparte instelling aan die email enumeration protection heet. Dat zo'n instelling bestaat zegt eigenlijk al genoeg. Grote identityplatforms nemen hier bewust maatregelen tegen, dus met overdreven angst of een theoretisch risico heeft het weinig te maken.

## Bruikbaar voor een aanvaller

Een e-mailadres is meestal allang geen geheim meer. Het ligt op straat door datalekken, oude accounts, hergebruikte gegevens of gewoon omdat iemand het ergens heeft opgepikt. Kan een aanvaller vervolgens bij een rij webwinkels nagaan waar dat adres een account heeft, dan wordt die kennis ineens bruikbaar. Om direct in te breken is het niet genoeg, om een aanval gerichter te maken wel. Een paar voorbeelden:

- **Credential stuffing.** Bekende combinaties van e-mailadres en wachtwoord uitproberen op precies de plekken waar iemand waarschijnlijk een account heeft.
- **Low and slow brute force.** In plaats van duizenden wachtwoorden op één website, rustig en verspreid over tijd en websites een handvol waarschijnlijke wachtwoorden proberen. Wie al weet waar iemand een account heeft, kan dat efficiënter doen en valt minder op.
- **Phishing.** Een mail sturen die een stuk geloofwaardiger is, omdat de aanvaller weet dat je bij die winkel klant bent.
- **Profilering.** In kaart brengen welke diensten, winkels en platforms iemand gebruikt.

Vooral dat laatste vind ik ongemakkelijk. Het gaat een webwinkel niets aan om aan wie dan ook te vertellen waar iemand klant is, ook niet via een omweg in een handige loginflow.

## Registreren kan ook netjes

Natuurlijk moet een nieuwe klant zich kunnen registreren. Daarvoor hoeft een winkel alleen niet openlijk te laten zien of een e-mailadres al bekend is. Je kunt na het invullen van het adres ook gewoon een melding geven als deze:

> Als dit e-mailadres bij ons bekend is, sturen we je een inloglink of code. Heb je nog geen account, dan kun je via dezelfde mail verder met registreren.

Of nog korter:

> Kijk in je inbox om verder te gaan.

Aan de buitenkant ziet iedereen dan hetzelfde, of het account nu bestaat of niet. De klant kan gewoon verder en een buitenstaander komt niets te weten. Het is een stap minder direct dan meteen een registratiescherm of een wachtwoordveld tonen, en dat neem ik graag voor lief als het bestaan van accounts daardoor niet meer uitlekt.

## De AVG

Ik ben geen jurist, dus ik ga niet beweren dat dit per definitie illegaal is. Wel vind ik het lastig te verdedigen. Een e-mailadres kan een persoonsgegeven zijn, en het feit dat iemand klant is bij een bepaalde winkel zegt ook iets over die persoon. Onder de AVG moet een organisatie passende technische en organisatorische maatregelen nemen om persoonsgegevens te beveiligen, in verhouding tot het risico.

Of deze flow juridisch echt fout zit, hangt af van de context. Denk aan rate limiting, monitoring, fraudedetectie, het soort account en de schade die misbruik kan aanrichten. Los van die juridische discussie vind ik het vanuit beveiliging gewoon geen nette oplossing.

## Conversie tegenover veiligheid

Wat mij vooral verbaast, is dat dit bij grote webwinkels gebeurt. Het gaat hier om bedrijven met serieuze ontwikkelteams, securityteams en privacyafdelingen, en dan verwacht je dit soort keuzes eigenlijk alleen bij iemand die voor het eerst een loginpagina bouwt.

De gedachte erachter begrijp ik wel. Een nieuwe klant kan zich zo iets makkelijker registreren, en bestaande klanten kun je richting inloggen zonder wachtwoord of met een eenmalige code sturen. Conversie zal ongetwijfeld meespelen.

De prijs is wel dat je informatie weggeeft die je helemaal niet weg hoeft te geven. Daar schuurt het. Iets wat goed is voor de conversie, is daarmee nog geen goed idee voor beveiliging of privacy.

## Identity hoort bij het platform

Op het eerste gezicht lijkt dit een keuze van het frontend- of UX-team. Welke velden toon je, welke tekst zet je op de knop, op welk moment stuur je iemand naar de registratie? In een moderne cloudomgeving is authenticatie zelden een los stukje applicatiecode. Zeker bij grotere organisaties werken meerdere teams aan verschillende applicaties, omgevingen en klantportalen. Als ieder team zelf de loginflow, het registratieproces, de rate limiting en de beveiligingsafwegingen moet bedenken, ontstaan er vanzelf verschillen, en juist in die verschillen sluipen dit soort problemen erin.

Daarom zie ik identity liever als onderdeel van het platform. Je laat ook niet ieder team opnieuw uitzoeken hoe deployments, secrets, ingress, certificaten of CI/CD geregeld moeten worden. Voor authenticatie wil je net zo goed veilige standaardbouwblokken aanbieden: een centrale identityoplossing, vaste login- en registratieflows, herbruikbare platformtemplates, policy as code en geautomatiseerde securitychecks. Ontwikkelaars doen het zonder die bouwblokken heus niet per definitie fout, maar met goede standaarden bouwen teams sneller en veiliger.

De oplossing gaat dus verder dan een andere foutmelding tonen. Het draait om de vraag welke keuzes je centraal maakt, welke risico's je standaard afvangt en welke vrijheid je bewust bij de teams laat.
