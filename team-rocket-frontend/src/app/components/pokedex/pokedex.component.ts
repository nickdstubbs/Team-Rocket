import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Http } from '@angular/http';
import { Pokemon } from '../pokemon/pokemon.interface';
import { Results } from '../results/results.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import * as Pokedex from '../../../../node_modules/pokedex-promise-v2';
import { User } from '../../user';
import { Team } from '../../team';
@Component({
  selector: 'pok-pokedex',
  templateUrl: './pokedex.component.html'
})
export class PokedexComponent implements OnInit {
  public pokemons: Pokemon[];
  public curUser: User;
  public id: any;
  public hasTeams: boolean;
  public curTeam: Team;
  public teamFull: boolean;
  public addedPokmeon: Pokemon;
  public results: Results;
  public limit: number;
  public regionLimit: number;
  public regionBase: number;
  public offset: number;
  public base: boolean;
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

  constructor(private http: Http) {
    this.pokemons = [];
    this.offset = 0;
    this.limit = 20;
    this.regionLimit = 802;
    this.base = true;
    this.tempName = "";
    this.tempRegion = "All";
    this.tempType = "All";
    this.hasTeams = true;
    this.curTeam = {
      teamName: "",
      description: "",
      pokemon: [],
      teamId: 0
    }
    this.curUser = {
      id: Number(sessionStorage.getItem("userId")),
      name: sessionStorage.getItem("username"),
      email: sessionStorage.getItem("userEmail"),
      teams: []
    }
    this.regions = [["All", 0, 802], ["Kanto", 0, 151], ["Johto", 151, 251], ["Hoenn", 251, 386],
    ["Sinnoh", 386, 493], ["Unova", 493, 649], ["Kalos", 649, 721], ["Alola", 721, 802]];
    this.types = ["All", "Normal", "Fire", "Fighting", "Water", "Flying", "Grass", "Poison", "Electric", "Ground", "Psychic", "Rock",
      "Ice", "Bug", "Dragon", "Ghost", "Dark", "Steel", "Fairy"];
  }

  ngOnInit(): void {
    this.getUser();
    this.dex = new Pokedex(this.options);
    this.dex.getPokemonsList(this.interval, (response) => {
      this.results = response as Results;
      this.getResults();
    })
  }

