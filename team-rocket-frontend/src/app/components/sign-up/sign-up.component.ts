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
    //location.reload();
  }

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
  }

  attemptSignup() {
    if (this.username == "" || this.email == "" || this.password == "" || this.passconf == "") {
      this.message = "All fields must be completed"
    } else if (/\W/.test(this.username)) {
      this.message = "Username must be alpha numeric, but can include underscores";
    } else if (/\W/.test(this.password)!) {
      this.message = "Passwords must be alpha numeric, but can include underscores";
    } else if (this.password != this.passconf) {
      this.message = "Passwords didn't match"
    } else if (! /\w+@\w+\.\w+/.test(this.email)) {
      this.message = "Invalid email"
    } else {
      let cred = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      this.http.post('http://team-rocket.us-east-2.elasticbeanstalk.com/signup', cred).subscribe((res) => {
        if (res.json().user_id != 0) {
          sessionStorage.setItem("userId", res.json().user_id);
          sessionStorage.setItem("username", res.json().username);
          sessionStorage.setItem("userEmail", res.json().email);
          this.login();
        } else {
          this.message = "account taken";
        }
      });
    }
  }

}
