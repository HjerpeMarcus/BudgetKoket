const jsonUrl = 'json/recept.json';
const dataUserTemplate = document.querySelector('[data-user-template]');
const dataUserCards = document.querySelector('[data-user-cards]');
const dataUserPopuar = document.querySelectorAll('[data-user-popular]');
const searchInput = document.querySelector('[data-search]');

let recipes = []; 
console.log("Hej hej")
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
        const desc = card.querySelector('[data-desc]');
        header.textContent = recipe.name;
        desc.textContent = recipe.description;
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
                const desc = card.querySelector('[data-desc]');
                card.id = recipe.id;
                header.textContent = recipe.name;
                img.setAttribute('src', recipe.imageURL);
                desc.textContent = recipe.description;
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
//scroll-animationer
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            wait(500).then(() =>
                entry.target.classList.add('animation')
            )
      }
    })
  });
  const bubbleObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            wait(1000).then(() =>
                entry.target.parentElement.classList.add('animation')
            )
      }
    })
  });
  imageObserver.observe(document.querySelector('.banana'));
  bubbleObserver.observe(document.querySelector('.bubbleChecker1'));
  bubbleObserver.observe(document.querySelector('.bubbleChecker2'));
  imageObserver.observe(document.querySelector('.cherry'));
//header-knappar
const menuButtonRef = document.querySelector('#mobile-headerMenu');
const searchButtonRef = document.querySelector('#mobile-searchIcon');
const closeButtonRef = document.querySelector('.closeIcon');
const searchRef = document.querySelector('.mobile-search');
const searchCloseRef = document.querySelector('.closeSearch');
const navRef = document.querySelector('.mobile-nav');
const shadowRef = document.querySelector('.search-shadow');
menuButtonRef.addEventListener("click", function(){
    navRef.classList.add('visible')
});
closeButtonRef.addEventListener("click", function(){
    navRef.classList.remove('visible')
});
searchButtonRef.addEventListener("click", function(){
    searchRef.classList.add('visible')
    shadowRef.classList.add('visible')
});
searchCloseRef.addEventListener("click", function(){
    searchRef.classList.remove('visible')
    shadowRef.classList.remove('visible')
});
//kort-länkar
document.body.addEventListener( 'click', function ( event ) {
    if(event.target.classList.contains('linkListener')){
            let chosenRecipe = event.target.closest(".card").id;
            sessionStorage.setItem("chosenRecipe", event.target.closest(".card").id)
            console.log(`${chosenRecipe}`);
    };
  } );