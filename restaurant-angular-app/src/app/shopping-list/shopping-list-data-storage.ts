import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { ShoppingListService } from './shopping-list.service';
import { IngredientShoppingList } from '../shared/IngredientShoppingList';

@Injectable({ providedIn: 'root' })
export class ShoppingListDataStorage {

    private shoppingListUrl: string;

    constructor(
        private http: HttpClient,
        private shoppingListService: ShoppingListService) {
        this.shoppingListUrl = 'http://localhost:8080/restaurant/shopping-list';
    }

    getShoppingList() {
        return this.http.get<IngredientShoppingList[]>(this.shoppingListUrl)
            .pipe(
                map(ingredients => {

                    return ingredients;

                }), tap(ingredients => {
                    this.shoppingListService.setShoppingListFromDataStorage(ingredients);
                })
            );
    }

    saveitemInShoppingList(newIngredient: IngredientShoppingList) {
        this.http.post<IngredientShoppingList>(this.shoppingListUrl, newIngredient).subscribe(ingredient => {
            this.shoppingListService.addIngredient(ingredient);
        });;
    }

    saveListInShoppingList(newIngredients: IngredientShoppingList[]) {
        const url = this.shoppingListUrl + '/collection';
        this.http.post<IngredientShoppingList[]>(url, newIngredients).subscribe(ingredients => {
            this.shoppingListService.addIngredientsFromRecipeService(ingredients);
        });;
    }



    updateitemInShoppingList(ingredientId: number, newIngredient: IngredientShoppingList) {

        const url = this.shoppingListUrl + '/' + ingredientId;

        this.http.patch<IngredientShoppingList>(url, newIngredient).subscribe(ingredient => {
            this.shoppingListService.updateIngredientById(ingredientId, ingredient);
        });
    }

    deleteitemInShoppingList(ingredientId: number) {
        const url = this.shoppingListUrl + '/' + ingredientId;
        this.http.delete<IngredientShoppingList>(url).subscribe(ingredient => {
            this.shoppingListService.deleteIngredientById(ingredient.id);
        });
    }

}