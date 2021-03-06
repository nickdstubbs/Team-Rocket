import { Component, OnInit } from '@angular/core';
import { Team } from '../../team';
import { Pokemon } from '../pokemon/pokemon.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { Http } from '@angular/http';
import { PokeTeamService } from './pokeTeam.service';
import { teamPokemon } from './teamPokemon.interface';
import { TeamsPageService } from './teams-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];

  dbTeams: Team[] = [];
  constructor(private serve: TeamsPageService, private http: Http, private router: Router) {
  }
  ngOnInit() {
    if(sessionStorage.getItem("loggedIn") != "true") {
      this.router.navigate(['/home']);
    }
    let id = sessionStorage.getItem("userId");
    this.http.get('http://team-rocket.us-east-2.elasticbeanstalk.com/account/teams?userId='+id).subscribe((res) => {
    //console.log(res);  
    let ts = res.json();
      let index = 0;
      for (let t of ts) {
        this.dbTeams.push({
          teamName: t.teamName,
          description: "",
          pokemon: [],
          teamId: t.teamId
        })
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
          this.dbTeams[index].pokemon[j] = temp;
        }
        index++;
      }
      this.teams = this.serve.getVar();
      this.serve.getTeams(this.dbTeams);
    });
  }

}