  getUser() {

    this.http.get('http://team-rocket.us-east-2.elasticbeanstalk.com/accounts/teams').subscribe((res) => {
      let ts = res.json();
      for (let t of ts) {
        if (t.userId == this.curUser.id && t.pokemon.length < 6) {
          console.log("found team")
          this.curUser.teams.push(t);
        }
      }
      console.log(this.curUser);
      if (this.curUser.teams.length < 1) {
        this.hasTeams = false;
        this.curTeam = this.curUser.teams[0];
      }
    });

  }
  public getResults() {
    this.pokemons = [];
    this.dex = new Pokedex(this.options);
    console.log("Getting results");
    for (let i = this.offset + 1; i < ((this.regionLimit < (this.offset + 21)) ? this.regionLimit : (this.offset + 21)); i++) {
      this.dex.getPokemonByName(i, (response) => {
        this.pokemons.push(response as Pokemon);
        this.pokemons.sort((p1, p2) => p1.id - p2.id);
      });
    }

  }
  public getNext() {
    this.base = false;
    this.offset += 20;
    this.interval.offset += 20;
    if (this.tempName.length == 0 && this.tempType == "All") {
      this.getResults();
    } else if (this.tempType == "All") {
      this.filterName2();
    } else {
      this.filterType2();
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
    if (this.tempName.length == 0 && this.tempType == "All") {
      this.getResults();
    } else if (this.tempType == "All") {
      this.filterName2();
    } else {
      this.filterType2();
    }
  }

  public filterRegion(event: any) {
    this.tempRegion = event.target.value;
    let i: number;
    for (i = 0; i < this.regions.length; i++) {
      if (this.tempRegion == this.regions[i][0]) {
        this.offset = this.regions[i][1];
        this.interval.offset = this.regions[i][1];
        this.regionBase = this.regions[i][1];
        this.regionLimit = this.regions[i][2];
        this.interval.limit = this.regions[i][2] - this.regions[i][1];
      }
    }
    if (this.tempName.length == 0 && this.tempType == "All") {
      this.getResults();
    } else if (this.tempType == "All") {
      this.filterName2();
    } else {
      this.filterType2();
    }
  }

  public filterType(event: any) {
    console.log("Type Filter");
    this.tempType = event.target.value;
    if (this.tempType == "All") {
      this.getResults();
    } else {
      this.pokemons = [];
      this.dex = new Pokedex(this.options);
      this.dex.getTypeByName(this.tempType.toLowerCase(), (response) => {
        for (let i = this.offset; i < 20; i++) {
          this.dex.getPokemonByName(response.pokemon[i].pokemon.name, (response) => {
            this.pokemons.push(response as Pokemon);
            this.pokemons.sort((p1, p2) => p1.id - p2.id);
          });
        }
      });
    }
  }

  public filterType2() {
    this.pokemons = [];
    this.dex = new Pokedex(this.options);
    this.dex.getTypeByName(this.tempType.toLowerCase(), (response) => {
      for (let i = this.offset; i < this.offset + 20; i++) {
        this.dex.getPokemonByName(response.pokemon[i].pokemon.name, (response) => {
          this.pokemons.push(response as Pokemon);
          this.pokemons.sort((p1, p2) => p1.id - p2.id);
        });
      }
    });
  }

  public filterName(event: any) {
    //filter results by name
    this.tempName = event.target.value;
    this.pokemons = [];
    for (let j = 0; j < this.regions.length; j++) {
      if (this.tempRegion == this.regions[j][0]) {
        this.offset = this.regions[j][1];
        this.interval.offset = this.regions[j][1];
        this.regionBase = this.regions[j][1];
        this.regionLimit = this.regions[j][2];
        this.interval.limit = this.regions[j][2] - this.regions[j][1];
      }
    }
    if (this.tempName.length == 0) {    //Blank entry
      this.getResults();
    } else {
      this.dex = new Pokedex(this.options);
      this.dex.getPokemonsList(this.interval, (response) => {
        let results2 = response as Results;
        console.log(results2);
        for (let i = 1; i < (this.regionLimit - this.offset); i++) {
          if (results2.results[i].name.indexOf(this.tempName.toLowerCase()) >= 0) {
            console.log(results2.results[i].name);
            this.dex.getPokemonByName(i + this.regionBase, (response) => {
              this.pokemons.push(response as Pokemon);
              this.pokemons.sort((p1, p2) => p1.id - p2.id);
            });
          }
        }
      });
    }
  }
  public filterName2() {
    //filter results by name
    this.dex = new Pokedex(this.options);
    this.dex.getPokemonsList(this.interval, (response) => {
      let results2 = response as Results;
      for (let i = 1; i < (this.regionLimit - this.offset); i++) {
        if (results2.results[i].name.indexOf(this.tempName.toLowerCase()) >= 0) {
          console.log(results2.results[i].name);
          this.dex.getPokemonByName(i + this.regionBase, (response) => {
            this.pokemons.push(response as Pokemon);
            this.pokemons.sort((p1, p2) => p1.id - p2.id);
          });
        }
      }
    });
  }

  public setTeam(event: any) {
    console.log(this.curTeam);
    for (let t of this.curUser.teams) {
      if (t.teamName == event.target.value) {
        this.curTeam = t;
      }
    }
    console.log(this.curTeam);
    if (this.curTeam.pokemon.length >= 6) this.teamFull = true;
    else this.teamFull = false;
  }

  public setLevel(event: any, pkmn: Pokemon) {
    console.log(pkmn);
    this.addedPokmeon = pkmn;
    this.addedPokmeon.level = event.target.value;
  }

  public addPokemon(pokemon: Pokemon) {
    if (this.curTeam.pokemon.length < 6) {
      for (let team of this.curUser.teams) {
        if (team.teamName == this.curTeam.teamName) {
          team.pokemon.push(this.addedPokmeon);
        }
      }
    }
    //make call to backend to update the team
    let obj = {
      userId: this.curUser.id,
      pokedexId: this.addedPokmeon.id,
      name: this.addedPokmeon.name,
      level: this.addedPokmeon.level,
      teamId: this.curTeam.teamId,
      position: this.curTeam.pokemon.length
    };
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    const requestOptions = {
      headers: new Headers(headerDict),
    };
    console.log(obj);
    this.http.post("http://team-rocket.us-east-2.elasticbeanstalk.com/account/team/pokemon/add", obj).subscribe();
  }
}