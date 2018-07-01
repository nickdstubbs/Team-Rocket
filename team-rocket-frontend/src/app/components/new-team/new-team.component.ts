import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../pokemon';
import { teamPokemon } from '../teams/teamPokemon.interface';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent implements OnInit {
  myTeam: teamPokemon[] = [];
  default: teamPokemon = {
    id:0,
    name: "none",
    level: 1,
    sprites: {
      front_default: "http://i.imgur.com/EgIXnFE.jpg"
    },
    types: []
   
  }
  
  constructor() { }

  ngOnInit() {
    for(let i = 0; i < 6; i++) {
      this.myTeam.push(this.default);
    }
  }

}
