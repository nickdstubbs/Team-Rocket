import { Pokemon } from './components/pokemon/pokemon.interface';
import { teamPokemon } from './components/teams/teamPokemon.interface';

export interface Team {
    nickname: string,
    description: string,
    poketeam: {
        p1: teamPokemon,
        p2: teamPokemon,
        p3: teamPokemon,
        p4: teamPokemon,
        p5: teamPokemon,
        p6: teamPokemon
    }
}