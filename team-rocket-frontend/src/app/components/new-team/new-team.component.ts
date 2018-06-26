import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../pokemon';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent implements OnInit {
  myTeam: Pokemon[] = [];
  default: Pokemon = {
    name: "none",
    image: "http://i.imgur.com/EgIXnFE.jpg"
  }
  
  constructor() { }

  ngOnInit() {
    for(let i = 0; i < 6; i++) {
      this.myTeam.push(this.default);
    }
  }

}
