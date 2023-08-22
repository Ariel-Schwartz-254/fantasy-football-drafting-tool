const updateButton = document.getElementById('update-Btn');
const tabContent = document.getElementsByClassName('rounds-container');
const tabLinks = document.getElementsByClassName('tab');

const USERNAME = 'schwartz254';
const USER_ID = '710595581638180864';
const LEAGUE_ID = "982247738458906624";
const DRAFT_ID = '982247740212125696';
const MOCK_DRAFT_ID = '999669778925113344';



const combinedCsvString = `Christian McCaffrey,Austin Ekeler,Justin Jefferson,Ja'Marr Chase,Tyreek Hill,Saquon Barkley,Bijan Robinson,Stefon Diggs,Cooper Kupp,Nick Chubb\nDerrick Henry,Tony Pollard,Garrett Wilson,Davante Adams,A.J. Brown,CeeDee Lamb,Amon-Ra St. Brown,Travis Kelce,Patrick Mahomes,Travis Etienne,Jonathan Taylor,Josh Jacobs\nDameon Pierce,Najee Harris,David Montgomery,Calvin Ridley,Chris Olave,Jaylen Waddle,DK Metcalf,Mark Andrews,Josh Allen,Jalen Hurts,Tee Higgins,Rhamondre Stevenson,Breece Hall\nDJ Moore,DeVonta Smith,Deebo Samuel,Terry McLaurin,Lamar Jackson,Justin Herbert,T.J. Hockenson,Kenneth Walker,Aaron Jones,J.K. Dobbins,Miles Sanders\nMichael Pittman,Mike Williams,George Pickens,Joe Burrow,George Kittle,Darren Waller,Joe Mixon,Cam Akers,Javonte Williams,Kyle Pitts,Alvin Kamara,D'Andre Swift\nIsiah Pacheco,Brian Robinson,DeAndre Hopkins,Brandon Aiyuk,Pat Freiermuth,Dallas Goedert,Justin Fields,Keenan Allen,Chris Godwin,Amari Cooper,Diontae Johnson,Dalvin Cook\nTrevor Lawrence,Dak Prescott,Evan Engram,Jamaal Williams,Jahan Dotson,James Conner,Drake London,Courtland Sutton,Mike Evans,Jerry Jeudy,Tyler Lockett,Christian Watson,Rashaad Penny,Alexander Mattison,Christian Kirk,Marquise Brown\nJames Cook,Rachaad White,Jahmyr Gibbs,Brandin Cooks,Rashod Bateman,Aaron Rodgers,Tua Tagovailoa,Dalton Schultz,David Njoku,AJ Dillon,Tyler Allgeier,Damien Harris,Khalil Herbert,Elijah Mitchell\nKirk Cousins,Raheem Mostert,Roschon Johnson,Gabe Davis,Elijah Moore,JuJu Smith-Schuster,Jakobi Meyers,Quentin Johnston,Deshaun Watson,Antonio Gibson,Kadarius Toney,Darnell Mooney,Skyy Moore,Treylon Burks\nAlec Pierce,Jordan Addison,Jaxon Smith-Njigba,Nico Collins,Cole Kmet,Daniel Jones,Anthony Richardson,Jameson Williams,Odell Beckham,Ezekiel Elliott,Devin Singletary,Kenneth Gainwell,Allen Lazard,Michael Thomas,Zay Flowers,Chuba Hubbard\nGeno Smith,Russell Wilson,Jared Goff,DJ Chark,Tank Dell,Adam Thielen,Tyler Boyd,Chigoziem Okonkwo,Ty Chandler,Samaje Perine,Zach Charbonnet,Jerome Ford,Dawson Knox,Zay Jones,D'Onta Foreman,Rondale Moore,Kareem Hunt\nJerick McKinnon,Pierre Strong,Hunter Renfrow,Donovan Peoples-Jones,Matthew Stafford,Kenny Pickett,Cordarrelle Patterson,Jaylen Warren,Tyjae Spears,Kendre Miller,Demario Douglas,Romeo Doubs,Michael Gallup,Marquez Valdes-Scantling,Luke Musgrave,Irv Smith,Gerald Everett,Tyler Higbee\nJalin Hyatt,Parris Campbell,Darius Slayton,Josh Palmer,Jelani Woods,Greg Dulcich,Isaiah Likely,Derek Carr,Mac Jones,Zamir White,Chris Evans,Devon Achane,Tank Bigsby,Darrell Henderson Jr.,Allen Robinson,Chase Claypool,K.J. Osborn,Kyle Philips,Zach Evans,Hunter Henry,Dalton Kincaid,Mike Gesicki,DeVante Parker,Robert Woods,Puka Nacua,Brock Purdy\nChase Brown,Evan Hull,Ryan Tannehill,Bryce Young,C.J. Stroud,Leonard Fournette,Kenny McIntosh,Gus Edwards,Erik Ezukanma,Jonathan Mingo,Nick Westbrook-Ikhine,Khalil Shakir,Wan'Dale Robinson,Mecole Hardman,Van Jefferson,Terrace Marshall Jr.,Zach Ertz,Noah Fant,Sam LaPorta,Michael Mayer,Clyde Edwards-Helaire,Michael Carter,Deuce Vaughn,Marvin Mims,Jayden Reed,Rashee Rice`;
const wrCsvString = `Justin Jefferson,Ja'Marr Chase,Tyreek Hill,Stefon Diggs,Cooper Kupp\nGarrett Wilson,Davante Adams,A.J. Brown,CeeDee Lamb,Amon-Ra St. Brown\nCalvin Ridley,Chris Olave,Jaylen Waddle,DK Metcalf,Tee Higgins\nDJ Moore,DeVonta Smith,Deebo Samuel,Terry McLaurin\nMichael Pittman,Mike Williams,George Pickens\nDeAndre Hopkins,Brandon Aiyuk,Keenan Allen,Chris Godwin,Amari Cooper,Diontae Johnson\nJahan Dotson,Drake London,Courtland Sutton,Mike Evans,Jerry Jeudy,Tyler Lockett,Christian Watson,Christian Kirk,Marquise Brown\nBrandin Cooks,Rashod Bateman\nGabe Davis,Elijah Moore,JuJu Smith-Schuster,Jakobi Meyers,Quentin Johnston,Kadarius Toney,Darnell Mooney,Skyy Moore,Treylon Burks\nAlec Pierce,Jordan Addison,Jaxon Smith-Njigba,Nico Collins,Jameson Williams,Odell Beckham,Allen Lazard,Michael Thomas,Zay Flowers\nDJ Chark,Tank Dell,Adam Thielen,Tyler Boyd,Zay Jones,Rondale Moore\nHunter Renfrow,Donovan Peoples-Jones,Demario Douglas,Romeo Doubs,Michael Gallup,Marquez Valdes-Scantling\nJalin Hyatt,Parris Campbell,Darius Slayton,Josh Palmer,Allen Robinson,Chase Claypool,K.J. Osborn,Kyle Philips,DeVante Parker,Robert Woods,Puka Nacua\nErik Ezukanma,Jonathan Mingo,Nick Westbrook-Ikhine,Khalil Shakir,Wan'Dale Robinson,Mecole Hardman,Van Jefferson,Terrace Marshall,Marvin Mims,Jayden Reed,Rashee Rice,Josh Downs,Robbie Chosen,Marvin Jones Jr. ,Corey Davis,Mecole Hardman,Tyler Scott,Xavier Hutchinson`;
const rbCsvString = `Christian McCaffrey,Austin Ekeler,Saquon Barkley,Bijan Robinson,Nick Chubb\nDerrick Henry,Tony Pollard,Travis Etienne,Jonathan Taylor,Josh Jacobs\nDameon Pierce,Najee Harris,David Montgomery,Rhamondre Stevenson,Breece Hall\nKenneth Walker,Aaron Jones,J.K. Dobbins,Miles Sanders\nJoe Mixon,Cam Akers,Javonte Williams,Alvin Kamara,D'Andre Swift\nIsiah Pacheco,Brian Robinson,Dalvin Cook\nJamaal Williams,James Conner,Rashaad Penny,Alexander Mattison\nJames Cook,Rachaad White,Jahmyr Gibbs,AJ Dillon,Tyler Allgeier,Damien Harris,Khalil Herbert,Elijah Mitchell\nRaheem Mostert,Roschon Johnson,Antonio Gibson\nEzekiel Elliott,Devin Singletary,Kenneth Gainwell,Chuba Hubbard\nTy Chandler,Samaje Perine,Zach Charbonnet,Jerome Ford,D'Onta Foreman,Kareem Hunt\nJerick McKinnon,Pierre Strong,Cordarrelle Patterson,Jaylen Warren,Tyjae Spears,Kendre Miller\nZamir White,Chris Evans,Devon Achane,Tank Bigsby,Darrell Henderson,Zach Evans\nChase Brown,Evan Hull,Leonard Fournette,Kenny McIntosh,Gus Edwards,Clyde Edwards-Helaire,Michael Carter,Deuce Vaughn,James Robinson,Chase Edmunds,Joshua Kelley,Kyren Williams,Jeff Wilson Jr.,Keaontay Ingram,Eno Benjamin,Eric Gray,Chris Rodriguez Jr.,DeWayne McBride`;
const qbCsvString = `\nPatrick Mahomes\nJosh Allen,Jalen Hurts\nLamar Jackson,Justin Herbert\nJoe Burrow\nJustin Fields\nTrevor Lawrence,Dak Prescott\nAaron Rodgers,Tua Tagovailoa\nKirk Cousins,Deshaun Watson\nDaniel Jones,Anthony Richardson\nGeno Smith,Russell Wilson,Jared Goff\nMatthew Stafford,Kenny Pickett\nDerek Carr,Mac Jones,Brock Purdy\nRyan Tannehill,Bryce Young,C.J. Stroud,Jordan Love,Desmond Ridder,Jimmy Garoppolo`;
const teCsvString = `\nTravis Kelce\nMark Andrews\nT.J. Hockenson\nGeorge Kittle,Darren Waller,Kyle Pitts\nPat Freiermuth,Dallas Goedert\nEvan Engram\nDalton Schultz,David Njoku\n\nCole Kmet\nChigoziem Okonkwo,Dawson Knox\nLuke Musgrave,Irv Smith,Gerald Everett,Tyler Higbee\nJelani Woods,Greg Dulcich,Isaiah Likely,Hunter Henry,Dalton Kincaid,Mike Gesicki\nZach Ertz,Noah Fant,Sam LaPorta,Michael Mayer,Mo Alie-Cox,Daniel Bellinger,Hayden Hurst,Logan Thomas,Cade Otton`;
const defCsvString = `PHI,DAL,NO,SF,MIA,NE,NYJ,BUF,CIN,BAL,PIT,DEN,SEA,CAR,TB,LAC,WAS,TEN,ATL,KC,GB,HOU`;


