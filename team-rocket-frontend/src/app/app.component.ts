import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showDropdown = false;
  show() {
    this.showDropdown = true;
  }
  hide() {
    this.showDropdown = false;
  }

  title = 'Team Rocket';
}
