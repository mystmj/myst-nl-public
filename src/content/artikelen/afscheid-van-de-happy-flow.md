---
titel: Afscheid van de happy flow
datum: 2026-10-29
auteur: Michel
categorie: Kwaliteit
samenvatting: Een activatielink die zegt dat hij verlopen is, terwijl hij nog een half jaar geldig is. Over happy flow programming en vijf afspraken om ervan af te komen.
concept: false
volgorde: 0
afbeelding: /og/afscheid-van-de-happy-flow.png
---

Vorige week werden we toegelaten tot het partnerprogramma van een grote softwareleverancier. Dat gaat zoals het altijd gaat: er komt een mailtje binnen met een knop, je klikt erop, je maakt een account aan en je kunt aan de slag. In dit geval kwam ik op een pagina terecht met de melding dat de link niet meer geldig was, met daaronder een knop om een nieuwe aan te vragen. Die zou dertig dagen geldig zijn. Ik vroeg een nieuwe aan, kreeg binnen een minuut een nieuw mailtje, klikte op de knop en kwam op dezelfde pagina terecht. Dat heb ik daarna nog een keer of vijf geprobeerd, steeds met hetzelfde resultaat.

Als zoiets gebeurt zoek je eerst bij jezelf. Misschien had de spamfilter de link al geopend, misschien zat er een linkscanner tussen, misschien lag het aan de browser. Ik heb het allemaal nagelopen en het bleek nergens aan te liggen. Toen heb ik de netwerklog van de browser opgeslagen en ben ik gaan kijken wat de server nu eigenlijk antwoordde. Wat daar uitkwam is een mooi voorbeeld van een manier van bouwen die ik al jaren tegenkom en waar ik steeds minder geduld voor heb. Ik noem het happy flow programming.

## Bouwen voor het pad dat werkt

Wie software bouwt begint met het pad waarop alles goed gaat. De gebruiker vult het formulier netjes in, de database antwoordt, de koppeling met het andere systeem werkt en de link wordt op tijd aangeklikt. Dat pad wordt met aandacht gebouwd en uitgebreid getest, want daar draait straks de demo op. Voor alles wat daarvan afwijkt komt er aan het einde één gezamenlijke afhandeling bij: een algemene foutmelding, een tekstje dat er iets is misgegaan, soms helemaal niets.

De reden daarvoor zit in de manier waarop we ons werk organiseren. In een user story staat wat er moet gebeuren als het werkt. Tijdens de demo laat je zien dat het werkt. De opdrachtgever accepteert de oplevering omdat het werkt. Er wordt nooit een ticket aangemaakt met de titel "wat als de uitnodiging al bestaat maar er geen bedrijf aan hangt", en dus bouwt ook niemand dat.

Die situaties doen zich alleen wel voor. De ontwikkelaar merkt daar niets van, omdat ze pas opduiken op het moment dat een gebruiker erin terechtkomt.

## De netwerklog

Terug naar de activatielink. Bij het laden van de pagina deed de browser precies één aanroep naar de server. Het antwoord bestond uit de status "success" en daarbinnen de uitkomst "invalid". Op basis daarvan stuurde de pagina mij door naar de foutmelding. Tot zover is dat wat je zou verwachten.

Alleen stuurde de server in datzelfde antwoord ook het complete uitnodigingsrecord mee dat hij had gevonden. Daardoor kon ik zien wat er aan de hand was.

- De opgeslagen hash was precies de SHA256 van het token uit mijn link. Het token klopte dus.
- De vervaldatum lag in april 2027, een half jaar verderop. Van dertig dagen was geen sprake, en van verlopen al helemaal niet.
- De wijzigingsdatum van het record lag 1,3 seconden na het moment waarop mijn pagina begon te laden. De server had tijdens het controleren dus iets weggeschreven en gaf daarna alsnog "invalid" terug.
- Het veld voor het gekoppelde bedrijf was leeg. Het veld voor de eerste toegangslink ook.

Het token klopte, de uitnodiging was geldig, en toch keurde de server hem af. De werkelijke reden staat in een veld dat niet wordt meegestuurd. Waarschijnlijk bestond er al een account op mijn mailadres, want de uitnodiging was van het type "eerste gebruiker" en die stap weigert zodra die gebruiker al bestaat. Het kan ook zijn dat er geen bedrijf aan de uitnodiging gekoppeld was, waardoor de activatie nergens aan vast kon worden gemaakt.

De knop om een nieuwe link aan te vragen deed intussen keurig wat hem was opgedragen. Hij maakte een nieuw token aan, hashte het, sloeg het op en stuurde het per mail toe. Of er überhaupt een token denkbaar was dat geaccepteerd zou worden, werd daarbij niet gecontroleerd. Daardoor liep iedere nieuwe link op precies dezelfde plek vast.

## Vijf fouten in één pagina

Welke van die twee oorzaken het uiteindelijk is, doet er voor dit verhaal weinig toe. In deze ene flow zitten namelijk vijf ontwerpfouten die los van elkaar staan, en die stuk voor stuk zijn ontstaan doordat alleen het pad is gebouwd waarop alles goed gaat.

**Alle fouten krijgen hetzelfde antwoord.** Een hash die niet klopt, een verlopen uitnodiging, een al gebruikte link, een gebruiker die al bestaat, een bedrijf dat ontbreekt: vijf verschillende situaties, en voor allemaal geeft de server het woord "invalid" terug. De pagina maakt daar "niet meer geldig" van en zet er een knop onder die suggereert dat de link verlopen is. Zo krijg je een verloopmelding voor een uitnodiging die nog een half jaar meekan.

