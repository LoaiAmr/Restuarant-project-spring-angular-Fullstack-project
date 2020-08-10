import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService, AuthResponseData } from '../authentication.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';


@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  isLoginMode = true;
  isLoadingMode = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  // private closeSub: Subscription;


  constructor(private authService: AuthenticationService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }


  onSubmit(form: NgForm) {

    /** if the hacker inturrept the [disabled] button from the frontend so it secured it in backend
     * by using if statement
     */
    if (!form.valid) {
      return;
    }


    const email = form.value.email;
    const password = form.value.password;
    this.isLoadingMode = true;
    let authenticationObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {

      authenticationObservable = this.authService.login(email, password);

    } else {

      authenticationObservable = this.authService.signup(email, password);

    }


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

  // ngOnDestroy() {
  //   if(this.closeSub) {
  //     this.closeSub.unsubscribe();
  //   }
  // }

  onHandleError() {
    this.error = null;
  }

  // private showErrorAlert(messageError: string) {
  //   /** if we need to create object from component we don't use 
  //    * const alertComponent = new AlertComponent(); ====> this is false in angular
  //    */
  //   const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

  //   const hostViewContainerRef = this.alertHost.viewContainerRef;
  //   hostViewContainerRef.clear();
  //   const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
  //   componentRef.instance.messageError = messageError;
  //   this.closeSub = componentRef.instance.close.subscribe(() => {
  //     this.closeSub.unsubscribe();
  //     hostViewContainerRef.clear();
  //   });

  // }

}
