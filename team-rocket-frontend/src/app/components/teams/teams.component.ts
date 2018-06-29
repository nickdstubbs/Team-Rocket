import { Component, OnInit } from '@angular/core';
import { Team } from '../../team';
import { DbTeam } from '../../dbTeam';
import { Pokemon } from '../pokemon/pokemon.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { Http } from '@angular/http';
import { PokeTeamService } from './pokeTeam.service';
import { teamPokemon } from './teamPokemon.interface';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];

  dbTeams: DbTeam[] = [
    {
      nickname: "one",
      description: "",
      poketeam: {
        p1: "301",
        p2: "302",
        p3: "303",
        p4: "304",
        p5: "305",
        p6: "306"
      }
    }
    , {
      nickname: "two",
      description: "",
      poketeam: {
        p1: "307",
        p2: "308",
        p3: "309",
        p4: "310",
        p5: "311",
        p6: "312"
      }
    }
  ]
  constructor(private http: Http, private pokemonService: PokeTeamService) {
  }

  inst() {
    for (let i = 0; i < this.dbTeams.length; i++) {
      this.teams.push({
        nickname: "",
        description: "",
        poketeam: {
          p1: {
            id: 1,
            name: "",
            level: 0,
            sprites: { front_default: "http://i.imgur.com/EgIXnFE.jpg" },
            types: [""]
          },
          p2: {
            id: 1,
            name: "",
            level: 0,
            sprites: { front_default: "http://i.imgur.com/EgIXnFE.jpg" },
            types: [""]
          },
          p3: {
            id: 1,
            name: "",
            level: 0,
            sprites: { front_default: "http://i.imgur.com/EgIXnFE.jpg" },
            types: [""]
          },
          p4: {
            id: 1,
            name: "",
            level: 0,
            sprites: { front_default: "http://i.imgur.com/EgIXnFE.jpg" },
            types: [""]
          },
          p5: {
            id: 1,
            name: "",
            level: 0,
            sprites: { front_default: "http://i.imgur.com/EgIXnFE.jpg" },
            types: [""]
          },
          p6: {
            id: 1,
            name: "",
            level: 0,
            sprites: { front_default: "http://i.imgur.com/EgIXnFE.jpg" },
            types: [""]
          }
        }
      });
    }
  }
  init() {
    for (let i = 0; i < this.dbTeams.length; i++) {
      this.teams[i].nickname = this.dbTeams[i].nickname;
      this.teams[i].description = this.dbTeams[i].description;
      this.pokemonService.getPokemon(this.dbTeams[i].poketeam.p1).subscribe(temp1 => this.teams[i].poketeam.p1 = temp1)
      this.pokemonService.getPokemon(this.dbTeams[i].poketeam.p2).subscribe(temp2 => this.teams[i].poketeam.p2 = temp2)
      this.pokemonService.getPokemon(this.dbTeams[i].poketeam.p3).subscribe(temp3 => this.teams[i].poketeam.p3 = temp3)
      this.pokemonService.getPokemon(this.dbTeams[i].poketeam.p4).subscribe(temp4 => this.teams[i].poketeam.p4 = temp4)
      this.pokemonService.getPokemon(this.dbTeams[i].poketeam.p5).subscribe(temp5 => this.teams[i].poketeam.p5 = temp5)
      this.pokemonService.getPokemon(this.dbTeams[i].poketeam.p6).subscribe(temp6 => this.teams[i].poketeam.p6 = temp6)

    }
  }



  ngOnInit() {
    this.inst();
    this.init();
  }

}
