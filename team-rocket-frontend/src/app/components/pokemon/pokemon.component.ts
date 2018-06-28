import { Component, Inject, Input, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon/pokemon.interface';
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

    }

    fetchPokemon(paramMap: ParamMap): void {
        this.pokemonId = paramMap.get('pokemonId');
        this.pokemonService.getPokemon(this.pokemonId).subscribe(pokemon => this.pokemon = pokemon)
    }
}