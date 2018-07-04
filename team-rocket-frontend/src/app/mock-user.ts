import { User } from "./user";

export const USER: User = {
    id: 0,
    name: "Youngster Joey",
    email: "YoungJoe@poke.mon",
    teams: [
        {
            nickname: "Bidoof Troop",
            description: "",
            poketeam: {
                p1: 399,
                p2: 399,
                p3: 399,
                p4: 399,
                p5: 399,
                p6: 399
            }
        },
        {
            nickname: "two",
            description: "",
            poketeam: {
                p1: String(Math.floor(Math.random() * 803)),
                p2: String(Math.floor(Math.random() * 803)),
                p3: String(Math.floor(Math.random() * 803)),
                p4: String(Math.floor(Math.random() * 803)),
                p5: String(Math.floor(Math.random() * 803)),
                p6: String(Math.floor(Math.random() * 803))
            }
        },
        {
            nickname: "three",
            description: "",
            poketeam: {
                p1: String(Math.floor(Math.random() * 803)),
                p2: String(Math.floor(Math.random() * 803)),
                p3: String(Math.floor(Math.random() * 803)),
                p4: String(Math.floor(Math.random() * 803)),
                p5: String(Math.floor(Math.random() * 803)),
                p6: String(Math.floor(Math.random() * 803))
            }
        }
    ]
}