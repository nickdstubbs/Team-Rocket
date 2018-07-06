import { Component, OnInit } from '@angular/core';
import { Team } from '../../team';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {

  private teamId: any;
  private team: Team;
  private userId: any;
  private visibility: string;
  constructor(private activeRoute: ActivatedRoute, private http: Http) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem("userId");
    this.activeRoute.paramMap.subscribe(paramMap => this.getTeam(paramMap));
  }

  public getTeam(paramMap: ParamMap) {
    this.teamId = paramMap.get('id');
    this.http.get("team-rocket.us-east-2.elasticbeanstalk.com/team?teamId=" + this.teamId).subscribe(team => this.team = team.json() as Team);
  }

  public remove(pos: number) {
    let obj = {
      teamId: this.teamId,
      userId: this.userId,
      position: pos
    };
    // const headerDict = {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    // }

    // const requestOptions = {
    //   headers: new Headers(headerDict),
    // };
    this.http.delete("team-rocket.us-east-2.elasticbeanstalk.com/account/team/pokemon/delete", JSON.stringify(obj));
  }

  public setName(event: any) {
    this.team.teamName = event.target.value;
  }

  public setVis(event: any) {
    this.visibility = event.target.value;
  }

  public changeDetails() {
    // const headerDict = {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    // }

    // const requestOptions = {
    //   headers: new Headers(headerDict),
    // };

    let obj = {
      userId: this.userId,
      teamId: this.teamId,
      teamName: this.team.teamName,
      visibility: this.visibility
    }
    this.http.put("team-rocket.us-east-2.elasticbeanstalk.com/account/team/change-info", obj).subscribe();

  }

}
