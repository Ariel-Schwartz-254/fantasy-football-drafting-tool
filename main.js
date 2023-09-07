const updateButton = document.getElementById('update-Btn');

import { myTeam, displaySuggestedPick } from "./strategy.js";
import { rankings } from "./position-rankings.js";
import { createRankingObjects } from "./csv-to-object.js";
import { changeTab } from './tabs.js';
import { displayList, displayAvailablePlayers, displayAvailableDefenses } from "./lists.js";
import { getPicks, processSelectedPlayers } from "./update-rankings.js";

// Adding changeTab function to global scope since the script.js file is defined in the html as a module and not accessible in the global scope
window.changeTab = changeTab;

// Destructuring the combined rankings from object
const { combined: combinedPlayerRankings } = rankings;

async function updateLists() {
    await getPicks();
    processSelectedPlayers();
    displayAvailablePlayers();
    displayAvailableDefenses();
    displaySuggestedPick();
}

// Event Listeners
updateButton.addEventListener('click', updateLists);

// Automatic updates
// setInterval(updateLists, 10000);

// On Load
createRankingObjects();
displayList('combined', combinedPlayerRankings);
console.log(myTeam);
