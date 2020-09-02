import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { OrderComponent } from './shared/order/order.component';





const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'order', component: OrderComponent},
    
    // It is (Lazy Loading). you need to re-compile the programe after it,
    // and you should delete the (RecipeModule) From app.module.ts 
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.Module').then(m => m.ShoppingListModule) },
    { path: 'login', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
    { path: 'signup', component: SignupComponent},
    
    
    // {pathsignup '**', redirectTo: '/recipes'}
]

@NgModule({
    /** (preloadAllModule ==> lazy loading) it load all modules togethe
     *  and all modules is available for the user */
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}