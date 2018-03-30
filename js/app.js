// Instantiate the Classes
const ui = new UI(),
      cocktail = new CocktailAPI();


// Create the EVENT LISTENER
function eventListener(){

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
}