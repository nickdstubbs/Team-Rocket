import { Component, OnInit } from '@angular/core';
import { Team } from '../../team';
import { Http } from '@angular/http';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  team: Team;
  constructor(private http: Http) { }

  ngOnInit() {
    //this.http.get()

  }

}
