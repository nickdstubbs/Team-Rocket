import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { teamPokemon } from "./teamPokemon.interface";

@Injectable()
export class PokeTeamService {

    constructor(private http: Http) { }

    getPokemon(nameOrId: string): Observable<teamPokemon> { //Observable<teamPokemon>  teamPokemon
        // let Pokedex = require('pokedex-promise-v2');
        // let options = {
        //     protocol: 'https',
        //     timeout: 60 * 1000
        // }
        // let P = new Pokedex(options);
        // console.log(P);
        // let pTeam: teamPokemon;
        // let p = P.getPokemonByName('eevee') // with Promise
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         //console.log('There was an ERROR: ', error);
        //     });
        // return pTeam;
        return this.http.get('https://pokeapi.co/api/v2/pokemon/' + nameOrId).pipe(map(response => response.json() as teamPokemon));
    }


}