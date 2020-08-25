import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

import { User, Authority } from './user.model';

export interface AuthResponseData {
    id: number;
    username: string;
    email: string;
    authorities: Authority[];
    expirationDate: number;
    token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient,
        private router: Router) { }

    //==========================Start signup==========================
    signup(username: string, email: string, password: string, roles: string) {
        return this.http.post<AuthResponseData>('http://localhost:8080/restaurant/signup', {
            username: username,
            email: email,
            password: password,
            roles: roles,
        }).pipe(catchError(this.handleError), tap(responseData => {
            this.handleAuthentication(
                responseData.id,
                responseData.username,
                responseData.email,
                responseData.authorities,
                responseData.expirationDate,
                responseData.token
            )
        })
        );
    }

    //==========================Start Login==========================
    login(username: string, password: string) {

        return this.http.post<AuthResponseData>('http://localhost:8080/restaurant/login',
            {
                username: username,
                password: password
            }
        ).pipe(catchError(this.handleError), tap(responseData => {
            this.handleAuthentication(
                responseData.id,
                responseData.username,
                responseData.email,
                responseData.authorities,
                responseData.expirationDate,
                responseData.token
            )
        }
        ));

    }

    //==========================Start Auto Login==========================
    autoLogin() {

        const userData: {
            id: number;
            username: string;
            email: string;
            authorities: Authority[];
            expirationDate: number;
            token: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadUser = new User(userData.id,
            userData.username,
            userData.email,
            userData.authorities,
            new Date(userData.expirationDate),
            userData.token);

        if (loadUser.userToken) {
            this.user.next(loadUser);
            const expirationDuration = new Date(userData.expirationDate).getTime() - new Date().getTime();
            // this.autoLogout(expirationDuration);
        }
    }


    //==========================Start Logout==========================
    logout() {
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');

        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }


    // autoLogout(expirationDuration: number) {
    //     this.tokenExpirationTimer = setTimeout(() => {
    //         this.logout();
    //     }, expirationDuration);
    // }

    private handleAuthentication(userId: number, username: string, email: string, authorities: Authority[], expirationDate: number, token: string) {

        const expiresIn = new Date(new Date().getTime() + expirationDate * 1000);

        const user = new User(userId, username, email, authorities, expiresIn, token);
        this.user.next(user);

        // this.autoLogout(expirationDate * 1000);

        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResponse: HttpErrorResponse) {

        let errorMessage = 'An Unknown error occured!'
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }
        switch (errorResponse.error.message) {
            case 'This Email exists already! Please Login':
                errorMessage = 'This Email exists already! Please Login';
                break;

            case 'This user Not Exists! Please Signup':
                errorMessage = 'This Email Not Found! Please Signup'
                break;

            case 'Please Enter the valid password!':
                errorMessage = 'Please Enter the valid password!'
                break;

            case 'You are disabled by an administrator':
                errorMessage = 'You are disabled by an administrator'
                break;

        }
        return throwError(errorMessage);
    }

}