import { rankings, positionRankingTypes } from "./position-rankings.js";
import { myTeam } from "./strategy.js";
import { myDraftPickNumbers, DRAFT_ID } from "./user.js";

// Destructuring the defense rankings from object
const { def: defRankings } = rankings;

let selectedPlayers = [];
let draftPickNumber = 0;

// Fetch players who have already been selected from the Sleeper API
async function getPicks() {
    try {
        const response = await fetch(`https://api.sleeper.app/v1/draft/${DRAFT_ID}/picks`)
        selectedPlayers = await response.json()
    } catch (error) {
        console.log('Failed to fetch quotes', error);
    }
}

function arrayWithoutPlayer(array, index) {
    const arrStart = array.slice(0,index);
    const arrEnd = array.slice(index+1);
    const newArr = [...arrStart, ...arrEnd];
    return newArr;
}

function removePlayer(player, positionRankings) {
    for (let i=1; i < 15; i++) {
        const currentRound = positionRankings[`round${i}`];
        for (let j=0; j < currentRound.length; j++) {
            if (currentRound[j].fullname === player){
                const newArr = arrayWithoutPlayer(currentRound, j)
                positionRankings[`round${i}`] = newArr;
                break;
            }
        }
    }
}

function removePlayerFromAllRankingTypes(playerFullName) {
    for (let i=0; i < positionRankingTypes.length; i++) {
        removePlayer(playerFullName, positionRankingTypes[i]);
    }
}

function extractFullName(obj) {
    const firstName = obj.metadata.first_name;
    const lastName = obj.metadata.last_name;
    return `${firstName} ${lastName}`;

}

// Add player to my team
function addPlayerToMyTeam(player, position) {
    myTeam[position].players.push(player);
    myTeam[position].count++;
    console.log('My Team:', myTeam);
}

// Check if current draft pick was selected by my team
function checkIfMyPick(pick, player) {
    if (myDraftPickNumbers.includes(draftPickNumber + 1)) {
        addPlayerToMyTeam(player, pick.metadata.position);
    }
}

// Remove selected players from player rankings
function processSelectedPlayers() {
    console.log('Selected Players: ',selectedPlayers);
    while (draftPickNumber < selectedPlayers.length) {
        const pick = selectedPlayers[draftPickNumber];
        const playerFullName = extractFullName(pick);
        removePlayerFromAllRankingTypes(playerFullName);
        removeSelectedDefenses(pick);
        checkIfMyPick(pick, playerFullName);
        draftPickNumber++;
    }
    console.log('Player Rankings after removal: ',positionRankingTypes[0]);
}

function removeSelectedDefenses(pick) {
    let rankings = defRankings.round1;
    for(let i=0; i < rankings.length; i++) {
        if (rankings[i].fullname === pick.player_id) {
            defRankings['round1'] = arrayWithoutPlayer(rankings, i);
            break;
        }
    }
}

export { processSelectedPlayers, getPicks, draftPickNumber };