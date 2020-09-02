import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { IngredientShoppingList } from 'src/app/shared/IngredientShoppingList';
import { ShoppingListService } from '../shopping-list.service';
import { ShoppingListDataStorage } from '../shopping-list-data-storage';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('ingredientForm') slForm: NgForm;

  subscription: Subscription;
  savedSubscription: Subscription;
  updatedSubscription: Subscription;
  deletedSubscription: Subscription;

  editIedtemIngredientIndex: number;
  editIedtemIngredientId: number;
  editMode = false;
  editedIngredientItem: IngredientShoppingList;


  constructor(
    private shoppingListService: ShoppingListService,
    private shoppingListDB: ShoppingListDataStorage) { }

  ngOnInit() {

    this.subscription = this.shoppingListService.startEditing.subscribe(
      (id: number) => {
        this.editIedtemIngredientId = id;
        this.editMode = true;
        this.editedIngredientItem = this.shoppingListService.getIngredientById(id);
        this.slForm.setValue({
          name: this.editedIngredientItem.name,
          amount: this.editedIngredientItem.amount
        })
      });

  }

  onSubmit(ingredientForm: NgForm) {

    const value = ingredientForm.value;
    const newIngredient = new IngredientShoppingList(0, value.name, value.amount);
    if (this.editMode === true) {

      this.shoppingListDB.updateitemInShoppingList(this.editIedtemIngredientId, newIngredient);

    } else {

      this.shoppingListDB.saveitemInShoppingList(newIngredient);

    }
    this.editMode = false;
    ingredientForm.reset();
  }

  onDelete() {
    this.shoppingListDB.deleteitemInShoppingList(this.editIedtemIngredientId);
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.updatedSubscription) {
      this.updatedSubscription.unsubscribe();
    }
    if (this.savedSubscription) {
      this.savedSubscription.unsubscribe();
    }
    if (this.deletedSubscription) {
      this.deletedSubscription.unsubscribe();
    }
  }

}
