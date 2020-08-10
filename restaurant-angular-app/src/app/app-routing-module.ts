import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';





const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },

    /**It is (Lazy Loading). you need to re-compile the programe after it,
     *  and you should delete the (RecipeModule) From app.module.ts */
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.Module').then(m => m.ShoppingListModule) },
    { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
    
    // {path: '**', redirectTo: '/recipes'}
]

@NgModule({
    /** (preloadAllModule ==> lazy loading) it load all modules together just once to resolve connection weeks
     *  and all modules is available for the user */
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}