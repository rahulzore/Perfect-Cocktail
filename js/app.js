// Instantiate the Classes
const ui = new UI(),
      cocktail = new CocktailAPI(),
      cocktailDB = new CocktailDB();


// Create the EVENT LISTENER
function eventListener(){
    //Document Ready
    document.addEventListener('DOMContentLoaded', documentReady);

    //Add event listener when form is submitted
    const searchForm = document.querySelector('#search-form');
    if(searchForm){
        searchForm.addEventListener('submit', getCocktails);
    }

    //The results div listener
    const resultsDiv = document.querySelector('#results');
    if(resultsDiv){
        resultsDiv.addEventListener('click', resultsDelegation);
    }
    
}

eventListener();



//Get Cocktails function
function getCocktails(e){
    e.preventDefault();

    const searchTerm = document.querySelector('#search').value;
    
    //check something is on the search input
    if(searchTerm ===''){
        //Call UI print message
        ui.printMessage('Please add something into the form', 'danger');
    } else {

        //Server response from promise
        let serverResponse;

        //Type of search (ingrediants, cocktails, or name)
        const type = document.querySelector('#type').value;

        //Evaluate the type of method and then execute the query

        switch(type){
            case 'name':
                        serverResponse = cocktail.getDrinksByName(searchTerm);
                        break;
            case 'ingredient':
                        serverResponse = cocktail.getDrinksByIngredient(searchTerm);
                        break;
            case 'category':
                        serverResponse = cocktail.getDrinksByCategory(searchTerm);
                        break;
            case 'alcohol':
                        serverResponse = cocktail.getDrinksByAlcohol(searchTerm);
                        break;
        }

        ui.clearResults();
    // Query by the name of the drink
        
        serverResponse.then(cocktails => {
            if(cocktails.cocktails.drinks === null){
                // Nothing exists
                ui.printMessage('There\'re no results, try a different term', 'danger');
            } else {
                if(type === 'name'){
                    //Display withj ingrediants
                    ui.displayDrinksWithIngredients(cocktails.cocktails.drinks);
                } else {
                    //Display wihout ingrediants (category, alcohol, ingrediant)
                    ui.displayDrinks(cocktails.cocktails.drinks);

                }
            }
        })
    }

}

//Delegation for the results area
function resultsDelegation(e){
    e.preventDefault();
    
    if(e.target.classList.contains('get-recipe')){
        cocktail.getSingleRecipe(e.target.dataset.id)
        .then(recipe => {
            //Displays single recipe into a modal
            ui.displaySingleRecipe(recipe.recipe.drinks[0]);
        })
    }

    //When favorite btn is clicked
    if(e.target.classList.contains('favorite-btn')){
        if(e.target.classList.contains('is-favorite')){
            //remove class
            e.target.classList.remove('is-favorite');
            e.target.textContent = '+';

            //Remove from local storage
            cocktailDB.removeFromDb(e.target.dataset.id);
        } else {
            //Add the class
            e.target.classList.add('is-favorite');
            e.target.textContent = '-';

            //Get Info
            const cardBody = e.target.parentElement;
            

            const drinksInfo = {
                id: e.target.dataset.id,
                name: cardBody.querySelector('.class-title').textContent,
                image: cardBody.querySelector('.card-img-top').src
            }
            
            //Add into Storage
            cocktailDB.saveIntoDB(drinksInfo);
        }
    }
}

//Document REady

function documentReady(){
    // Display on load the favorites from storage
    ui.isFavorite();

    //Select the search category
    const searchCategory = document.querySelector('.search-category');
    if(searchCategory){
        ui.displayCategories();
    }

    //When favorites page
    const favoritesTable = document.querySelector('#favorites');
    if(favoritesTable){
        //Get the favorites from local storage and display them
        const drinks = cocktailDB.getFromDB();
        ui.displayFavorites(drinks);

        //When view or delete are clicked
        favoritesTable.addEventListener('click', (e)=>{
            e.preventDefault();

            //Delegation
            if(e.target.classList.contains('get-recipe')){
                cocktail.getSingleRecipe(e.target.dataset.id)
                .then(recipe => {
                //Displays single recipe into a modal
                ui.displaySingleRecipe(recipe.recipe.drinks[0]);
                })
            }
            //When remove button is cliked in favorites
            if(e.target.classList.contains('remove-recipe')){
                //Remove from dom
                ui.removeFavorite(e.target.parentElement.parentElement);

                //Remove from local storage
                cocktailDB.removeFromDb(e.target.dataset.id);
            }
        })
    }
}