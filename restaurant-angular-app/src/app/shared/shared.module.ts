import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { loadingSpinnerComponent } from './loading-spinner/loading-spinner';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AlertComponent,
        loadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    
    imports: [CommonModule],
    
    /** To allow other component to use component inside it  */
    exports: [
    AlertComponent,
    loadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule /** it uses to can access ngFor and ngIf because (BrowserModule) can be use once in the application */
]
})
export class SharedModule {}