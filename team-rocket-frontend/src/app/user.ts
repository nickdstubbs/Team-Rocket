import { DbTeam } from "./dbTeam";

export interface User {
    name: string,
    id: number,
    email: string,
    teams: DbTeam[]
}