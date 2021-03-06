import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { TeamsComponent } from '../components/teams/teams.component';
import { NewTeamComponent } from '../components/new-team/new-team.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { LogInComponent } from '../components/log-in/log-in.component';
import { ExploreComponent } from '../components/explore/explore.component';
import { PokedexComponent } from '../components/pokedex/pokedex.component';
import { PokemonComponent } from '../components/pokemon/pokemon.component';
import { TrainerComponent } from '../components/trainer/trainer.component';
import { TeamComponent } from '../components/team/team.component';
import { ErrorComponent } from '../components/error/error.component';
import { EditTeamComponent } from '../components/edit-team/edit-team.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: "/home",
    pathMatch: 'full'
  }, {
    path: "home",
    component: HomeComponent
  }, {
    path: "pokedex",
    component: PokedexComponent
  }, {
    path: "profile",
    component: ProfileComponent
  }, {
    path: "teams",
    component: TeamsComponent
  }, {
    path: "new-team",
    component: NewTeamComponent
  }, {
    path: "sign-up",
    component: SignUpComponent
  }, {
    path: "log-in",
    component: LogInComponent
  }, {
    path: "explore",
    component: ExploreComponent
  }, {
    path: 'pokemon/:pokemonId',
    component: PokemonComponent
  }, {
    path: "pokedex",
    component: PokedexComponent
  }, {
    path: 'trainer/:trainerId',
    component: TrainerComponent
  }, {
    path: 'team/:teamId',
    component: TeamComponent
  },{
    path: 'edit',
    component: EditTeamComponent
  },
   {
    path: 'error',
    component: ErrorComponent
  }, {
    path: '**',
    redirectTo: 'home'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
