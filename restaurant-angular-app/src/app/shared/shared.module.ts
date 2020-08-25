import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { loadingSpinnerComponent } from './loading-spinner/loading-spinner';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { CheckboxesAuthComponent } from './checkboxes-auth/checkboxes-auth.component';
import { MaterialModule } from '../material-module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AlertComponent,
        loadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        OrderComponent,
        CheckboxesAuthComponent,
    ],
    
    imports: [
                CommonModule, 
                MaterialModule,
                // In this module we didn't using form but In order to use two-way data 'NgModle' binding for form inputs 
                // you need to import the FormsModule package
                FormsModule      
            ],
    
    /** To allow other component to use component inside it  */
    exports: [
    AlertComponent,
    loadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CheckboxesAuthComponent,
    CommonModule // it uses to can access ngFor and ngIf because (BrowserModule) can be use once in the application
]
})
export class SharedModule {}