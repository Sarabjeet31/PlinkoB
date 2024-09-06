
import express from "express";
import { outcomes } from "./outcomes";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());

const TOTAL_DROPS = 16;

const MULTIPLIERSLOW: {[ key: number ]: number} = {
    1: 8,
    2: 5,
    3: 2,
    4: 1.4,
    5: 1.4,
    6: 1.2,
    7: 1.1,
    8: 1,
    9: 0.5,
    10: 1,
    11: 1.1,
    12: 1.2,
    13: 1.4,
    14: 1.4,
    15: 2,
    16: 5,
    17: 8
}

const MULTIPLIERSMEDIUM: {[ key: number ]: number} = {
    1: 100,
    2: 50,
    3: 10,
    4: 1.4,
    5: 1.4,
    6: 1.2,
    7: 0.7,
    8: 0.7,
    9: 0.5,
    10: 0.5,
    11: 0.7,
    12: 0.7,
    13: 1.4,
    14: 1.4,
    15: 10,
    16: 50,
    17: 100
    
}
const MULTIPLIERSHIGH: {[ key: number ]: number} = {
    1: 999,
    2: 100,
    3: 20,
    4: 5,
    5: 1,
    6: 0.7,
    7: 0.5,
    8: 0.1,
    9: 0,
    10: 0.1,
    11: 0.5,
    12: 0.7,
    13: 1,
    14: 5,
    15: 20,
    16: 100,
    17: 999
}

app.post("/game", (req, res) => {
    let outcome = 0;
    const pattern = []
    for (let i = 0; i < TOTAL_DROPS; i++) {
        if (Math.random() > 0.5) {
            pattern.push("R")
            outcome++;
        } else {
            pattern.push("L")
        }
    }
    const { risk } = req.body
    let multiplier
    if (risk === 'low') {
        multiplier = MULTIPLIERSLOW[outcome]
    } else if (risk === 'medium') {
        multiplier = MULTIPLIERSMEDIUM[outcome]
    } else {
        multiplier = MULTIPLIERSHIGH[outcome]
    }
    // const multiplier = MULTIPLIERS[outcome];
    const possiblieOutcomes = outcomes[outcome];

    res.send({
        point: possiblieOutcomes[Math.floor(Math.random() * possiblieOutcomes.length || 0)],
        multiplier,
        pattern
    });
});

app.get('/', (req, res) => {
    res.send('ok')
})

app.listen(3000, () => {
  console.log('Server listening on port 3000');
})