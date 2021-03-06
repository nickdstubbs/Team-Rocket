import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = "Team Rocket";
  phrase = "Prepare for trouble!";
  loggedIn: boolean;

  toggle( ) {
    if(this.phrase === "Prepare for trouble!") {
      this.phrase = "And make it double!"
    } else {
      this.phrase = "Prepare for trouble!";
    }
  }
  
  constructor() { }

  ngOnInit() {
    if(!sessionStorage.getItem("loggedIn")) {
      sessionStorage.setItem("loggedIn", "false");
    }
    if(sessionStorage.getItem("loggedIn") == "true") {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

}
