import { Injectable } from '@angular/core';
import { Team } from "../../team";
import { DbTeam } from "../../dbTeam";
import * as Pokedex from '../../../../node_modules/pokedex-promise-v2';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  teams: Team[] = [];
  getTeams(dbTeams: DbTeam[]) {
    var options = {
      protocol: 'https',
      timeout: 60 * 1000
    }
    var P = new Pokedex(options);
    let setPoke = (i: number, p: number, member) => {
      this.teams[i].poketeam[p - 1] = member;
    }
    for (let i = 0; i < dbTeams.length; i++) {
      this.teams.push({
        nickname: "",
        description: "",
        poketeam: []
      });
      for (let j = 0; j < 6; j++) {
        this.teams[i].poketeam.push({
          id: 0,
          name: "",
          level: 0,
          sprites: { front_default: "http://i.imgur.com/EgIXnFE.jpg" },
          types: [""]
        })
      }
    }
    for (let i = 0; i < dbTeams.length; i++) {
      this.teams[i].nickname = dbTeams[i].nickname;
      this.teams[i].description = dbTeams[i].description;
      for (let j = 0; j < 6; j++) {
        if (dbTeams[i].poketeam[j].id < 1) {
          continue;
        }
        P.getPokemonByName(dbTeams[i].poketeam[j].id) // with Promise
          .then(function (response) {
            //console.log(response);
            let poke = {
              id: response.id,
              name: response.name,
              level: 0,
              sprites: {
                front_default: response.sprites.front_default
              },
              types: response.types
            }
            setPoke(i, j + 1, poke);
          });
      }
    }
  }

}
