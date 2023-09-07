import { rankings } from "./position-rankings.js";

// Destructuring the rankings object
const { combined: combinedPlayerRankings, wr: wrRankings, rb: rbRankings, qb: qbRankings, te: teRankings, def: defRankings } = rankings;

const positionTypes = ['combined', 'wr', 'rb', 'qb', 'te'];
const positionRankingTypes = [combinedPlayerRankings,wrRankings,rbRankings,qbRankings,teRankings];

function buildList(position, players, idx) {
    // Grab element of a specific round
    const roundListEl = document.getElementById(`${position}-round-${idx}`);
    // Reset Lists
    roundListEl.textContent = '';
    // Re-Populate Lists for specified round
    for (let i=0; i < players.length; i++) {
        const element = document.createElement('li');
        element.textContent = players[i].fullname;
        roundListEl.appendChild(element);
    }
}

function displayList(position, rankings){
    for (let i=1; i < 15; i++) {
        const currentRound = rankings[`round${i}`];
        buildList(position, currentRound, i);
    }
}

function displayAvailablePlayers() {
    for (let i=0; i < positionRankingTypes.length; i++) {
        displayList(positionTypes[i], positionRankingTypes[i]);
    }
}

function displayAvailableDefenses() {
    buildList('def', defRankings['round1'], '1');
}

export { displayList, displayAvailablePlayers, displayAvailableDefenses };