import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'restaurant-angular-tutorial';

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {

    /** if the user is logged in it keep it logged until he logout */
    this.authService.autoLogin();
    
  }

}
