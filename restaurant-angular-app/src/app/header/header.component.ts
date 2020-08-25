import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { RecipesDataStorage } from '../recipes/recipes-data-storage';
import { AuthenticationService } from '../authentication/authentication.service';
import { User} from '../authentication/user.model';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class headerComponent implements OnInit, OnDestroy {

    isAuthenticated = false;
    isAdmin: boolean = false;
    authenticationSubsription: Subscription;


    constructor(
        private recipesDataStorage: RecipesDataStorage,
        private authService: AuthenticationService) { }



    ngOnInit() {
        this.authenticationSubsription = this.authService.user.subscribe(user => {
            //If not user set (isAuthenticated = false) else set (isAuthenticated = true) it can be write it by (!!user) 
            this.isAuthenticated = !user ? false : true;

            //It check If the user is Admin or not
            if(this.isAuthenticated) {
                this.isAdmin = this.checkUserIfAdmin(user);
            }
        });
    }

    onSaveRecipes() {
    }

    onGetRecipes() {
        this.recipesDataStorage.getRecipes().subscribe();;
    }


    onLogout() {
        this.authService.logout();
    }

    checkUserIfAdmin(user: User): boolean {
               for(let role of user.authorities) {
                    if(role.authority === 'admin') {
                        return true;
                    }
               }
               return false
    }

    ngOnDestroy() {
        this.authenticationSubsription.unsubscribe();
    }
}