import { Component, Inject, Input } from '@angular/core';
import { Pokemon } from '../pokemon/pokemon.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'pok-card',
    templateUrl: './pokcard.component.html',
    styleUrls: [
        './pokcard.component.css'
    ]
})
export class PokemonCardComponent {
    
    @Input()
    public pokemon: Pokemon;

    constructor(private router : Router) {
    }

    navigateToPokemonDetails(pokemon: Pokemon): void {
        this.router.navigate(['/pokemon', pokemon.id])
    }
}