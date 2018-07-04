import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { ExploreService } from './explore.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  users: User[] = [];

  constructor(private exploreService: ExploreService) { }

  ngOnInit() {
    this.getUsers();
    //console.log(this.users);
  }

  getUsers() {
    //console.log("getting users");
    this.exploreService.getUsers().subscribe((res) => {
      this.users=res
      console.log(res);
    });
  }

}
