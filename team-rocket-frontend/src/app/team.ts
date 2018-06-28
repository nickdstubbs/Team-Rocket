import { Pokemon } from './pokemon';

export interface Team {
    nickname: string,
    description: string,
    poketeam: {
        p1: Pokemon,
        p2: Pokemon,
        p3: Pokemon,
        p4: Pokemon,
        p5: Pokemon,
        p6: Pokemon
    }
}