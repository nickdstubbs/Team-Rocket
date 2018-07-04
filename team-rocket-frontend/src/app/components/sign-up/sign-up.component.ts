import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  message: string = "";
  username: string = "";
  email: string = "";
  password: string = "";
  passconf: string = "";
  login() {
    sessionStorage.setItem("loggedIn", "true");
    this.router.navigate(['/profile']);
    location.reload();
  }

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
  }

  attemptSignup() {
    if(this.password != this.passconf) {
      this.message = "Passwords didn't match";
    } else if(! /\w+@\w+\.\w+/.test(this.email)) {
      this.message = "Invalid email"
    } else {
      this.http.post('http://team-rocket.us-east-2.elasticbeanstalk.com/signup?username='+this.username+'&email='+this.email+'&password'+this.password, "").subscribe((res) => {
        if(res.json() == undefined) {
          this.message = "account taken";
        } else {
          this.login();
        }
      })
    }
  }

}
