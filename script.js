const updateButton = document.getElementById('update-Btn');
const tabContent = document.getElementsByClassName('rounds-container');
const tabLinks = document.getElementsByClassName('tab');

import { myTeam, displaySuggestedPick, calculatePickNumbers, addPlayerToMyTeam } from "./strategy.js";
import { combinedPlayerRankings, wrRankings, rbRankings, qbRankings, teRankings, defRankings } from "./position-rankings.js";

const USERNAME = 'schwartz254'; //"RayRayRhodes"
const USER_ID = ''; //710595581638180864
const LEAGUE_ID = "982247738458906624";
const DRAFT_ID = '982247740212125696';
const MOCK_DRAFT_ID = '1004422088788107264';

let username = '';
let userId = '';
let myDraftPick; //Make sure to convert this into user input so RACHEL can use it
let myDraftPickNumbers;



const combinedCsvString = `Christian McCaffrey,Justin Jefferson,Ja'Marr Chase,Tyreek Hill,Bijan Robinson,Saquon Barkley,Austin Ekeler,Stefon Diggs,Nick Chubb\nTravis Kelce,Garrett Wilson,Davante Adams,A.J. Brown,CeeDee Lamb,Amon-Ra St. Brown,Josh Jacobs,Derrick Henry,Tony Pollard,Patrick Mahomes\nCalvin Ridley,Chris Olave,DK Metcalf,Jaylen Waddle,Dameon Pierce,Najee Harris,Mark Andrews,Josh Allen,Jalen Hurts,Tee Higgins,David Montgomery,Breece Hall\nDJ Moore,DeVonta Smith,Deebo Samuel,Lamar Jackson,Justin Herbert,T.J. Hockenson,J.K. Dobbins,Travis Etienne,Kenneth Walker,Aaron Jones,Miles Sanders,Jonathan Taylor\nJoe Burrow,George Pickens,Michael Pittman,Mike Williams,George Kittle,Darren Waller,Alvin Kamara,Kyle Pitts,Cam Akers,Rhamondre Stevenson,D'Andre Swift,Joe Mixon,Javonte Williams\nPat Freiermuth,Dallas Goedert,Justin Fields,Brandon Aiyuk,Chris Godwin,Amari Cooper,Courtland Sutton,Brian Robinson,DeAndre Hopkins,Diontae Johnson,Terry McLaurin,Dalvin Cook,Isiah Pacheco\nTrevor Lawrence,Evan Engram,Drake London,Christian Watson,Jahan Dotson,James Cook,Jamaal Williams,Tyler Lockett,Christian Kirk,Rachaad White,Keenan Allen,James Conner,Jahmyr Gibbs\nAJ Dillon,Tyler Allgeier,Damien Harris,Brandin Cooks,Rashod Bateman,Tua Tagovailoa,Aaron Rodgers,Dak Prescott,Mike Evans,Dalton Schultz,David Njoku,Khalil Herbert,Elijah Mitchell,Darnell Mooney\nKirk Cousins,Raheem Mostert,Roschon Johnson,Elijah Moore,Marquise Brown,Deshaun Watson,Gabe Davis,JuJu Smith-Schuster,Jakobi Meyers,Quentin Johnston,Skyy Moore,Treylon Burks,Antonio Gibson,Ty Chandler,Alexander Mattison,Jerry Jeudy,Rashaad Penny\nAlec Pierce,Anthony Richardson,Jordan Addison,Jaxon Smith-Njigba,Nico Collins,Cole Kmet,Daniel Jones,Ezekiel Elliott,Jerick McKinnon,Devin Singletary,Kenneth Gainwell,Jameson Williams,Allen Lazard,Kadarius Toney,Michael Thomas,Odell Beckham,Zay Flowers,Chuba Hubbard\nGeno Smith,Russell Wilson,Jared Goff,DJ Chark,Tank Dell,Tyler Boyd,Chigoziem Okonkwo,Luke Musgrave,Zay Jones,Adam Thielen,Samaje Perine,Zach Charbonnet,Tyjae Spears,Rondale Moore\nTank Bigsby,Dalton Kincaid,Irv Smith,Hunter Renfrow,Donovan Peoples-Jones,Matthew Stafford,Kenny Pickett,Jaylen Warren,Romeo Doubs,Michael Gallup,Jerome Ford,Kendre Miller,Marquez Valdes-Scantling,Gerald Everett,Tyler Higbee\nJonathan Mingo,Robert Woods,Jalin Hyatt,Jelani Woods,Greg Dulcich,Isaiah Likely,Derek Carr,Mac Jones,Chris Evans,Evan Hull,Demario Douglas,Zamir White,D'Onta Foreman,Parris Campbell,Darius Slayton,Josh Palmer,Zach Evans,Devon Achane,DeVante Parker,Brock Purdy,Puka Nacua\nErik Ezukanma,Nick Westbrook-Ikhine,Chase Brown,Ryan Tannehill,Bryce Young,C.J. Stroud,Marvin Mims,Jayden Reed,Pierre Strong,Cordarrelle Patterson,Kenny McIntosh,Khalil Shakir,Rashee Rice,DeVante Parker,Wan'Dale Robinson,Mecole Hardman,Dawson Knox,Hunter Henry,Mike Gesicki,Zach Ertz,Noah Fant,Sam LaPorta,Michael Mayer,Clyde Edwards-Helaire,Gus Edwards,Michael Carter,Deuce Vaughn,Van Jefferson,Terrace Marshall,Sean Tucker,Josh Downs,Tyler Scott,Mo Alie-Cox,Daniel Bellinger,Hayden Hurst,Logan Thomas,Cade Otton,Jordan Love,Desmond Ridder,Jimmy Garoppolo,Joshua Kelley,Kyren Williams,Keaontay Ingram,Allen Robinson,Chase Claypool,KJ Osborn,Eric Gray,Chris Rodriguez Jr.,Kyle Philips,Xavier Hutchinson`;
const wrCsvString = `Justin Jefferson,Ja'Marr Chase,Tyreek Hill,Stefon Diggs\nGarrett Wilson,Davante Adams,A.J. Brown,CeeDee Lamb,Amon-Ra St. Brown\nCalvin Ridley,Chris Olave,DK Metcalf,Jaylen Waddle,Tee Higgins\nDJ Moore,DeVonta Smith,Deebo Samuel\nGeorge Pickens,Michael Pittman,Mike Williams\nBrandon Aiyuk,Chris Godwin,Amari Cooper,Courtland Sutton,DeAndre Hopkins,Diontae Johnson,Terry McLaurin\nDrake London,Christian Watson,Jahan Dotson,Tyler Lockett,Christian Kirk,Keenan Allen\nBrandin Cooks,Rashod Bateman,Mike Evans,Darnell Mooney\nElijah Moore,Marquise Brown,Gabe Davis,JuJu Smith-Schuster,Jakobi Meyers,Quentin Johnston,Skyy Moore,Treylon Burks,Jerry Jeudy\nAlec Pierce,Jordan Addison,Jaxon Smith-Njigba,Nico Collins,Jameson Williams,Allen Lazard,Kadarius Toney,Michael Thomas,Odell Beckham,Zay Flowers\nDJ Chark,Tank Dell,Tyler Boyd,Zay Jones,Adam Thielen,Rondale Moore\nHunter Renfrow,Donovan Peoples-Jones,Romeo Doubs,Michael Gallup,Marquez Valdes-Scantling\nJonathan Mingo,Robert Woods,Jalin Hyatt,Demario Douglas,Parris Campbell,Darius Slayton,Josh Palmer,DeVante Parker,Puka Nacua\nErik Ezukanma,Nick Westbrook-Ikhine,Marvin Mims,Jayden Reed,Khalil Shakir,Rashee Rice,DeVante Parker,Wan'Dale Robinson,Mecole Hardman,Van Jefferson,Terrace Marshall,Josh Downs,Tyler Scott,Allen Robinson,Chase Claypool,KJ Osborn,Kyle Philips,Xavier Hutchinson`;
const rbCsvString = `Christian McCaffrey,Bijan Robinson,Saquon Barkley,Austin Ekeler,Nick Chubb\nJosh Jacobs,Derrick Henry,Tony Pollard\nDameon Pierce,Najee Harris,David Montgomery,Breece Hall\nJ.K. Dobbins,Travis Etienne,Kenneth Walker,Miles Sanders,Jonathan Taylor\nAlvin Kamara,Cam Akers,Rhamondre Stevenson,D'Andre Swift,Joe Mixon,Javonte Williams\nBrian Robinson,Dalvin Cook,Isiah Pacheco\nJames Cook,Jamaal Williams,Rachaad White,James Conner,Jahmyr Gibbs\nAJ Dillon,Tyler Allgeier,Damien Harris,Khalil Herbert,Elijah Mitchell\nRaheem Mostert,Roschon Johnson,Antonio Gibson,Ty Chandler,Alexander Mattison,Rashaad Penny\nEzekiel Elliott,Jerick McKinnon,Devin Singletary,Kenneth Gainwell,Chuba Hubbard\nSamaje Perine,Zach Charbonnet,Tyjae Spears\nTank Bigsby,Jaylen Warren,Jerome Ford,Kendre Miller\nChris Evans,Evan Hull,Zamir White,D'Onta Foreman,Zach Evans,Devon Achane\nChase Brown,Pierre Strong,Cordarrelle Patterson,Kenny McIntosh,Clyde Edwards-Helaire,Gus Edwards,Michael Carter,Deuce Vaughn,Sean Tucker,Joshua Kelley,Kyren Williams,Keaontay Ingram,Eric Gray,Chris Rodriguez Jr.`;
const qbCsvString = `\nPatrick Mahomes\nJosh Allen,Jalen Hurts\nLamar Jackson,Justin Herbert\nJoe Burrow\nJustin Fields\nTrevor Lawrence\nTua Tagovailoa,Aaron Rodgers,Dak Prescott\nKirk Cousins,Deshaun Watson\nAnthony Richardson,Daniel Jones\nGeno Smith,Russell Wilson,Jared Goff\nMatthew Stafford,Kenny Pickett\nDerek Carr,Mac Jones,Brock Purdy\nRyan Tannehill,Bryce Young,C.J. Stroud,Jordan Love,Desmond Ridder,Jimmy Garoppolo`;
const teCsvString = `\nTravis Kelce\nMark Andrews\nT.J. Hockenson\nGeorge Kittle,Darren Waller,Kyle Pitts\nPat Freiermuth,Dallas Goedert\nEvan Engram\nDalton Schultz,David Njoku\n\nCole Kmet\nChigoziem Okonkwo,Luke Musgrave\nDalton Kincaid,Irv Smith,Gerald Everett,Tyler Higbee\nJelani Woods,Greg Dulcich,Isaiah Likely\nDawson Knox,Hunter Henry,Mike Gesicki,Zach Ertz,Noah Fant,Sam LaPorta,Michael Mayer,Mo Alie-Cox,Daniel Bellinger,Hayden Hurst,Logan Thomas,Cade Otton`;
const defCsvString = `PHI,DAL,NO,SF,MIA,NE,NYJ,BUF,CIN,BAL,PIT,DEN,SEA,CAR,TB,LAC,WAS,TEN,ATL,KC,GB,HOU`;

