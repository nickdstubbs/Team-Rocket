import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { TeamsComponent } from '../components/teams/teams.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: "/home",
    pathMatch: 'full'
  }, {
    path: "home",
    component: HomeComponent
  }, {
    path: "profile",
    component: ProfileComponent
  }, {
    path: "teams",
    component: TeamsComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
