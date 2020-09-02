import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthenticationService, AuthResponseData } from '../authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  isLoginMode = true;
  isLoadingMode = false;
  error: string = null;


  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }


  onSubmit(form: NgForm) {

    // if the hacker inturrept the [disabled] button from the frontend so it secured it in backend
    // by using if statement
    if (!form.valid) {
      return;
    }


    const username = form.value.username;
    const password = form.value.password;
    this.isLoadingMode = true;
    let authenticationObservable: Observable<AuthResponseData>;

    authenticationObservable = this.authService.login(username, password);

    authenticationObservable.subscribe(
      responseData => {
        console.log(responseData);
        this.isLoadingMode = false;
        this.router.navigate(['/recipes']);

      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        // this.showErrorAlert(errorMessage);
        this.isLoadingMode = false;
      }
    );
    
    form.reset();
  }


    onHandleError() {
    this.error = null;
  }
}