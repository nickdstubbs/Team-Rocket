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
    //location.reload();
  }
  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
  }

  attemptLogin() {
    if (this.username == "" || this.define == "") {
      this.message = "All fields must be completed"
    } else if (/\W/.test(this.username)) {
      this.message = "Username must be alpha numeric, but can include underscores";
    } else if (/\W/.test(this.define)) {
      this.message = "Password must be alpha numeric, but can include underscores";
    } else {
      let cred = {
        username: this.username,
        password: this.define
      }
      this.http.post('http://team-rocket.us-east-2.elasticbeanstalk.com/login', cred).subscribe((res) => {
        //console.log(res);
        if (res.json().user_id != 0) {
          sessionStorage.setItem("userId", res.json().user_id);
          sessionStorage.setItem("username", res.json().username);
          sessionStorage.setItem("userEmail", res.json().email);
          this.login();
        } else {
          this.message = "invalid cridentials";
        }
      });
    }

  }

}
