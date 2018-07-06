import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { teamPokemon } from "./teamPokemon.interface";

@Injectable()
export class PokeTeamService {

    constructor(private http: Http) { }

    getPokemon(nameOrId: string): Observable<teamPokemon> { 
        return this.http.get('https://pokeapi.co/api/v2/pokemon/' + nameOrId).pipe(map(response => response.json() as teamPokemon));
    }


}