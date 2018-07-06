import { Pokemon } from './components/pokemon/pokemon.interface';
import { teamPokemon } from './components/teams/teamPokemon.interface';

export interface Team {
    teamName: string,
    description: string,
    pokemon: teamPokemon[],
    teamId: number
}