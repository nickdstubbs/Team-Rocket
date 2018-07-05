import { Component, OnInit } from '@angular/core';
import { Team } from '../../team';
import { DbTeam } from '../../dbTeam';
import { Pokemon } from '../pokemon/pokemon.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { Http } from '@angular/http';
import { PokeTeamService } from './pokeTeam.service';
import { teamPokemon } from './teamPokemon.interface';
import { USER } from '../../mock-user'
import { TeamsPageService } from './teams-page.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];

  dbTeams: DbTeam[] = USER.teams;
  constructor(private serve: TeamsPageService) {
  }
  ngOnInit() {
    this.teams = this.serve.getVar();
    this.serve.getTeams(this.dbTeams);
  }

}
