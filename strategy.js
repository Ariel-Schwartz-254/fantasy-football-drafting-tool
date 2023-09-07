const suggestedPositionEl = document.getElementById("suggestedPosition");
const suggestedPlayerEl = document.getElementById("suggestedPlayer");

import { draftPickNumber } from "./update-rankings.js";
import { rankings } from "./position-rankings.js";

// Destructuring the rankings object
const { combined: combinedPlayerRankings, wr: wrRankings, rb: rbRankings, qb: qbRankings, te: teRankings, def: defRankings } = rankings;

let lateQbTaken = false;
let lateTeTaken = false;

// Recommended team structure for 3 WR league formats
const myTeam = {
    QB: {
        players: [],
        target: 2,
        min: 1,
        count: 0
    },
    WR: {
        players: [],
        target: 6,
        min: 3,
        count: 0
    },
    RB: {
        players: [],
        target: 4,
        min: 2,
        count: 0
    },
    TE: {
        players: [],
        target: 2,
        min: 1,
        count: 0
    },
    DEF: {
        players: [],
        target:1,
        count: 0
    }
};

const teamPositionTypes = ["WR", "RB", "QB", "TE", "DEF"];

// Round 1 : Take the best avaliable player at either round 1, or round 2
    // Add player to my roster
function findBestPickRoundOne() {
    let bestPick = "";
    if (combinedPlayerRankings.round1.length > 0) {
        bestPick = combinedPlayerRankings.round1[0];
    } else {
        bestPick = combinedPlayerRankings.round2[0];
    }
    // firstRoundPickPosition = bestPick.position;
    return bestPick;
}

function myFirstRoundPick() {
    for (let i=0; i < teamPositionTypes.length; i++) {
        if (myTeam[teamPositionTypes[i]].players.length > 0) {
            return teamPositionTypes[i];
        }
    }
    console.log("Position not found");
}

// Round 2: 
    // IF there are still any round 1 players left, take one, 
    // IF there is a QB, take him
    // ELSE check IF there is a round 2 player available from the other position WR or RB depending on what you already have
        // IF yes, take best available of other player
        // ELSE take best available from combined
function findBestPickRoundTwo() {
    let bestPick = "";
    if (combinedPlayerRankings.round1.length > 0) {
        bestPick = combinedPlayerRankings.round1[0];
    } else if (qbRankings.round2.length > 0) {
        bestPick = qbRankings.round2[0];
    } else if ( myFirstRoundPick() === "wr") {
        bestPick = rbRankings.round2[0];
    } else {
        bestPick = wrRankings.round2[0];
    }
    return bestPick;
}
// Returns a string of the highest round with players from provided ranking. String format: `round1`
function findHighestRoundWithPlayers(rankings) {
    for (let i=1; i < 15; i++) {
        if (rankings[`round${i}`].length > 0) {
            return `round${i}`;
        }
    }
    console.log("Round Not Found");
}
// Returns best available player from provided ranking position and round
function selectBestAvailable(rankings, round) {
    return rankings[round][0];
}

function selectBestAvailablePrioritizeTe(targetRound) {
    let bestPick = "";
    const teAvailable = teRankings[targetRound].length > 0;
    const wrAvailable = wrRankings[targetRound].length > 0;
    const rbAvailable = rbRankings[targetRound].length > 0;
    const myTeamHasTe = myTeam.TE.count > 0;
    const myTeamRbCount = myTeam.RB.count;
    const myTeamWrCount = myTeam.WR.count;
    if (!myTeamHasTe && teAvailable) {
        bestPick = selectBestAvailable(teRankings, targetRound);
    } else if (myTeamRbCount > myTeamWrCount && wrAvailable) {
        bestPick = selectBestAvailable(wrRankings, targetRound);
    } else if (myTeamWrCount > myTeamRbCount && rbAvailable) {
        bestPick = selectBestAvailable(rbRankings, targetRound);
    } else {
        bestPick = selectBestAvailable(combinedPlayerRankings, targetRound);
    }
    return bestPick;
}

// Round 3 - 4: 
    // Find the highest round that still has players.
    // IF my team still doesn't have a QB, IF there is a QB, take best available, 
    // ELSE IF there is a TE, take best available
    // ELSE take the best available player of the position you have less of WR or RB
function findBestPickRoundThreeFour() {
    let bestPick = "";
    const targetRound = findHighestRoundWithPlayers(combinedPlayerRankings);
    const myTeamHasQb = myTeam.QB.count > 0;
    const qbAvailable = qbRankings[targetRound].length > 0;
    if (!myTeamHasQb && qbAvailable) {
        bestPick = selectBestAvailable(qbRankings, targetRound);
    } else {
        bestPick = selectBestAvailablePrioritizeTe(targetRound);
    }
    return bestPick;
}

