import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable, of } from "rxjs";
import { Pokemon } from "./pokemon.interface";
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PokemonService {

    constructor(private http: Http) { }

    getPokemon(nameOrId: string): Observable<Pokemon> {
        return this.http.get('https://pokeapi.co/api/v2/pokemon/' + nameOrId).pipe(map(response => response.json() as Pokemon));

    }


}