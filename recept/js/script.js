const jsonUrl = '../json/recept.json';
const dataUserTemplate = document.querySelector('[data-user-template]');
const dataUserCards = document.querySelector('[data-user-cards]');
const dataUserPopuar = document.querySelectorAll('[data-user-popular]');
const searchInput = document.querySelector('[data-search]');

let recipes = []; 

if(searchInput){
    // Fokus-lyssnare på input med id searchInput
    searchInput.addEventListener('focus', () => {
        console.log('Du står i input');
        searchInput.classList.toggle('focus-border');
    });

    // Blur-lyssnare på input med id searchInput
    searchInput.addEventListener('blur', () => {
        console.log('Du utanför i input');
        searchInput.classList.toggle('focus-border');
    });
    searchInput.addEventListener('input', (e) => {
        const valueInput = e.target.value.toLowerCase();
        
        recipes.forEach(recipe =>{
            //Kollar om något av villkoren stämmer och return en boolean (true/false)
            const isVisible = recipe.name.toLowerCase().includes(valueInput) || recipe.category.toLowerCase().includes(valueInput);
            //Gömmer korten som inte finns i sökningen 
            recipe.element.classList.toggle('hide',!isVisible);
        });
    });
};
//fetchData innehåller data från fetch om ni vill göra något med denna
let fetchedData = [];
console.log(fetchedData);
function getCard (){
    recipes = fetchedData.map( recipe => {
        const card = dataUserTemplate.content.cloneNode(true).children[0];
        const header = card.querySelector('[data-header]');
        const img = card.querySelector('[data-image]');
        const cat = card.querySelector('[data-cat]');
        const link = card.querySelector('[data-link]');
        link.setAttribute('href', recipe.html);
        header.textContent = recipe.name;
        cat.textContent = recipe.category;
        img.setAttribute('src', recipe.imageURL);
        dataUserCards.append(card);
        return{name: recipe.name,category: recipe.category, element:card}
    });
}
fetch(jsonUrl)
.then(response => response.json())
.then(data => {
    data.forEach(d => {
        fetchedData.push(d);
    });
    if(dataUserCards){
        getCard();
    }
    const maxCardsToShow = 3; // Antal kort att visa
    if(dataUserPopuar){
        //Detta kan göras snyggare
        dataUserPopuar.forEach(section => {
            recipes = data.slice(0, maxCardsToShow).map(recipe => { // Använd slice() för att begränsa antalet kort
                const card = dataUserTemplate.content.cloneNode(true).children[0];
                const header = card.querySelector('[data-header]');
                const img = card.querySelector('[data-image]');
                const cat = card.querySelector('[data-cat]');
                const link = card.querySelector('[data-link]');
                link.setAttribute('href', recipe.html);
                header.textContent = recipe.name;
                cat.textContent = recipe.category;
                img.setAttribute('src', recipe.imageURL);
                section.append(card);
                return{name: recipe.name,category: recipe.category, element:card}
            });
        }); 
    }  
})
.catch(errorMsg => console.log(errorMsg));

const allChips = document.querySelectorAll('.chip');
let activeChips = []; // Array för att lagra de aktiva chippen
if(allChips){
    allChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            
          const chipValue = e.target.nextSibling.nextSibling.innerHTML.toLowerCase();
          // Kontrollera om chipet redan är aktivt
          const isActive = activeChips.includes(chipValue);
          if (isActive) {
            // Ta bort chipet från den aktiva listan
            activeChips = activeChips.filter(activeChip => activeChip !== chipValue);
          } else {
            // Lägg till chipet i den aktiva listan
            activeChips.push(chipValue);
          }
          // Iterera över recepten och visa/dölj baserat på de aktiva chippen
          recipes.forEach(recipe => {
            //Kollar om något av villkoren stämmer och return en boolean (true/false)
            const isVisible = activeChips.length === 0 || activeChips.includes(recipe.category.toLowerCase());
            //Gömmer de kort som inte har kategorin 
            recipe.element.classList.toggle('hide', !isVisible);
          });
        });
      });
}
