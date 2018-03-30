class CocktailDB {

    // Save the recipe into local storage

    saveIntoDB(drink){
        const drinks = this.getFromDB();
        drinks.push(drink);

        //Add new array into localStorage

        localStorage.setItem('drinks', JSON.stringify(drinks));
    }

    getFromDB(){
        let drinks;

        //Check from local storage

        if(localStorage.getItem('drinks') === null){
            drinks = [];
        } else {
            drinks = JSON.parse(localStorage.getItem('drinks'));
        }

        return drinks;
    }

    //Removes element from local storagfe
    removeFromDb(id){
        const drinks = this.getFromDB();

        //Loop
        drinks.forEach( (drink, index) => {
            if(id === drink.id){
                drinks.splice(index, 1)
            }
        } );

        //Set array into local storage
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }
}