import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService,
        private router: Router) { }



    canActivate(route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot):
        boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.authenticationService.user.pipe(
            take(1),
            map(user => {

                 //it return true  or false 
                const isAuthenticate = !!user;

                if (isAuthenticate) {
                    return true;
                }
                
                return this.router.createUrlTree(['/login']);

            })
        );
    }
}

