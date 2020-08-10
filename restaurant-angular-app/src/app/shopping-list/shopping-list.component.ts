import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { IngredientShoppingList } from '../shared/IngredientShoppingList';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListDataStorage } from './shopping-list-data-storage';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: IngredientShoppingList[];
  private ingredientChangedSubscirption: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private shoppingListDB: ShoppingListDataStorage) { }

  ngOnInit() {

    this.shoppingListDB.getShoppingList().subscribe();

    this.ingredientChangedSubscirption = this.shoppingListService.ingredientChanged.subscribe(
      (ingredients: IngredientShoppingList[]) => {
        this.ingredients = ingredients;

      }
    );

  }

  onEditIngredientItem(id: number) {
    this.shoppingListService.startEditing.next(id);
  }

  ngOnDestroy() {
    this.ingredientChangedSubscirption.unsubscribe();
  }
}
