import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { USER } from '../../mock-user'
import { Team } from '../../team';
import { DbTeam } from '../../dbTeam';
import { PokeTeamService } from '../teams/pokeTeam.service';
import { TeamsPageService } from '../teams/teams-page.service';
import { Http } from '@angular/http';
import { teamPokemon } from '../teams/teamPokemon.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  max: number;
  previewTeams: DbTeam[];
  preview: Team[];

  constructor(private serve: TeamsPageService, private http: Http) { }

  ngOnInit() {

    this.user = {
      id: Number(sessionStorage.getItem("userId")),
      name: sessionStorage.getItem("username"),
      email: sessionStorage.getItem("userEmail"),
      teams: []
    }
    this.http.get('http://team-rocket.us-east-2.elasticbeanstalk.com/accounts/team?userId=' + this.user.id).subscribe((res) => {
      let ts = res.json();
      let index = 0;
      for (let t of ts) {
        this.user.teams.push({
          nickname: t.teamName,
          description: "",
          poketeam: [],
          id: t.teamId
        })
        for (let i = 0; i < 6; i++) {
          this.user.teams[index].poketeam.push({
            id: 0,
            name: "",
            level: 0,
            sprites: {
              front_default: "http://i.imgur.com/EgIXnFE.jpg"
            },
            types: []
          })
        }
        for (let j = 0; j < this.user.teams[index].poketeam.length; j++) {
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
          this.user.teams[index].poketeam[j] = temp;
        }
        index++;
      }
      this.preview = this.serve.getVar();
      this.serve.getTeams(this.user.teams);
      if (this.preview.length > 2) {
        this.max = 2;
      } else {
        this.max = this.preview.length;
      }
    });
  }

  hasNext(num) {
    if (num < this.max + 1) {
      return true;
    } else {
      return false;
    }
  }
}
