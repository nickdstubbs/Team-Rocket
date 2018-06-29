import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { USER } from '../../mock-user'
import { Team } from '../../team';
import { DbTeam } from '../../dbTeam';
import { PokeTeamService } from '../teams/pokeTeam.service';
import { TeamsPageService } from '../teams/teams-page.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  previewTeams: DbTeam[];
  preview: Team[];
  temp: Team[];

  constructor(private serve: TeamsPageService) { }

  ngOnInit() {
    this.user = USER;

    this.preview = this.serve.teams;
    if (this.serve.teams.length < 1) {
      this.serve.getTeams(this.user.teams);
    }

    // if(this.temp.length > 2) {
    //   for(let i = 0; i < 2; i++) {
    //     this.preview.push(this.temp[i]);
    //   }
    // } else {
    //   this.preview = this.temp;
    // }

  }




}
