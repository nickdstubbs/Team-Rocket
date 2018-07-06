import { Team } from "./Team";

export interface User {
    id: number,
    name: string,
    email: string,
    teams: Team[]
}