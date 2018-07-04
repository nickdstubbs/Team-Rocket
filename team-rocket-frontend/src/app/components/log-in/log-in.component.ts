import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  message: string = "";
  username: string = "";
  define: string = "";
  
  login() {
    sessionStorage.setItem("loggedIn", "true");
    this.router.navigate(['/profile']);
    location.reload();
  }
  constructor(private http:Http, private router: Router) { }

  ngOnInit() {
  }

  attemptLogin() {
    console.log(this.username);
    console.log(this.define);
    this.http.post('http://team-rocket.us-east-2.elasticbeanstalk.com/login?username='+this.username+'&password='+this.define, "{}").subscribe((res) => {
      console.log(res);
      if(res.json() == undefined){
        this.message = "invalid cridentials";
      } else {
        this.login();
      }
    });
    
  }

}
