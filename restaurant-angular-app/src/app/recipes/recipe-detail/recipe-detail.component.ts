import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { RecipesDataStorage } from '../recipes-data-storage';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeSelectToDetail: Recipe;
  id: number;


  constructor(
    private recipeService: RecipeService,
    private recipesDataStorage: RecipesDataStorage,
    private route: ActivatedRoute,
    private router: Router,
    private DB: RecipesDataStorage) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeSelectToDetail = this.recipeService.getRecipeById(this.id);
        // this.recipeSelectToDetail = this.DB.getRecipeById(this.id);
      }

    );
  }

  onAddIngredientsToShoppingList() {
    this.recipeService.onAddIngredientsToShoppingListService(this.recipeSelectToDetail.ingredients);
    this.router.navigate(['/shopping-list']);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  onDeleteRecipe() {
    this.recipesDataStorage.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }

}
