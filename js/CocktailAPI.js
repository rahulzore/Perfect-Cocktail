class CocktailAPI{

    // Get recipe by name
    async getDrinksByName(name){
        //Search by name
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);

        // Return a json response

        const cocktails = await apiResponse.json();

        return{
            cocktails
        } 
    }

    //Get recipe by ingrediant
    async getDrinksByIngredient(ingredient){
        //Search by ingrediant
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

        //Retuern a json response

        const cocktails = await apiResponse.json();

        return {
            cocktails
        }
    }

    //Get single recipe
    async getSingleRecipe(id){
        //Search by ingrediant
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

        //Retuern a json response

        const recipe = await apiResponse.json();

        return {
            recipe
        }
    }

    //Retrieves all categories from REST API

    async getCategories(){
        const apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

        //wait for the response and return json

        const categories = await apiResponse.json();

        return{
            categories
        }
    }

    //Get Drinks by category
    async getDrinksByCategory(category){
        //Search by category
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);

        //Retuern a json response

        const cocktails = await apiResponse.json();

        return {
            cocktails
        }
    }


    //Get Alcohol or non Alcohol Drinks
    async getDrinksByAlcohol(term){
        //Search by Alcohol
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`);

        //Retuern a json response

        const cocktails = await apiResponse.json();

        return {
            cocktails
        }
    }
}