function findHighestRoundByPosition(position) {
    for (let i=1; i < 15; i++) {
        if (position[`round${i}`].length > 0) {
            return i;
        }
    }
    return "Position not found";
}

function positionAvailableAbove(round, position) {
    const targetRound = findHighestRoundByPosition(position);
    return targetRound <= round;
}

// Round 5 - 6:
    // If my team still doesn't have a QB and there is one in round 5 or earlier take best available
    // ELSE find the highest round that still has players
        // IF there is only one player, take them
        // IF my team still doesn't have a TE and there is one available in that round, take him.
        // ELSE check if there are 2 types of players in that round
            // IF yes, take the position you have less of: WR or RB (If there is a tie, take best available combined)
            // ELSE, take best available combined
function findBestPickRoundFiveSix(currentRound) {
    let bestPick = "";
    // let targetRound = findHighestRoundByPosition(qbRankings);
    const myTeamHasQb = myTeam.QB.count > 0;
    if (!myTeamHasQb && positionAvailableAbove(currentRound, qbRankings)){
        const targetRound = findHighestRoundWithPlayers(qbRankings);
        bestPick = selectBestAvailable(qbRankings, targetRound);
    } else {
        const targetRound = findHighestRoundWithPlayers(combinedPlayerRankings);
        bestPick = selectBestAvailablePrioritizeTe(targetRound);
    }
    return bestPick;
}

// Round 7:
    // If my team still doesnt have a QB, flag the lateQB variable and take another QB soon
        // If there is a QB available in round 7 or earlier take best available
    // IF my team still doesn't have a TE
        // IF there is a TE available in round 7 or higher take best available
    // ELSE check if there are players available in higher rounds
        // IF yes, check if best avaliable WR or RB and if we hit our minimum/target on that position
            // IF a position is under the minimum, take best available of that position
            // ELSE IF target is hit on either WR or RB, take best available of other position
            // ELSE, take best available player of either position
function findBestPickRoundSeven(currentRound) {
    let bestPick = "";
    let targetRound;
    const myTeamHasQb = myTeam.QB.count > 0;
    const myTeamHasTe = myTeam.TE.count > 0;
    const wrUnderMinimum = myTeam.WR.count < myTeam.WR.min;
    if (!myTeamHasQb) { 
        lateQbTaken = true;
        if (positionAvailableAbove(currentRound, qbRankings)) {
            targetRound = findHighestRoundWithPlayers(qbRankings);
            bestPick = selectBestAvailable(qbRankings, targetRound);
            return bestPick;
        } else if(!myTeamHasTe) {
            targetRound = findHighestRoundWithPlayers(teRankings);
            if (!myTeamHasTe && positionAvailableAbove(currentRound, teRankings)) {
                bestPick = selectBestAvailable(teRankings, targetRound);
                return bestPick;
            } else {
                if (wrUnderMinimum) {
                    targetRound = findHighestRoundWithPlayers(wrRankings);
                    bestPick = selectBestAvailable(wrRankings, targetRound);
                } else {
                    const targetRound = findHighestRoundWithPlayers(rbRankings);
                    bestPick = selectBestAvailable(rbRankings, targetRound);
                }
            }
        } else if (wrUnderMinimum) {
                targetRound = findHighestRoundWithPlayers(wrRankings);
                bestPick = selectBestAvailable(wrRankings, targetRound);
        } else {
            const targetRound = findHighestRoundWithPlayers(rbRankings);
            bestPick = selectBestAvailable(rbRankings, targetRound);
        }
    } else if(!myTeamHasTe) {
        targetRound = findHighestRoundWithPlayers(teRankings);
        if (!myTeamHasTe && positionAvailableAbove(currentRound, teRankings)) {
            bestPick = selectBestAvailable(teRankings, targetRound);
            return bestPick;
        } else {
            if (wrUnderMinimum) {
                targetRound = findHighestRoundWithPlayers(wrRankings);
                bestPick = selectBestAvailable(wrRankings, targetRound);
            } else {
                const targetRound = findHighestRoundWithPlayers(rbRankings);
                bestPick = selectBestAvailable(rbRankings, targetRound);
            }
        }
    } else if (wrUnderMinimum) {
            targetRound = findHighestRoundWithPlayers(wrRankings);
            bestPick = selectBestAvailable(wrRankings, targetRound);
    } else {
        const targetRound = findHighestRoundWithPlayers(rbRankings);
        bestPick = selectBestAvailable(rbRankings, targetRound);
    }
    return bestPick;
}

// Round 8:
    // If my team still doesnt have a QB,
        // If there is a QB available in round 8 or earlier take best available
    // IF my team still doesn't have a TE, flag the late TE variable
        // IF there is a TE available in round 8 or higher take best available 
    // Check if WR and RB have hit the minimum amount
        // Take best available of position that has not hit minimum amount
        // ELSE take best available combined