const positionTypes = ['combined', 'wr', 'rb', 'qb', 'te'];
const positionRankingTypes = [combinedPlayerRankings,wrRankings,rbRankings,qbRankings,teRankings];

let displayedRankings = combinedPlayerRankings;
let selectedPlayers = [];
let draftPickNumber = 0;

// Takes in a player full name and searches for it in the csv string rankings
function findPosition(player) {
    const position = '';
    if (qbCsvString.includes(player)) { return 'qb' };
    if (teCsvString.includes(player)) { return 'te' };
    if (rbCsvString.includes(player)) { return 'rb' };
    if (wrCsvString.includes(player)) { return 'wr' };
    return 'Player not found';
}

// Parses provided CSV and populates into provided Object
function csvToObject(csv, obj, pos) {
    const rows = csv.split('\n');
    // console.log(rows);
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i] === "" ? [] : rows[i].split(',');
        const rowWithPosition = [];
        for (let i=0; i < row.length; i++) {
            let fullname = row[i];
            let position = pos;
            if (pos === 'combined') {
                position = findPosition(fullname);
            }
            rowWithPosition.push({ 'fullname': fullname, 'position': position});
        }
        // console.log(rowWithPosition);
        obj[`round${i+1}`] = rowWithPosition;
    }
    // console.log(obj);
}