const combinedPlayerRankings = {};
const wrRankings = {};
const rbRankings = {};
const qbRankings = {};
const teRankings = {};
const defRankings = {};

const positionTypes = ['combined', 'wr', 'rb', 'qb', 'te'];
const positionRankingTypes = [combinedPlayerRankings,wrRankings,rbRankings,qbRankings,teRankings];

let displayedRankings = combinedPlayerRankings;
let selectedPlayers = [];
let draftPickNumber = 0;

// Parses provided CSV and populates into provided Object
function csvToObject(csv, obj) {
    const rows = csv.split('\n');
    // console.log(rows);
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i] === "" ? [] : rows[i].split(',');
        obj[`round${i+1}`] = row;
    }
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

function buildList(position, players, idx) {
    const roundListEl = document.getElementById(`${position}-round-${idx}`);
    // Reset Lists
    roundListEl.textContent = '';
    // Re-Populate Lists
    for (let i=0; i < players.length; i++) {
        const element = document.createElement('li');
        element.textContent = players[i];
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

function getUserId() {
    fetch(`https://api.sleeper.app/v1/user/${USERNAME}`)
        .then(resp=> resp.json())
        .then(console.log)
}

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
    arrStart = array.slice(0,index);
    arrEnd = array.slice(index+1);
    newArr = [...arrStart, ...arrEnd];
    return newArr;
}

function removePlayer(player, positionRankings) {
    for (let i=1; i < 15; i++) {
        const currentRound = positionRankings[`round${i}`];
        for (let j=0; j < currentRound.length; j++) {
            if (currentRound[j] === player){
                newArr = arrayWithoutPlayer(currentRound, j)
                positionRankings[`round${i}`] = newArr;
                break;
            }
        }
    }
}

// Remove selected players from player rankings
function removeSelectedPlayers() {
    console.log('Selected Players: ',selectedPlayers);
    while (draftPickNumber < selectedPlayers.length) {
        let pick = selectedPlayers[draftPickNumber];
        const firstName = pick.metadata.first_name;
        const lastName = pick.metadata.last_name;
        const playerFullName = `${firstName} ${lastName}` ;
        for (let i=0; i < positionRankingTypes.length; i++) {
            removePlayer(playerFullName, positionRankingTypes[i]);
        }
        removeSelectedDefenses(pick);
        draftPickNumber++;
    }
    console.log('Player Rankings after removal: ',combinedPlayerRankings);
}

function removeSelectedDefenses(pick) {
    let rankings = defRankings.round1;
    for(let i=0; i < rankings.length; i++) {
        if (rankings[i] === pick.player_id) {
            defRankings['round1'] = arrayWithoutPlayer(rankings, i);
            break;
        }
    }
}

async function updateLists() {
    await getPicks();
    removeSelectedPlayers();
    displayAvailablePlayers();
    displayAvailableDefenses();
}

function createRankingObjects() {
    csvToObject(combinedCsvString, combinedPlayerRankings);
    csvToObject(wrCsvString, wrRankings);
    csvToObject(rbCsvString, rbRankings);
    csvToObject(qbCsvString, qbRankings);
    csvToObject(teCsvString, teRankings);
    csvToObject(defCsvString, defRankings);
}

// Event Listeners
updateButton.addEventListener('click', updateLists);
// On Load
createRankingObjects();
displayList('combined', combinedPlayerRankings);