function findBestPickRoundEight(currentRound) {
    let bestPick = "";
    const myTeamHasQb = myTeam.QB.count > 0;
    if (!myTeamHasQb) { 
        if (positionAvailableAbove(currentRound, qbRankings)) {
            let targetRound = findHighestRoundWithPlayers(qbRankings);
            bestPick = selectBestAvailable(qbRankings, targetRound);
        }
    } else {
        const myTeamHasTe = myTeam.TE.count > 0;
        let targetRound = findHighestRoundWithPlayers(teRankings);
        if (!myTeamHasTe) {
            lateTeTaken = true;
            if (positionAvailableAbove(currentRound, teRankings)) {
                bestPick = selectBestAvailable(teRankings, targetRound);
            } 
        } else {
            const wrUnderMinimum = myTeam.WR.count < myTeam.WR.min;
            if (wrUnderMinimum) {
                targetRound = findHighestRoundWithPlayers(wrRankings);
                bestPick = selectBestAvailable(wrRankings, targetRound);
            } else {
                const targetRound = findHighestRoundWithPlayers(combinedPlayerRankings);
                bestPick = selectBestAvailable(combinedPlayerRankings, targetRound);
            }
        }
    }
    return bestPick;
}

// Round 9 - 10:
    // If my team still doesnt have a QB,
        // If there is a QB available in round 9 or earlier take best available
    // IF my team still doesn't have a TE
        // IF there is a TE available in round 9 or higher take best available 
    // IF late QB variable is flagged AND all position minimums have been reached
        // If there is a QB available in round 9 or earlier take best available, unflag variable
    // IF late TE variable is flagged AND all position minimums have been reached
        // If there is a TE available in round 9 or earlier take best available, unflag variable
    // Check if WR and RB have hit the target amount
        // IF no, Take best available of position that has not hit target amount
        // ELSE take next available player from combined
function findBestPickRoundNineTen(currentRound) {
    let bestPick = "";
    const myTeamHasQb = myTeam.QB.count > 0;
    if (!myTeamHasQb) { 
        if (positionAvailableAbove(currentRound, qbRankings)) {
            let targetRound = findHighestRoundWithPlayers(qbRankings);
            bestPick = selectBestAvailable(qbRankings, targetRound);
        }
    } else {
        const myTeamHasTe = myTeam.TE.count > 0;
        let targetRound = findHighestRoundWithPlayers(teRankings);
        if (!myTeamHasTe) {
            if (positionAvailableAbove(currentRound, teRankings)) {
                bestPick = selectBestAvailable(teRankings, targetRound);
            } 
        } else {
            const wrMinReached = myTeam.WR.count >= myTeam.WR.min;
            const rbMinReached = myTeam.RB.count >= myTeam.RB.min;
            if (lateQbTaken && wrMinReached && rbMinReached) {
                if (positionAvailableAbove(currentRound, qbRankings)) {
                    targetRound = findHighestRoundWithPlayers(qbRankings);
                    bestPick = selectBestAvailable(qbRankings, targetRound);
                    lateQbTaken = false;
                }
            } else if (lateTeTaken && wrMinReached && rbMinReached) {
                if (positionAvailableAbove(currentRound, teRankings)) {
                    bestPick = selectBestAvailable(teRankings, targetRound);
                    lateTeTaken = false;
                } 
            } else {
                 const rbTargetReached = myTeam.RB.count === myTeam.RB.target;
                if (!rbTargetReached) {
                    targetRound = findHighestRoundWithPlayers(combinedPlayerRankings);
                    bestPick = selectBestAvailable(combinedPlayerRankings, targetRound);
                } else {
                    targetRound = findHighestRoundWithPlayers(wrRankings);
                    bestPick = selectBestAvailable(wrRankings, targetRound);
                }
            }
        }
    }  
    return bestPick; 
}
// Returns a boolean, checks if target has been reached for provided position
function TargetReached(position) {
//     const rbTargetReached = myTeam.RB.count === myTeam.RB.target;
//     const wrTargetReached = myTeam.WR.count === myTeam.WR.target;
//     const qbTargetReached = myTeam.QB.count === myTeam.QB.target;
//     const teTargetReached = myTeam.TE.count === myTeam.TE.target;
    // console.log("return value", myTeam[`${position.toUpperCase()}`].count === myTeam[`${position.toUpperCase()}`].target);
    return myTeam[`${position.toUpperCase()}`].count === myTeam[`${position.toUpperCase()}`].target;
}

function incrementString(string) {
    const strArr = string.split('');
    let number = strArr.pop();
    number = parseInt(number) + 1;
    strArr.push(number);
    return strArr.join('');
}

