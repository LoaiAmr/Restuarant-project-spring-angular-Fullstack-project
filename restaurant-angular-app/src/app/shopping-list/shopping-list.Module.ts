import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            /** if you have small routing or one routing create it inside the module */
            { path: '', component: ShoppingListComponent },       /** http://localhost:4200/shopping-list */
        ]), 
        SharedModule
    ]
})
export class ShoppingListModule { }