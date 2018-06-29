import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { USER } from '../../mock-user'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor() { }

  ngOnInit() {
    this.user = USER;
  }

}