function hideAllTabs() {
    for (let i=0; i < tabContent.length; i++) {
        // console.log(tabContent[i]);
        tabContent[i].style.display = "none";
    }
}

function resetSelectedTab() {
    for (let i=0; i < tabLinks.length; i++){
        tabLinks[i].className = 'tab';
    }
}
// Try and change the switch statement convert into object
function reassignDisplayedRankings(position) {
    switch (position) {
        case 'combined':
            displayedRankings = combinedPlayerRankings;
            break;
        case 'wr':
            displayedRankings = wrRankings;
            break;
        case 'rb':
            displayedRankings = rbRankings;
            break;
        case 'qb':
            displayedRankings = qbRankings;
            break;
        case 'te':
            displayedRankings = teRankings;
            break;
        case 'def':
            displayedRankings = defRankings;
            break;
        default:
            console.log("Rankings not found");
    }
}

function changeTab(e, position) {
    hideAllTabs();
    resetSelectedTab();
    const currentTab = document.getElementById(`${position}-tab`);
    currentTab.style = "";
    e.currentTarget.className += " selected-tab";
    reassignDisplayedRankings(position);
    position !== 'def' ? displayList(position, displayedRankings) : displayAvailableDefenses();
}
// Adding changeTab function to global scope since the script,js file is defined in the html as a module and not accessible in the global scope
window.changeTab = changeTab;

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

