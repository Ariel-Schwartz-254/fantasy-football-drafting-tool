// const LEAGUE_ID = "982247738458906624";
const DRAFT_ID = '1131964712087977984'; // Mock Draft ID
// const MOCK_DRAFT_ID = '1004422088788107264';
const numberOfTeams = 12;
const roundsInDraft = 15;
const isFullPPR = false

let myDraftPickNumbers = [];

// Takes in a username and returns the ID for that username
async function getUserId(username) {
    try {
        const response = await fetch(`https://api.sleeper.app/v1/user/${username}`);
        const responseData = await response.json();
        return responseData.user_id;
    } catch (error) {
        console.log(error);
    }
}

// Takes in a user ID and returns that user's draft pick number
async function getDraftPickNumber(userId) {
    try {
        const response = await fetch(`https://api.sleeper.app/v1/draft/${DRAFT_ID}`);
        const draft = await response.json();
        return draft.draft_order[userId];
    } catch (error) {
        console.log(error);
    }
}

function calculatePickNumbers(initialPick, numberOfTeams) {
    const pickNumbers = [];
    const firstSnake = initialPick;
    const secondSnake = (numberOfTeams + 1) - initialPick;
    let pickPosition = firstSnake;
    for(let i=0; i < roundsInDraft; i++) {
        pickNumbers.push(numberOfTeams * i + pickPosition);
        pickPosition = (pickPosition === firstSnake) ? secondSnake : firstSnake;
    }
    return pickNumbers;
}

// Hides the input fields once we get all our user information. This is a temporary fix, at some point I will create a seperate tab or page to collect user info
function hideUserInputFields() {
    const userInformationContainerEl = document.getElementById("username-input-container");
    userInformationContainerEl.style.display = "none";
}

function displayUsername(username) {
    const usernameDisplayEl = document.getElementById("username-display-container");
    const usernameDisplay = document.createElement("h4");
    usernameDisplay.textContent = `Hello ${username}!`;
    usernameDisplayEl.appendChild(usernameDisplay);
}

async function getUserInformation() {
    const username = document.getElementById("usernameInput").value;
    const userId = await getUserId(username);
    const myDraftPick = await getDraftPickNumber(userId);
    myDraftPickNumbers = calculatePickNumbers(myDraftPick, numberOfTeams);
    hideUserInputFields();
    displayUsername(username);
}

// Adding getUserInformation to global scope so it can be triggered in the HTML
window.getUserInformation = getUserInformation;


export { myDraftPickNumbers , getUserInformation, DRAFT_ID, isFullPPR };