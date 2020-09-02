import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ShoppingListDataStorage } from '../shopping-list/shopping-list-data-storage';
import { IngredientShoppingList } from '../shared/IngredientShoppingList';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [];

  constructor(private shoppingListDataStorage: ShoppingListDataStorage) { }

  setRecipesInDataStorageService(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }


  onAddIngredientsToShoppingListService(ingredients: IngredientShoppingList[]) {
    this.shoppingListDataStorage.saveListInShoppingList(ingredients);
  }

  getRecipeById(id: number) {
    return this.recipes.find(recipe => recipe.id == id);
  }



  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updaateRecipeById(id: number, newRecipe: Recipe) {
    let oldRecipe = this.recipes.find(recipe => recipe.id == id);
    let index = this.recipes.indexOf(oldRecipe);
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }


  deleteRecipeById(id: number) {
    let oldRecipe = this.recipes.find(recipe => recipe.id == id);
    let index = this.recipes.indexOf(oldRecipe);
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}