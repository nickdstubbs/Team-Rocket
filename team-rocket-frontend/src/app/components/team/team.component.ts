import { Component, OnInit } from '@angular/core';
import { Team } from '../../team';
import { Http } from '@angular/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DbTeam } from '../../dbTeam';
import { teamPokemon } from '../teams/teamPokemon.interface';
import { TrainerService } from '../trainer/trainer.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  team: Team[];
  dbTeam: DbTeam[];
  name: String = "Team";
  constructor(private activeRoute: ActivatedRoute, private http: Http, private serve: TrainerService, private router: Router) { }


  

  ngOnInit() {
    this.team = [{
      nickname: "",
      description: "",
      poketeam: [],
      id: 0
    }];
    this.dbTeam = [];
    this.activeRoute.paramMap.subscribe(paramMap => this.getTeam(paramMap));
  }

 

  getTeam(paramMap: ParamMap) {
    let id = paramMap.get('teamId');
    if (! /[0-9]+/.test(id)) {
      this.router.navigate(['./error']);
      return;
    }
    this.http.get('http://team-rocket.us-east-2.elasticbeanstalk.com/team?teamId=' + id).subscribe((res) => {
      let t;
      try {
        console.log(res.json());
        t = res.json();
      } catch (error) {
        this.router.navigate(['./error']);
        return;
      }

      this.dbTeam.push({
        nickname: t.teamName,
        description: "",
        poketeam: [],
        id: t.teamId
      })
      for (let i = 0; i < 6; i++) {
        this.dbTeam[0].poketeam.push({
          id: 0,
          name: "",
          level: 0,
          sprites: {
            front_default: "http://i.imgur.com/EgIXnFE.jpg"
          },
          types: []
        });
      }
      for (let j = 0; j < this.dbTeam[0].poketeam.length; j++) {
        if (j >= t.pokemon.length) {
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
        this.dbTeam[0].poketeam[j] = temp;
      }

      this.team = this.serve.getVar();
      this.serve.getTeams(this.dbTeam);
      this.name = t.teamName;
    })
  }

}
