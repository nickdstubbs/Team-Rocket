import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'Team Rocket';
  loggedIn;
  showDropdown = false;
  show() {
    this.showDropdown = true;
  }
  hide() {
    this.showDropdown = false;
  }

  logOut() {
    sessionStorage.setItem("loggedIn", "false");
  }

  
  ngOnInit (){
    //sessionStorage.clear();
    
    //console.log(sessionStorage.getItem("loggedIn"))
    if(sessionStorage.getItem("loggedIn") == null || sessionStorage.getItem("loggedIn") !="true") {
      //console.log("here");
      sessionStorage.setItem("loggedIn", "false");
    }
    this.loggedIn = sessionStorage.getItem("loggedIn")=="true"? true: false;
    //console.log(this.loggedIn)
  }
}
