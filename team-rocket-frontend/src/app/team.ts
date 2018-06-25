import {pokemon} from './pokemon';

export interface Team {
    nickname: string,
    description: string,
    poketeam: {
        p1: pokemon,
        p2: pokemon,
        p3: pokemon,
        p4: pokemon,
        p5: pokemon,
        p6: pokemon
    }
}