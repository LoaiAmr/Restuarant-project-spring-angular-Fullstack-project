import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthenticateComponent } from './authenticate/authenticate.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [AuthenticateComponent],
    imports: [
        FormsModule,
        RouterModule.forChild([{ path: '', component: AuthenticateComponent }       /** http://localhost:4200/auth */]),
        SharedModule
    ]
})
export class AuthenticationModule { }