import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Pokemon } from '../pokemon/pokemon.interface';
import { Results } from '../results/results.interface';
import { PokemonService } from '../pokemon/pokemon.service';
@Component({
  selector: 'pok-pokedex',
  templateUrl: './pokedex.component.html'
})
export class PokedexComponent implements OnInit {
  public pokemons: Pokemon[];
  public results: Results;
  public limit = 20;
  public offset = 0;
  public base: boolean;
  constructor(private http: Http, private pokemonService: PokemonService) {
    this.pokemons = [];
    this.offset = 0;
    this.limit = 20;
    this.base=true;
  }

  ngOnInit(): void {
    this.init();
  }


  public init() {
    this.http.get('https://pokeapi.co/api/v2/pokemon/').subscribe(result => {
      this.results = result.json() as Results;
      let index = 0;
      for (let result of this.results.results) {
        this.http.get(result.url).subscribe(result => {
          this.pokemons[index] = result.json() as Pokemon;
          index++;
          this.pokemons.sort((p1,p2)=>p1.id - p2.id)
        }, error => console.error(error));
      }
    }, error => console.error(error));
    //this.offset+=20;
    
  }
  public getNext(){
    this.base=false;
    this.offset+=20;
    this.http.get('https://pokeapi.co/api/v2/pokemon/?limit='+this.limit+"&offset="+this.offset).subscribe(result => {
      this.results = result.json() as Results;
      let index = 0;
      this.pokemons = [];
      for (let result of this.results.results) {
        this.http.get(result.url).subscribe(result => {
          this.pokemons[index] = result.json() as Pokemon;
          index++;
          this.pokemons.sort((p1,p2)=>p1.id - p2.id)
        }, error => console.error(error));

      }
    }, error => console.error(error));

  }
  public getPrev(){
    this.offset-=20;
    if(this.offset==0) this.base=true;
    this.pokemons = [];
    this.http.get('https://pokeapi.co/api/v2/pokemon/?limit='+this.limit+"&offset="+this.offset).subscribe(result => {
      this.results = result.json() as Results;
      let index = 0;
      for (let result of this.results.results) {
        this.http.get(result.url).subscribe(result => {
          this.pokemons[index] = result.json() as Pokemon;
          index++;
          this.pokemons.sort((p1,p2)=>p1.id - p2.id)
        }, error => console.error(error));

      }
    }, error => console.error(error));
    
    
  }
}

