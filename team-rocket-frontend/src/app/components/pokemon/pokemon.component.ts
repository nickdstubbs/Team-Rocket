import { Component, Inject, Input, OnInit } from '@angular/core';
import { Pokemon } from './pokemon.interface';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PokemonService } from './pokemon.service';

@Component({
    selector: 'pokemon',
    templateUrl: './pokemon.component.html'
})
export class PokemonComponent implements OnInit {

    public pokemonId: any;
    public pokemon: Pokemon;

    constructor(private activeRoute: ActivatedRoute, private pokemonService: PokemonService) {
    }

    ngOnInit(): void {
        this.activeRoute.paramMap.subscribe(paramMap => this.fetchPokemon(paramMap));
        this.pokemon = new Pokemon();
    }

    fetchPokemon(paramMap: ParamMap): void {
        // let Pokedex = require('pokedex-promise-v2');
        // let options = {
        //     protocol: 'https',
        //     timeout: 60 * 1000
        //   }
        // let P = new Pokedex(options);
        this.pokemonId = paramMap.get('pokemonId');

        // P.getPokemonByName(this.pokemonId) // with Promise
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log('There was an ERROR: ', error);
        //     });
        this.pokemonService.getPokemon(this.pokemonId).subscribe(pokemon => this.pokemon = pokemon)
    }
}