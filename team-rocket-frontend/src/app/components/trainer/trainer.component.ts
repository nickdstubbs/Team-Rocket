import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Http } from '@angular/http';
import { User } from '../../user';
import { DbTeam } from '../../dbTeam';
import { TeamsPageService } from '../teams/teams-page.service';
import { teamPokemon } from '../teams/teamPokemon.interface';
import { TrainerService } from './trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {
  public user;
  public teams = [];
  public dbTeams: DbTeam[] = [];
  public id;
  public hasTeams = true;

  constructor(private activeRoute: ActivatedRoute, private http: Http, private serve: TrainerService) { }

  ngOnInit() {
    this.teams = [];
    this.dbTeams = [];
    this.user = {
      id: 0,
      username: "Someone",
      email: "",
      teams: []
    }
    this.activeRoute.paramMap.subscribe(paramMap => this.getUser(paramMap));
  }

  getUser(paramMap: ParamMap) {
    this.id = paramMap.get('trainerId');
    this.http.get('http://team-rocket.us-east-2.elasticbeanstalk.com/accounts').subscribe((res) => {
      let users = res.json();
      for (let u of users) {
        if (u.user_id == this.id) {
          this.user = u;
        }
      }
    })
    this.http.get('http://team-rocket.us-east-2.elasticbeanstalk.com/accounts/teams').subscribe((res) => {
      let ts = res.json();
      console.log(ts);
      let index = 0;
      for (let t of ts) {
        //console.log("hey");
        if (t.userId == this.id) {
          this.dbTeams.push({
            nickname: t.teamName,
            description: "",
            poketeam: []
          });
          for (let i = 0; i < 6; i++) {
            this.dbTeams[index].poketeam.push({
              id: 0,
              name: "",
              level: 99,
              sprites: {
                front_default: "http://i.imgur.com/EgIXnFE.jpg"
              },
              types: []
            })
          }
          for (let j = 0; j < this.dbTeams[index].poketeam.length; j++) {
            let temp: teamPokemon = {
              id: t.pokemon[j].pokeId,
              name: t.pokemon[j].name,
              level: t.pokemon[j].level,
              sprites: {
                front_default: ""
              },
              types: []
            }
            this.dbTeams[index].poketeam[j] = temp;
          }
          index++;
        }
      }
      this.teams = this.serve.teams;
      //console.log(this.dbTeams);
      this.serve.getTeams(this.dbTeams);
      if (this.teams.length < 1) {
        this.hasTeams = false;
      }
    })
  }
}