**De herstelknop kan niets herstellen.** Voordat de knop een nieuw token aanmaakt, gaat hij niet na of de uitnodiging zich in een toestand bevindt waarin een nieuw token zin heeft. Was die controle er wel geweest, dan was de knop uitgegrijsd en had er een verwijzing naar support gestaan. Nu blijft hij in een kringetje draaien, zonder dat de gebruiker of de leverancier daar iets van merkt.

**De tekst en de data spreken elkaar tegen.** Op de pagina staat dat een link dertig dagen geldig is. In het record staat een termijn van ongeveer een half jaar. Een van de twee klopt niet, en kennelijk heeft niemand ze ooit naast elkaar gelegd.

**Een mislukte controle schrijft toch iets weg.** De wijzigingsdatum van de uitnodiging schuift op tijdens een validatie die mislukt. Wie pogingen wil bijhouden kan dat beter in een apart veld doen, want zo kun je achteraf niet meer zien wanneer het record voor het laatst inhoudelijk is gewijzigd.

**Een anonieme bezoeker krijgt het hele record te zien.** Ik was niet ingelogd, en toch kwam het volledige uitnodigingsobject mee in het antwoord: naam, mailadres, bedrijfsnaam, interne nummers en de opgeslagen hash. Een validatie hoeft alleen een oordeel terug te geven, hooguit met een zin voor op het scherm. Iedereen die de link opent krijgt nu diezelfde gegevens, en dat geldt ook voor iedere linkscanner die inkomende mail controleert.

## Een vast patroon

Je zou kunnen zeggen dat dit een slordige leverancier is en het daarbij laten. Dat is me te makkelijk. Het portaal is gebouwd op een no code platform, en daar herken je de vorm van de fouten aan: iedere tak van een visuele workflow is gebouwd voor het pad dat werkt, en de foutafhandeling is er achteraf als één vangnet onder gehangen. Hetzelfde patroon kom ik tegen in handgeschreven code, bij grote organisaties en bij teams met uitstekende ontwikkelaars.

De oorzaak ligt in wat we met elkaar "klaar" noemen. Een feature is klaar als de demo slaagt, en een demo volgt van nature het pad waarop alles goed gaat. Wat daarbuiten valt wordt technische schuld, en die zie je pas als een klant erin terechtkomt.

De rekening komt dan ook ergens anders terecht dan je zou denken. In dit geval kostte het mij tijd die ik liever aan iets anders had besteed, leverde het aan twee kanten een supportticket op en wist de leverancier niet eens dat er iets misging, omdat de flow niets logt. Vermenigvuldig dat met iedere migratie, iedere koppeling en ieder randgeval dat niemand heeft opgeschreven, en je ziet waarom de happy flow goedkoop is om te bouwen en duur om te hebben.

## Vijf afspraken

Daar is geen groot framework voor nodig. Met vijf afspraken kom je al een heel eind, en je kunt ze bij iedere feature afdwingen in de review of in de definition of done.

**Geef iedere reden om te falen een eigen naam.** In plaats van `invalid` wordt het `token_mismatch`, `expired`, `already_activated`, `user_exists` of `company_missing`. Dat kost één enum. In ruil daarvoor krijg je een foutmelding die klopt, een supportmedewerker die meteen ziet wat er aan de hand is en een log waarop je kunt filteren.

**Laat een herstelknop eerst nagaan of herstel mogelijk is.** Voordat je iets opnieuw aanmaakt, verstuurt of probeert, stel je de vraag of die actie het probleem kan oplossen. Zo niet, dan laat je dat zien en verwijs je door. Een knop die eindeloos mislukt is slechter dan geen knop.

**Laat een mislukte controle niets wijzigen.** Lezen blijft lezen. Wil je iets vastleggen over de poging, doe dat dan in een apart auditspoor en laat het record zelf met rust.

**Geef uit een endpoint terug wat de ontvanger nodig heeft, en verder niets.** Bij een anonieme validatie is dat een oordeel en een tekst. Dat de query het complete object toch al had opgehaald is geen reden om het mee te sturen.

**Schrijf de randgevallen op voordat je begint aan het pad dat werkt.** Loop iedere externe afhankelijkheid en iedere toestand van je data langs en vraag je af wat er gebeurt als die er niet is, al bestaat, verlopen is of halverwege is blijven hangen. Iedere vraag levert een testgeval op. Niet ieder testgeval verdient een mooie oplossing, maar bij ieder testgeval moet wel een bewuste keuze zijn gemaakt: afhandelen, doorsturen naar support of weigeren met een duidelijke reden.

## Tot slot

De aanpassing aan de kant van de leverancier is klein. Aparte retourcodes, één controle voor de knop en een ingekorte response, bij elkaar hooguit een dag werk. Dat geldt voor de meeste randgevallen: moeilijk zijn ze zelden, ze worden alleen niet gebouwd omdat niemand erom heeft gevraagd en de demo er ook zonder slaagt.

Dus als de volgende feature klaar wordt gemeld, vraag dan eens wat er gebeurt als het misgaat. Niet in het algemeen, maar per afhankelijkheid en per toestand. Komt daar "dan geven we een foutmelding" uit, vraag dan welke, en of de gebruiker daar iets mee kan. Vaak is het antwoord nee, en dan is het dus nog niet klaar.
