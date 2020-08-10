import { Subject } from 'rxjs';

import { IngredientShoppingList } from '../shared/IngredientShoppingList';

export class ShoppingListService {

    ingredientChanged = new Subject<IngredientShoppingList[]>();
    startEditing = new Subject<number>();



    private ingredients: IngredientShoppingList[] = [];

    constructor() {

    }

    setShoppingListFromDataStorage(ingredients: IngredientShoppingList[]) {
        this.ingredients = ingredients;
        this.ingredientChanged.next(this.ingredients.slice())
    }

    public findAllIngredients() {
        return this.ingredients.slice();
    }

    getIngredientById(id: number) {
        return this.ingredients.find(ingredient => ingredient.id == id);
    }

    public addIngredient(ingredient: IngredientShoppingList) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    updateIngredientById(id: number, newIngredient: IngredientShoppingList) {
        let oldIngredient = this.ingredients.find(ingredient => ingredient.id == id);
        let index = this.ingredients.indexOf(oldIngredient);
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredientById(id: number) {
        let deletedIngredient = this.ingredients.find(ingredient => ingredient.id == id);
        let index = this.ingredients.indexOf(deletedIngredient);
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addIngredientsFromRecipeService(ingredients: IngredientShoppingList[]) {
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
    }

}