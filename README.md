
# substans webbshop

substans är en mobile-ready, fullt funktionell webbshop. Strukturerad i HTML, stylad och animerad i SCSS/CSS och med funktionalitet kodad i Javascript/Jquery. 
- - -
### Funktionalitet
- - -

- Objektorienterad produktrendering för att enkelt kunna byta och lägga till nya produkter.
- En varukorg som sparas i webbläsare, vilket tillåter användare att stänga ner och återkomma till sidan utan att mista sina valda produkter.
- En animerad loading screen för att ge intrycket att beställningen verkligen läggs. 
- Fraktkostnad som läggs till och tas bort beroende på summan av ens beställning. 

- - -

### Syntax

- - - 
- Klasser och variabler skrivna i HTML & CSS använder enbart gemener, och vid längre meningar kebab-case.
```
 .wrapperProductPage {
  @include flex-full-width-wrap-container;
  margin-top: 10%;
 }
```
- Klasser,variabler och funktioner skrivna i Javascript använder camelCase.


```
function firstLetterCapitalize(incString){
  let stringToLower = incString;
  let loweredString = stringToLower.toLowerCase();
  let cappedString = (loweredString[0].toUpperCase()+loweredString.slice(1)); 
  return cappedString;

}

```
- - - 
### Misstag, förbättringar 
- - -
 - Samtliga klasser skrivna i Javascript, dvs även CSS-klasser skapade där använder camelCase. CSS-klassernaskapade där  borde förstås använt kebab-case istället, och hade vi haft mer tid hade vi åtgärdat detta, och hade vi haft en tydligare planerat vilken syntax som skulle användas till vad hade problemet kunnat undvikas helt.
- - - 
 - Loading-screen använder i detta läge "checkout.html" för att renderas -  dvs den rensar sidan och använder den själv. Detta gjordes för att spara på antalet HTML-sidor, men medförde den oförutsedda konsekvens att "require" och t.ex. "type=email" på user-inputs i checkout slutade fungera. Detta gjorde att vi var tvungna att skriva en egen funktion som förhindrar att användare tar sig från checkout-sidan utan att fylla i kunduppgifter. Vilken är sämre än require i HTML, då den inte bejakar vad som skrivs, bara att något skrivs. Detta hade kunnat fixats relativt enketl med en dedikerad HTML-sida till loading screen men detta hade vi inte tid till. 
- - - 
- Ser inte detta nödvändigtvis som ett misstag då vi inte hade kunskapen om modules då koden skrevs, men det hade varit väldigt användbart att lägga funktioner i ett separat dokument för de två produktsidorna, då de just nu är identiska utöver produkterna i klassen. 