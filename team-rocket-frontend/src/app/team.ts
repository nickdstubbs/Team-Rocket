import { Pokemon } from './components/pokemon/pokemon.interface';
import { teamPokemon } from './components/teams/teamPokemon.interface';

export interface Team {
    nickname: string,
    description: string,
    poketeam: teamPokemon[]
}