// Round 11 - 13:
    // If my team still doesnt have a QB,
        // If there is a QB available in round 11 or earlier take best available
    // IF my team still doesn't have a TE
        // IF there is a TE available in round 11 or higher take best available 
    // IF late QB variable is flagged
        // If there is a QB available in round 11 or earlier take best available, unflag variable
    // IF late TE variable is flagged
        // If there is a TE available in round 11 or earlier take best available, unflag variable
    // Check if WR, RB, QB and TE have hit the target amount
    // Take best available of the positions that have not hit target amount
function findBestPickRoundElevenTwelveThirteen(currentRound) {
    let bestPick = "";
    const myTeamHasQb = myTeam.QB.count > 0;
    if (!myTeamHasQb) { 
        if (positionAvailableAbove(currentRound, qbRankings)) {
            let targetRound = findHighestRoundWithPlayers(qbRankings);
            bestPick = selectBestAvailable(qbRankings, targetRound);
        }
    } else {
        const myTeamHasTe = myTeam.TE.count > 0;
        let targetRound = findHighestRoundWithPlayers(teRankings);
        if (!myTeamHasTe) {
            if (positionAvailableAbove(currentRound, teRankings)) {
                bestPick = selectBestAvailable(teRankings, targetRound);
            } 
        } else {
            const wrMinReached = myTeam.WR.count >= myTeam.WR.min;
            const rbMinReached = myTeam.RB.count >= myTeam.RB.min;
            if (lateQbTaken && wrMinReached && rbMinReached) {
                if (positionAvailableAbove(currentRound, qbRankings)) {
                    targetRound = findHighestRoundWithPlayers(qbRankings);
                    bestPick = selectBestAvailable(qbRankings, targetRound);
                    lateQbTaken = false;
                }
            } else if (lateTeTaken && wrMinReached && rbMinReached) {
                if (positionAvailableAbove(currentRound, teRankings)) {
                    bestPick = selectBestAvailable(teRankings, targetRound);
                    lateTeTaken = false;
                } 
            } else {
                targetRound = findHighestRoundWithPlayers(combinedPlayerRankings);
                while (bestPick === "") {
                    const playersInTargetRound = combinedPlayerRankings[targetRound];
                    for (let i=0; i < playersInTargetRound.length; i++) {
                        const player = playersInTargetRound[i];
                        const playerPosition = player.position;
                        if (!TargetReached(playerPosition)) {
                            bestPick = player;
                            break;
                        }
                    };
                    targetRound = incrementString(targetRound);
                }
            }
        }
    }
    return bestPick;
}

// Round 14:
    // Take best available defense

function findBestPickRoundFourteen(currentRound) {
    return selectBestAvailable(defRankings, 'round1');
}

function findLastPosition() {
}
// Round 15:
    // Find the last position (that has not hit its target yet)
    // Take best available player in that position
function findBestPickRoundFifteen() {
    const remainingPositions = ["qb", "te", "wr", "rb"];
    const remainingPositionRankings = [qbRankings, teRankings, wrRankings, rbRankings];

    for (let i=0; i< remainingPositionRankings.length; i++) {
        if (!TargetReached(remainingPositions[i])) {
            const targetRound = findHighestRoundWithPlayers(remainingPositionRankings[i]);
            return selectBestAvailable(remainingPositionRankings[i], targetRound);
        }
    }

}

const strategyFunctions  = {
    1: findBestPickRoundOne,
    2: findBestPickRoundTwo,
    3: findBestPickRoundThreeFour,
    4: findBestPickRoundThreeFour,
    5: findBestPickRoundFiveSix,
    6: findBestPickRoundFiveSix,
    7: findBestPickRoundSeven,
    8: findBestPickRoundEight,
    9: findBestPickRoundNineTen,
    10: findBestPickRoundNineTen,
    11: findBestPickRoundElevenTwelveThirteen,
    12: findBestPickRoundElevenTwelveThirteen,
    13: findBestPickRoundElevenTwelveThirteen,
    14: findBestPickRoundFourteen,
    15: findBestPickRoundFifteen
};

function suggestPick() {
    const currentRound = Math.ceil((draftPickNumber + 1) / 12); 
    console.log("draft pick Number", draftPickNumber + 1);
    console.log("Current Round", currentRound);
    // Creates a suggestion by executing the strategy of the current round
    const suggestion = currentRound <= 15 ? strategyFunctions[currentRound](currentRound) : console.log("The draft has ended.");
    const suggestedPosition = suggestion.position.toUpperCase();
    const suggestedPick = suggestion.fullname;
    return [suggestedPosition, suggestedPick];
}

function displaySuggestedPick() {
    let [suggestedPosition, suggestedPick] = suggestPick();
    console.log("Suggested Position: ", suggestedPosition);
    suggestedPositionEl.textContent = suggestedPosition;
    console.log("Suggested Pick:", suggestedPick);
    suggestedPlayerEl.textContent = suggestedPick;
}



export { myTeam, displaySuggestedPick };