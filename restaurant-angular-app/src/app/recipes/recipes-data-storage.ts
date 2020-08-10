import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesDataStorage {

    private recipesUrl: string;

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService) {

        this.recipesUrl = 'http://localhost:8080/restaurant/recipes';
    }


    public getRecipes() {
        return this.http.get<Recipe[]>('http://localhost:8080/restaurant/recipes').
            pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }), tap(recipes => {
                this.recipeService.setRecipesInDataStorageService(recipes);
            }));

    }


    public saveRecipe(newRecipe: Recipe) {

        this.http.post<Recipe>(this.recipesUrl, newRecipe).subscribe(recipe => {
            this.recipeService.addRecipe(recipe);
        });

    }

    public updateRecipe(recipeId: number, newdRecipe: Recipe) {

        const url = this.recipesUrl + '/' + recipeId;

        this.http.put<Recipe>(url, newdRecipe).subscribe(recipe => {
            this.recipeService.updaateRecipeById(recipeId, recipe);
        });
    }

    public deleteRecipe(recipeId: number) {

        const url = this.recipesUrl + '/' + recipeId;

        this.http.delete<Recipe>(url).subscribe(recipe => {
            this.recipeService.deleteRecipeById(recipeId);
        });
    }



}