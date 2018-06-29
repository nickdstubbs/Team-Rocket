import { User } from "./user";

export const USER: User = {
    name: "Youngster Joey",
    teams: [
        {
            nickname: "one",
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
              p1: String(Math.floor(Math.random()*803)),
              p2: String(Math.floor(Math.random()*803)),
              p3: String(Math.floor(Math.random()*803)),
              p4: String(Math.floor(Math.random()*803)),
              p5: String(Math.floor(Math.random()*803)),
              p6: String(Math.floor(Math.random()*803))
            }
          }
    ]
}