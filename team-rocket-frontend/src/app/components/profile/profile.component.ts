import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { USER } from '../../mock-user'
import { Team } from '../../team';
import { DbTeam } from '../../dbTeam';
import { PokeTeamService } from '../teams/pokeTeam.service';
import { TeamsPageService } from '../teams/teams-page.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  max: number;
  previewTeams: DbTeam[];
  preview: Team[];

  constructor(private serve: TeamsPageService, private http: Http) { }

  ngOnInit() {
    // this.http.get('http://team-rocket.us-east-2.elasticbeanstalk.com/account/teams').subscribe((res) => {
    //   console.log(res);
    //   this.previewTeams = res.json();
    // });
    this.user = USER;

    this.preview = this.serve.getVar();
    this.serve.getTeams(this.user.teams);

    if (this.preview.length > 2) {
      this.max = 2;
    } else {
      this.max = this.preview.length;
    }

  }

  hasNext(num) {
    if (num < this.max + 1) {
      return true;
    } else {
      return false;
    }
  }




}
