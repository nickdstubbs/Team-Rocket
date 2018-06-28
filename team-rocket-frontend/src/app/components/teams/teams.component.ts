import { Component, OnInit } from '@angular/core';
import { Team } from '../../team';
import { Pokemon } from '../../pokemon';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];
  constructor() {
    
  }

  ngOnInit() {
    let p: Pokemon = {
      name: "Rattata",
      image: "https://cdn.bulbagarden.net/upload/thumb/4/46/019Rattata.png/250px-019Rattata.png",
      level: 100
    }

    let t: Team = {
      nickname: "The Best",
      description: "All of my top percentage Rattata",
      poketeam: {
        p1: p,
        p2: p,
        p3: p,
        p4: p,
        p5: p,
        p6: p
      }
    }

    for(let i = 0; i < 7; i++) {
      this.teams.push(t);
    }
  }

}
