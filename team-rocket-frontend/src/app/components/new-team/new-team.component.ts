import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../pokemon';
import { teamPokemon } from '../teams/teamPokemon.interface';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent implements OnInit {
  myTeam: teamPokemon[] = [];
  default: teamPokemon = {
    id: 0,
    name: "none",
    level: 1,
    sprites: {
      front_default: "http://i.imgur.com/EgIXnFE.jpg"
    },
    types: []
  }

  teamname: string = "Team Rocket";
  visibility: string = "Public";
  message: string = "";

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    for (let i = 0; i < 6; i++) {
      this.myTeam.push(this.default);
    }
  }

  createTeam() {
    let id = sessionStorage.getItem("userId")
    if(this.teamname == "") {
      this.message = "Must enter a team name.";
      return;
    }
    this.http.get('http://team-rocket.us-east-2.elasticbeanstalk.com/account/teams?userId=' + id).subscribe((res) => {
      let ts = res.json();
      console.log(ts);
      let dupe = false;
      for (let t of ts) {
        if (t.teamName == this.teamname) {
          dupe = true;
        }
      }
      if (!dupe) {
        let obj = {
          userId: id,
          teamName: this.teamname,
          visibility: this.visibility
        }
        this.http.post('http://team-rocket.us-east-2.elasticbeanstalk.com/account/teams/add', obj).subscribe();
        this.router.navigate(['/profile']);
        window.location.reload();
      } else {
        this.message = "You've already created a team with this name";
        return;
      }

    })

  }


}
