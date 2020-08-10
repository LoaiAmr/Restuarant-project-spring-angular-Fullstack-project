import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Subscription } from 'rxjs';

import { RecipesDataStorage } from '../recipes/recipes-data-storage';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class headerComponent implements OnInit, OnDestroy {

    isAuthenticated = false;
    authenticationSubsription: Subscription;


    constructor(
        private recipesDataStorage: RecipesDataStorage,
        private authService: AuthenticationService) { }



    ngOnInit() {
        this.authenticationSubsription = this.authService.user.subscribe(user => {
            /** If not user set (isAuthenticated = false) else set (isAuthenticated = true) it can be write it by (!!user) */
            this.isAuthenticated = !user ? false : true;
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

    ngOnDestroy() {
        this.authenticationSubsription.unsubscribe();
    }
}