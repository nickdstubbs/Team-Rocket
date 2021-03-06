import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Http } from '@angular/http';
import { User } from '../../user';
import { Team } from '../../Team';
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
  public dbTeams: Team[] = [];
  public id;
  public hasTeams = true;

  constructor(private activeRoute: ActivatedRoute, private http: Http, private serve: TrainerService, private router: Router) { }

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
      let found = false;
      for (let u of users) {
        if (u.user_id == this.id) {
          this.user = u;
          found = true;
        }
      }
      if(!found) {
        this.router.navigate(['/error']);
      }
    })
    this.http.get('http://team-rocket.us-east-2.elasticbeanstalk.com/accounts/teams').subscribe((res) => {
      let ts = res.json();
      //console.log(ts);
      let index = 0;
      for (let t of ts) {
        //console.log("hey");
        if (t.userId == this.id) {
          this.dbTeams.push({
            teamName: t.teamName,
            description: "",
            pokemon: [],
            teamId: t.teamId
          });
          for (let i = 0; i < 6; i++) {
            this.dbTeams[index].pokemon.push({
              id: 0,
              name: "",
              level: 0,
              sprites: {
                front_default: "http://i.imgur.com/EgIXnFE.jpg"
              },
              types: []
            })
          }
          for (let j = 0; j < this.dbTeams[index].pokemon.length; j++) {
            if(j >= t.pokemon.length) {
              break;
            }
            let temp: teamPokemon = {
              id: t.pokemon[j].pokeId,
              name: t.pokemon[j].name,
              level: t.pokemon[j].level,
              sprites: {
                front_default: ""
              },
              types: []
            }
            this.dbTeams[index].pokemon[j] = temp;
          }

          //console.log(this.dbTeams);
          index++;
        }
      }
      this.teams = this.serve.getVar();
      //console.log(this.dbTeams);
      this.serve.getTeams(this.dbTeams);
      if (this.teams.length < 1) {
        this.hasTeams = false;
      }
    })
  }
}
