const updateButton = document.getElementById('update');

const USERNAME = 'schwartz254';
const USER_ID = '710595581638180864';
const LEAGUE_ID = "982247738458906624";
const DRAFT_ID = '982247740212125696';
const MOCK_DRAFT_ID = '997157690272960512';



const csvString = `Christian McCaffrey,Austin Ekeler,Justin Jefferson,Ja'Marr Chase,Tyreek Hill,Saquon Barkley,Bijan Robinson,Stefon Diggs,Cooper Kupp,Nick Chubb\nDerrick Henry,Tony Pollard,Garrett Wilson,Davante Adams,A.J. Brown,CeeDee Lamb,Amon-Ra St. Brown,Travis Kelce,Patrick Mahomes,Jonathan Taylor,Josh Jacobs,Travis Etienne,Rhamondre Stevenson\nDameon Pierce,Najee Harris,David Montgomery,Calvin Ridley,Chris Olave,Jaylen Waddle,DK Metcalf,Mark Andrews,Josh Allen,Jalen Hurts,Tee Higgins,Breece Hall\nDeVonta Smith,Deebo Samuel,Terry McLaurin,DJ Moore,Lamar Jackson,Justin Herbert,T.J. Hockenson,Kenneth Walker,Aaron Jones,Miles Sanders,J.K. Dobbins\nMichael Pittman,Mike Williams,George Pickens,Joe Burrow,George Kittle,Darren Waller,Joe Mixon,Cam Akers,Javonte Williams,Kyle Pitts,Alvin Kamara,D'Andre Swift\nIsiah Pacheco,Brian Robinson,Alexander Mattison,DeAndre Hopkins,Brandon Aiyuk,Pat Freiermuth,Dallas Goedert,Justin Fields,Keenan Allen,Chris Godwin,Amari Cooper,Diontae Johnson,Dalvin Cook\nTrevor Lawrence,Dak Prescott,Evan Engram,Jamaal Williams,James Conner,Drake London,Courtland Sutton,Mike Evans,Jerry Jeudy,Tyler Lockett,Christian Watson,Rashaad Penny,Christian Kirk,Marquise Brown\nJames Cook,Rachaad White,Jahmyr Gibbs,Brandin Cooks,Treylon Burks,Rashod Bateman,Jahan Dotson,Aaron Rodgers,Tua Tagovailoa,Dalton Schultz,David Njoku,AJ Dillon,Tyler Allgeier,Damien Harris,Khalil Herbert,Elijah Mitchell\nKirk Cousins,Raheem Mostert,Roschon Johnson,D'Onta Foreman,Gabe Davis,JuJu Smith-Schuster,Jakobi Meyers,Quentin Johnston,Deshaun Watson,Antonio Gibson,Kadarius Toney,Darnell Mooney,Elijah Moore,Skyy Moore\nJordan Addison,Jaxon Smith-Njigba,Nico Collins,Cole Kmet,Daniel Jones,Anthony Richardson,Jameson Williams,Odell Beckham,Ezekiel Elliott,Devin Singletary,Kenneth Gainwell,Allen Lazard,Michael Thomas,Zay Flowers,Chuba Hubbard,Kareem Hunt\nGeno Smith,Russell Wilson,Jared Goff,Alec Pierce,Nathaniel Dell,Adam Thielen,Tyler Boyd,Chig Okonkwo,Samaje Perine,Zach Charbonnet,Jerome Ford,Dawson Knox,Zay Jones,D.J. Chark,Rondale Moore\nJerick McKinnon,Pierre Strong Jr.,Hunter Renfrow,Donovan Peoples-Jones,Matthew Stafford,Kenny Pickett,Cordarrelle Patterson,Jaylen Warren,Tyjae Spears,Kendre Miller,Demario Douglas,Romeo Doubs,Michael Gallup,Darius Slayton,Marquez Valdes-Scantling,Irv Smith Jr.,Gerald Everett,Tyler Higbee\nJalin Hyatt,Parris Campbell,Josh Palmer,Jelani Woods,Greg Dulcich,Luke Musgrave,Isaiah Likely,Derek Carr,Mac Jones,Zamir White,Chris Evans,Devon Achane,Darrell Henderson Jr.,Allen Robinson,Chase Claypool,K.J. Osborn,Kyle Philips,Zach Evans\nChase Brown,Evan Hull,Ryan Tannehill,Bryce Young,C.J. Stroud,Leonard Fournette,Kenny McIntosh,Gus Edwards,Nick Westbrook-Ikhine,Khalil Shakir,Wan'Dale Robinson,Mecole Hardman,Van Jefferson,Terrace Marshall Jr.,Zach Ertz,Noah Fant,Sam LaPorta,Michael Mayer`;

let selectedPlayers = [];
const combinedPlayerRankings = {};
let draftPickNumber = 0;

function csvToArray(csv) {
    const rows = csv.split('\n');
    // console.log(rows);
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i].split(',');
        combinedPlayerRankings[`round${i+1}`] = row;
    }
}

function buildList(players, idx) {
    const roundListEl = document.getElementById(`round-${idx}`);
    // Reset Lists
    roundListEl.textContent = '';
    // Re-Populate Lists
    for (let i=0; i < players.length; i++) {
        const element = document.createElement('li');
        element.textContent = players[i];
        roundListEl.appendChild(element);
    }
}

function displayAvailablePlayers(){
    for (let i=1; i < 15; i++) {
        const currentRound = combinedPlayerRankings[`round${i}`];
        buildList(currentRound, i);
    }
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

// Remove selected players from player rankings
function removeSelectedPlayers() {
    console.log('Selected Players: ',selectedPlayers);
    while (draftPickNumber < selectedPlayers.length) { // change to selected players.length
        // console.log('Draft Pick:', draftPickNumber);
        let pick = selectedPlayers[draftPickNumber];
        const firstName = pick.metadata.first_name;
        const lastName = pick.metadata.last_name;
        const playerFullName = `${firstName} ${lastName}` ;
        // console.log('Player To Remove:', playerFullName);
        for (let i=1; i < 15; i++) {
            const currentRound = combinedPlayerRankings[`round${i}`];
            for (let j=0; j < currentRound.length; j++) {
                if (currentRound[j] === playerFullName){
                    arrStart = currentRound.slice(0,j);
                    arrEnd = currentRound.slice(j+1);
                    newArr = [...arrStart, ...arrEnd];
                    // console.log('new arr:', newArr);
                    combinedPlayerRankings[`round${i}`] = newArr;
                    break;
                }
            }
        }
        draftPickNumber++;
    }
    console.log('Player Rankings: ',combinedPlayerRankings);
}

async function updateLists() {
    await getPicks();
    removeSelectedPlayers();
    displayAvailablePlayers();
}

// Event Listeners
updateButton.addEventListener('click', updateLists);
// On Load
csvToArray(csvString);
displayAvailablePlayers();
console.log('Player Rankings: ',combinedPlayerRankings);