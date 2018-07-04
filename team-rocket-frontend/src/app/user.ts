import { DbTeam } from "./dbTeam";

export interface User {
    id: number,
    name: string,
    email: string,
    teams: DbTeam[]
}