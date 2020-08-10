import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { RecipesDataStorage } from './recipes-data-storage';



@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(
        private recipeService: RecipeService,
        private recipeDataStorage: RecipesDataStorage) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeService.getRecipes();
        if (recipes.length === 0) {
            return this.recipeDataStorage.getRecipes();
        } else {
            return recipes;
        }
    }
}