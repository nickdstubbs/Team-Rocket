import { Injectable } from "@angular/core";
import { Team } from "../../team";
import { DbTeam } from "../../dbTeam";
import * as Pokedex from '../../../../node_modules/pokedex-promise-v2';
import { teamPokemon } from "./teamPokemon.interface";

@Injectable()
export class TeamsPageService {
    teams: Team[] = [];
    getTeams(dbTeams: DbTeam[]) {
        //var Pokedex = require('pokedex-promise-v2');
        var options = {
            protocol: 'https',
            timeout: 60 * 1000
        }
        var P = new Pokedex(options);
        let setPoke = (i: number, p: number, member) => {
            switch (p) {
                case 1:
                    this.teams[i].poketeam[0] = member
                    break;
                case 2:
                    this.teams[i].poketeam[1] = member
                    break;
                case 3:
                    this.teams[i].poketeam[2] = member
                    break;
                case 4:
                    this.teams[i].poketeam[3] = member
                    break;
                case 5:
                    this.teams[i].poketeam[4] = member
                    break;
                case 6:
                    this.teams[i].poketeam[5] = member
                    break;
                default:
            }
        }
        for (let i = 0; i < dbTeams.length; i++) {
            this.teams.push({
                nickname: "",
                description: "",
                poketeam:[{
                    id: 1,
                    name: "",
                    level: 0,
                    sprites: { front_default: "http://i.imgur.com/EgIXnFE.jpg" },
                    types: [""]
                },
                {
                    id: 1,
                    name: "",
                    level: 0,
                    sprites: { front_default: "http://i.imgur.com/EgIXnFE.jpg" },
                    types: [""]
                },
                {
                    id: 1,
                    name: "",
                    level: 0,
                    sprites: { front_default: "http://i.imgur.com/EgIXnFE.jpg" },
                    types: [""]
                },
                {
                    id: 1,
                    name: "",
                    level: 0,
                    sprites: { front_default: "http://i.imgur.com/EgIXnFE.jpg" },
                    types: [""]
                },
                {
                    id: 1,
                    name: "",
                    level: 0,
                    sprites: { front_default: "http://i.imgur.com/EgIXnFE.jpg" },
                    types: [""]
                },
                {
                    id: 1,
                    name: "",
                    level: 0,
                    sprites: { front_default: "http://i.imgur.com/EgIXnFE.jpg" },
                    types: [""]
                }]
            }
    );
    }
    for(let i = 0; i <dbTeams.length; i++) {
    this.teams[i].nickname = dbTeams[i].nickname;
    this.teams[i].description = dbTeams[i].description;

    P.getPokemonByName(dbTeams[i].poketeam[0].id) // with Promise
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
            setPoke(i, 1, poke);
        });
    P.getPokemonByName(dbTeams[i].poketeam[1].id) // with Promise
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
            setPoke(i, 2, poke);
        });
    P.getPokemonByName(dbTeams[i].poketeam[2].id) // with Promise
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
            setPoke(i, 3, poke);
        });
    P.getPokemonByName(dbTeams[i].poketeam[3].id) // with Promise
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
            setPoke(i, 4, poke);
        });
    P.getPokemonByName(dbTeams[i].poketeam[4].id) // with Promise
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
            setPoke(i, 5, poke);
        });
    P.getPokemonByName(dbTeams[i].poketeam[5].id) // with Promise
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
            setPoke(i, 6, poke);
        });
}
    }

    


}