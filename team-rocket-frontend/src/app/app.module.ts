import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from  './routing/routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TeamsComponent } from './components/teams/teams.component';
import { NewTeamComponent } from './components/new-team/new-team.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { ExploreComponent } from './components/explore/explore.component';
import { PokemonService } from './components/pokemon/pokemon.service';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PokemonCardComponent } from './components/pokcard/pokcard.component';
import { HttpModule } from '@angular/http';
import { PokeTeamService } from './components/teams/pokeTeam.service';
import { TeamComponent } from './team/team.component';
import { TeamsPageService } from './components/teams/teams-page.service';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { ExploreService } from './components/explore/explore.service';
import { TrainerComponent } from './components/trainer/trainer.component';
import { CapFirstPipe } from './cap-first.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    TeamsComponent,
    NewTeamComponent,
    SignUpComponent,
    LogInComponent,
    ExploreComponent,
    PokedexComponent,
    PokemonComponent,
    PokemonCardComponent,
    TeamComponent,
    EditTeamComponent,
    TrainerComponent,
    CapFirstPipe,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule
  ],
  providers: [
    PokemonService, 
    PokeTeamService, 
    TeamsPageService,
    ExploreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
