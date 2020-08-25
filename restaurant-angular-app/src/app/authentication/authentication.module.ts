import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';


@NgModule({
    declarations: [SignupComponent, SigninComponent],
    imports: [
        FormsModule,
        // http://localhost:4200/login
        RouterModule.forChild([ { path: '', component: SigninComponent } ]),
        SharedModule
    ]
})
export class AuthenticationModule { }