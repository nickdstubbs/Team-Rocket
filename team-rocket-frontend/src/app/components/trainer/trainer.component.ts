import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Http } from '@angular/http';
import { User } from '../../user';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {
  public user: User = {
    id: 0,
    name: "",
    email: "",
    teams: []
  };
  public teams = [];
  public id;
  public hasTeams = true;

  constructor(private activeRoute: ActivatedRoute, private http: Http) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(paramMap => this.getUser(paramMap));
  }

  getUser(paramMap: ParamMap) {
    this.id = paramMap.get('trainerId');
    this.http.get('http://team-rocket.us-east-2.elasticbeanstalk.com/accounts').subscribe((res) => {
      let users = res.json();
      for(let u of users) {
        if(u.user_id == this.id) {
          this.user = u;
        }
      }
    })
    this.http.get('http://team-rocket.us-east-2.elasticbeanstalk.com/accounts/teams').subscribe((res) => {
      let ts = res.json();
      for(let t of ts) {
        if(t.userId == this.id) {
          this.teams.push(t);
        }
      }
      if(this.teams.length < 1) {
        this.hasTeams = false;
      }
    })
  }
}
