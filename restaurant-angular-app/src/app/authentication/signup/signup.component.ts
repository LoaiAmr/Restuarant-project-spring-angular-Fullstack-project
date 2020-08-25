import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../authentication.service';
import { AuthResponseData } from '../authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoginMode = true;
  isLoadingMode = false;
  error: string = null;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    
    // if the hacker inturrept the [disabled] button from the frontend so it secured it in backend
    // by using if statement
    if (!form.valid) {
      return;
    }

    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    const roles = form.value.roles;

    this.isLoadingMode = true;
    let authenticationObservable: Observable<AuthResponseData>;

    authenticationObservable = this.authService.signup(username, email, password, roles);

    authenticationObservable.subscribe(
      responseData => {
        console.log(responseData);
        this.isLoadingMode = false;
        this.router.navigate(['/recipes']);

      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoadingMode = false;
      });

    form.reset();
  }
}
