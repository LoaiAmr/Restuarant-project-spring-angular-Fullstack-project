import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { take, exhaustMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {

        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {

                // if the user not login yet return it's request to get the token 
                if (!user) {
                    return next.handle(request);
                }

                const modifiedRequest = request.clone({
                    //it used to add token to the request of user to make sure it be authenticated
                    setHeaders : {
                        'Authorization': `Bearer ${user.userToken}`
                    }
                });
                console.log(modifiedRequest);
                return next.handle(modifiedRequest);
            }));
    }
}