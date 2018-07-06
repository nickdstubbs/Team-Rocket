import { teamPokemon } from './components/teams/teamPokemon.interface';


export interface DbTeam {
    nickname: string,
    description: string,
    poketeam: teamPokemon[],
    id: number
}