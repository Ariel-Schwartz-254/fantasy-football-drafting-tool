const combinedPlayerRankings = {};
const wrRankings = {};
const rbRankings = {};
const qbRankings = {};
const teRankings = {};
const defRankings = {};

const rankings = {
    combined: combinedPlayerRankings,
    wr: wrRankings,
    rb: rbRankings,
    qb: qbRankings,
    te: teRankings,
    def: defRankings
}

const positionRankingTypes = [combinedPlayerRankings,wrRankings,rbRankings,qbRankings,teRankings];

export { rankings, positionRankingTypes };
