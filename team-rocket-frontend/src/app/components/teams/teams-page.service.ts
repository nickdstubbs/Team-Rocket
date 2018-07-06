import { Injectable } from "@angular/core";
import { Team } from "../../team";
import * as Pokedex from '../../../../node_modules/pokedex-promise-v2';
import { teamPokemon } from "./teamPokemon.interface";

@Injectable()
export class TeamsPageService {
    teams: Team[] = [];
    getVar() {
        let temp = this.teams.length;
        for (let i = 0; i < temp; i++) {
            this.teams.pop();
        }
        return this.teams;
    }
    getTeams(dbTeams: Team[]) {
        var options = {
            protocol: 'https',
            timeout: 60 * 1000
        }
        var P = new Pokedex(options);
        let setPoke = (i: number, p: number, member) => {
            this.teams[i].pokemon[p - 1] = member;
        }
        for (let i = 0; i < dbTeams.length; i++) {
            this.teams.push({
                teamName: "",
                description: "",
                pokemon: [],
                teamId: 0
            });
            for (let j = 0; j < 6; j++) {
                this.teams[i].pokemon.push({
                    id: 0,
                    name: "",
                    level: 0,
                    sprites: { front_default: "http://i.imgur.com/EgIXnFE.jpg" },
                    types: [""]
                })

            }
        }
        for (let i = 0; i < dbTeams.length; i++) {
            this.teams[i].teamName = dbTeams[i].teamName;
            this.teams[i].description = dbTeams[i].description;
            this.teams[i].teamId = dbTeams[i].teamId;
            for (let j = 0; j < 6; j++) {
                if (dbTeams[i].pokemon[j].id < 1) {
                    continue;
                }
                P.getPokemonByName(dbTeams[i].pokemon[j].id) // with Promise
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