import { DbTeam } from "./dbTeam";

export interface User {
    name: string
    teams: DbTeam[]
}