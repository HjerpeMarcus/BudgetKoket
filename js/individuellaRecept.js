function getRecipeIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('recipe');
}
function generate() {
    let chosenRecipe = getRecipeIdFromUrl();
    console.log(chosenRecipe);
    fetch('../json/recept.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                if (item.id === Number(chosenRecipe)) {
                    document.title = item.name;
                    document.getElementById('rubrik').innerHTML = item.name;
                    document.getElementById('recipeName').innerHTML = item.name;
                    document.getElementById('recipeDesc').innerHTML = item.description;
                    document.getElementById('imageContainer').innerHTML = `<img class="recipeImage" src="${item.imageURL}" alt="${item.imagealt}"></img>`;
                    item.ingredients.forEach(ingrident => {
                    let li = document.createElement('li');
                    console.log(ingrident);
                    li.textContent = `${ingrident.quantity}  ${ingrident.name}`;
                    document.getElementById('ingredientList').append(li);
                });
                item.steps.forEach(step => {
                    let li = document.createElement('li');
                    li.textContent = step;
                    document.getElementById('stepList').append(li);
                });
                    }
            });
        });
}
document.body.onload = generate();