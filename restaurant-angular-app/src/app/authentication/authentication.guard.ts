import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';


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
                const isAuthenticate = !!user; /** it return true  or false */
                if (isAuthenticate) {
                    return true;
                }
                    return this.router.createUrlTree(['/auth']);
                
            })
            // tap(isAuthenticate => {
            //     if (!isAuthenticate) {
            //         this.router.navigate(['/auth']);
            //     }
            // })
        );
    }





}