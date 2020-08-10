import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, from } from 'rxjs';

import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localld: string;
    registered?: boolean; /** (?) means this is optional  */
}



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    apiKey = 'AIzaSyBljlAk28qWRbdZ7sKNp6keY3v9Xn5lvPs'; /** From Firebase Project setting  */
    user = new BehaviorSubject<User>(null); 
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient,
                private router: Router) { }


    signup(email: string, password: string) {

        /** Firebase rest api for authentication */
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true

                /** Handling Errors in service */
            }).pipe(catchError(this.handleError), tap(responseData => {
                this.handleAuthentication(
                    responseData.email,
                    responseData.localld,
                    responseData.idToken,
                    +responseData.expiresIn);
            }));
    }


    login(email: string, password: string) {

        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }

        ).pipe(catchError(this.handleError), tap(responseData => {
            this.handleAuthentication(
                responseData.email,
                responseData.localld,
                responseData.idToken,
                +responseData.expiresIn);
        }));

    }

    autoLogin() {

        const userData: {
            email: string;
            userId: string;
            _token: string;
            _tokenExpirationDate: string /**it must be the same name in attribute in localStorage */
        } = JSON.parse(localStorage.getItem('userData'));


        if (!userData) {
            return;
        }

        const loadUser = new User(userData.email, userData.userId, userData._token, new Date(userData._tokenExpirationDate));

        if (loadUser.token) {
            this.user.next(loadUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }

    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');

        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {

        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }


    private handleError(errorResponse: HttpErrorResponse) {

        let errorMessage = 'An Unknown error occured!'
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }
        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This Email exists already! Please Login';
                break;

            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This Email Not Found! Please Signup'
                break;

            case 'INVALID_PASSWORD':
                errorMessage = 'Please Enter the valid password!'
                break;

            case 'USER_DISABLED':
                errorMessage = 'You are disabled by an administrator'
                break;

        }
        return throwError(errorMessage);
    }






















}