// function saveUsername() {
//     username = document.getElementById("usernameInput");
//     console.log("Saved username: ", username);
// }
// window.saveUsername = saveUsername;

async function getUserId() {
    try {
        const response = await fetch(`https://api.sleeper.app/v1/user/${username}`);
        const responseData = await response.json();
        userId = responseData.user_id;
    } catch (error) {
        console.log(error);
    }
}

async function getDraftPickNumber() {
    try {
        const response = await fetch(`https://api.sleeper.app/v1/draft/${DRAFT_ID}`);
        const draft = await response.json();
        myDraftPick = draft.draft_order[userId];
        console.log(draft);
    } catch (error) {
        console.log(error);
    }
}

function hideUserInputFields() {
    const userInformationContainerEl = document.getElementById("username-input-container");
    userInformationContainerEl.style.display = "none";
}

async function getUserInformation() {
    username = document.getElementById("usernameInput").value;
    // console.log("Saved username: ", username);
    await getUserId();
    // console.log(userId);
    await getDraftPickNumber();
    // console.log(myDraftPick);
    myDraftPickNumbers = calculatePickNumbers(myDraftPick);
    // console.log(myDraftPickNumbers);
    hideUserInputFields();
}

window.getUserInformation = getUserInformation;

// Fetch players who have already been selected
async function getPicks() {
    try {
        const response = await fetch(`https://api.sleeper.app/v1/draft/${MOCK_DRAFT_ID}/picks`)
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

// Remove selected players from player rankings
function processSelectedPlayers() {
    console.log('Selected Players: ',selectedPlayers);
    while (draftPickNumber < selectedPlayers.length) {
        let pick = selectedPlayers[draftPickNumber];
        // console.log(pick.metadata.position);
        const firstName = pick.metadata.first_name;
        const lastName = pick.metadata.last_name;
        const playerFullName = `${firstName} ${lastName}`;
        removePlayerFromAllRankingTypes(playerFullName);
        removeSelectedDefenses(pick);
        // Check if current draft pick was selected by my team
        if (myDraftPickNumbers.includes(draftPickNumber + 1)) {
            // Add player to my team
            addPlayerToMyTeam(playerFullName, pick.metadata.position);
        }
        draftPickNumber++;
    }
    console.log('Player Rankings after removal: ',combinedPlayerRankings);
    console.log('My Team:', myTeam);
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

async function updateLists() {
    await getPicks();
    processSelectedPlayers();
    displayAvailablePlayers();
    displayAvailableDefenses();
    displaySuggestedPick();
}

function createRankingObjects() {
    csvToObject(combinedCsvString, combinedPlayerRankings, 'combined');
    csvToObject(wrCsvString, wrRankings, 'wr');
    csvToObject(rbCsvString, rbRankings, 'rb');
    csvToObject(qbCsvString, qbRankings, 'qb');
    csvToObject(teCsvString, teRankings, 'te');
    csvToObject(defCsvString, defRankings, 'def');
}

// Event Listeners
updateButton.addEventListener('click', updateLists);
// Automatic updates
// setInterval(updateLists, 30000);
// On Load
// getUserInformation();
createRankingObjects();
displayList('combined', combinedPlayerRankings);
console.log(myTeam);


export { draftPickNumber };