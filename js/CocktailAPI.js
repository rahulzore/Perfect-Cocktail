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
}