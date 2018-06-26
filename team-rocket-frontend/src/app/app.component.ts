import { Component, OnInit } from '@angular/core';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Team Rocket';
  loggedIn = false;
  showDropdown = false;
  show() {
    this.showDropdown = true;
  }
  hide() {
    this.showDropdown = false;
  }

  

}
