import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Pokemon } from '../pokemon/pokemon.interface';
import { Results } from '../results/results.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import * as Pokedex from '../../../../node_modules/pokedex-promise-v2';
@Component({
  selector: 'pok-pokedex',
  templateUrl: './pokedex.component.html'
})
export class PokedexComponent implements OnInit {
  public pokemons: Pokemon[];
  public results: Results;
  public limit: number;
  public regionLimit: number;
  public regionBase: number;
  public offset: number;
  public base: boolean;
  //Name filtering must be done on this side - get /pokemon?limit=802 and filter by name
  //Type filtering must be done on this side
  private regions: any[][];
  private tempRegion: string;
  private types: string[];
  private tempType: string;
  private tempName: string;
  private dex: Pokedex;
  private options = {
    'protocol': 'https'
  };
  private interval = {
    limit: 802,
    offset: 0
  };

  constructor(private http: Http, private pokemonService: PokemonService) {
    this.pokemons = [];
    this.offset = 0;
    this.limit = 20;
    this.regionLimit = 802;
    this.base = true;
    this.tempName = "";
    this.regions = [["All", 0, 802], ["Kanto", 0, 151], ["Johto", 151, 251], ["Hoenn", 251, 386],
    ["Sinnoh", 386, 493], ["Unova", 493, 649], ["Kalos", 649, 721], ["Alola", 721, 802]];
    this.types = ["All", "Normal", "Fire", "Fighting", "Water", "Flying", "Grass", "Poison", "Electric", "Ground", "Psychic", "Rock",
      "Ice", "Bug", "Dragon", "Ghost", "Dark", "Steel", "Fairy"];
  }

  ngOnInit(): void {
    this.dex = new Pokedex(this.options);
    this.dex.getPokemonsList(this.interval, (response) => {
      this.results = response as Results;
      this.getResults();
      console.log(this.results);
    })
  }
  //use promises to get pokemon details?
  public getResults() {
    this.pokemons = [];
    let index = 0;
    this.dex = new Pokedex(this.options);
    console.log("Getting results");
    console.log(this.results);
    for (let i = this.offset; i < ((this.regionLimit < (this.offset + 20)) ? this.regionLimit : (this.offset + 20)); i++) {
      this.dex.getPokemonByName(i, (response) => {
        console.log(response);
        this.pokemons[index] = response as Pokemon;
        index++;
        this.pokemons.sort((p1, p2) => p1.id - p2.id);
      });
    }

  }
  public getNext() {
    this.base = false;
    this.offset += 20;
    this.interval.offset += 20;
    if (this.tempName.length == 0) {
      this.getResults();
    } else {
      this.filterName2();
    }

  }
  public getPrev() {
    this.offset -= 20;
    this.interval.offset -= 20;
    if (this.offset <= this.regionBase) {
      this.offset = this.regionBase;
      this.base = true;
    }
    if (this.offset == 0) this.base = true;
    if (this.tempName.length == 0) {
      this.getResults();
    } else {
      this.filterName2();
    }
  }

  public filterRegion(event: any) {
    this.tempRegion = event.target.value;
    let i: number;
    for (i = 0; i < this.regions.length; i++) {
      if (this.tempRegion == this.regions[i][0]) {
        this.offset = this.regions[i][1];
        this.regionBase = this.regions[i][1];
        this.regionLimit = this.regions[i][2];
      }
    }
    this.getResults();
  }

  //This doesn't work at all, for some reason this.results is undefined in the for loop, but not in the console log
  public filterType(event: any) {
    console.log("Type Filter");
    this.tempType = event.target.value;
    if (this.tempType == "All") {
      this.getResults();
    } else {
      this.dex = new Pokedex(this.options);
      this.dex.getTypeByName(this.tempType, (response) => {
        let index = 0;
        let breaker = false;
        for (let i = 0; i < response.pokemon.length; i++) {
          this.dex.getPokemonByName(response.pokemon[i].pokemon.name, (response) => {
            if (response.id < this.regionLimit) {
              this.pokemons[index] = response as Pokemon;
              if (this.tempType != "All") {
                let type: any;
                type = this.pokemons[index].types;
                if (type[0].type.name == this.tempType.toLowerCase() || type[1] == this.tempType.toLowerCase()) index++;
              }
              this.pokemons.sort((p1, p2) => p1.id - p2.id);
            }
            else breaker = true;
          })
          if (breaker) break;
          if (index > 20) break;
        }
      });
    }

    // this.http.get('https://pokeapi.co/api/v2/pokemon/?limit=802').subscribe(result => {
    //   this.results = result.json() as Results;
    //   let index = 0;
    //   console.log(this.tempType);
    //   for (let j = 0; j < this.regions.length; j++) {
    //     if (this.tempRegion == this.regions[j][0]) {
    //       this.offset = this.regions[j][1];
    //       this.regionBase = this.regions[j][1];
    //       this.regionLimit = this.regions[j][2];
    //     }
    //   }
    //   for (let i = this.regionBase; i < this.regionLimit; i++) {
    //     this.http.get(this.results.results[i].url).subscribe(result => {
    //       this.pokemons[index] = result.json() as Pokemon;
    //       if (this.tempType != "All") {
    //         let type: any;
    //         type = this.pokemons[index].types;
    //         if (type[0].type.name == this.tempType.toLowerCase() || type[1] == this.tempType.toLowerCase()) index++;
    //       }
    //       this.pokemons.sort((p1, p2) => p1.id - p2.id);
    //     }, error => console.error(error));
    //     if (index > 20) break;
    //   }
    // }, error => console.error(error));
  }

  public filterName(event: any) {
    //filter results by name
    console.log("filtering by name");
    this.tempName = event.target.value;
    this.pokemons = [];
    for (let j = 0; j < this.regions.length; j++) {
      if (this.tempRegion == this.regions[j][0]) {
        this.offset = this.regions[j][1];
        this.regionBase = this.regions[j][1];
        this.regionLimit = this.regions[j][2];
      }
    }
    if (this.tempName.length == 0) {    //Blank entry
      this.getResults();
    } else {
      this.http.get('https://pokeapi.co/api/v2/pokemon/?limit=802').subscribe(result => {
        let results2 = result.json() as Results;
        let index = 0;
        for (let i = this.offset; i < this.regionLimit; i++) {
          console.log(i);
          if (results2.results[i].name.indexOf(this.tempName.toLowerCase()) >= 0) {
            this.http.get(results2.results[i].url).subscribe(result => {
              this.pokemons[index] = result.json() as Pokemon;
              index++;
              this.pokemons.sort((p1, p2) => p1.id - p2.id);
            }, error => console.error(error));
          }
          if (index >= 20) break;
        }
      }, error => console.error(error));
    }
  }
  public filterName2() {
    //filter results by name
    this.http.get('https://pokeapi.co/api/v2/pokemon/?limit=802').subscribe(result => {
      this.results = result.json() as Results;
      let index = 0;
      console.log(this.offset);
      for (let i = this.offset; i < this.regionLimit, index < 20; i++) {
        if (this.results.results[i].name.indexOf(this.tempName.toLowerCase()) >= 0) {
          this.http.get(this.results.results[i].url).subscribe(result => {
            this.pokemons[index] = result.json() as Pokemon;
            index++;
            this.pokemons.sort((p1, p2) => p1.id - p2.id);
          }, error => console.error(error));
        }
      }
    }, error => console.error(error));
  }
}

