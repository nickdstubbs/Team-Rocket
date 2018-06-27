import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PokemonService } from './components/pokemon/pokemon.service';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './components/pokcard/pokcard.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    PokemonComponent,
    PokemonCardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
