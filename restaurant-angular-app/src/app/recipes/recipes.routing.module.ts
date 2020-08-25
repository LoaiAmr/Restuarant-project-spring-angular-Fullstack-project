import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './recipes.component';
// import { AuthenticationGuard } from '../authentication/authentication.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverService } from './recipe.resolver.services';
import { AuthenticationGuard } from '../authentication/authentication.guard';


const routes: Routes = [

    {
        path: '', component: RecipesComponent,
        canActivate: [AuthenticationGuard],   /** to make authentication if you not logged in to access this route */

        children: [     /** http://localhost:4200/recipes */
            { path: '', component: RecipeStartComponent },           /** http://localhost:4200/recipes */
            /** it must be before :id in the order to make angular it is not a dynamic id */
            { path: 'new', component: RecipeEditComponent },         /** http://localhost:4200/recipes/new */

            {
                path: ':id', component: RecipeDetailComponent,        /** http://localhost:4200/recipes/id */
                resolve: [RecipeResolverService]
            },
            {
                path: ':id/edit', component: RecipeEditComponent,      /** http://localhost:4200/recipes/id/edit */
            },
        ]
    },

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule { }