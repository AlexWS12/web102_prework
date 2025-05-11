/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
        for (let i = 0; i < games.length; i++) {
      const game = games[i];
  
      const gameCard = document.createElement("div");
      gameCard.classList.add("game-card");
  
      gameCard.innerHTML = `
      <img src="${game.img}" class="game-img" />
      <h3>${game.name}</h3>
      <p>${game.description}</p>
      <p>Backers: ${game.backers.toLocaleString()}</p>
    `;    
  
      gamesContainer.appendChild(gameCard);
    }
  }
  

// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/
const contributionsCard = document.getElementById("num-contributions");
const raisedCard = document.getElementById("total-raised");
const gamesCard = document.getElementById("num-games");

const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

contributionsCard.innerText = totalContributions.toLocaleString();
raisedCard.innerText = "$" + totalRaised.toLocaleString();
gamesCard.innerText = GAMES_JSON.length;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/


// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
  
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
  
    addGamesToPage(unfundedGames);
  }
  

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
  
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
  
    addGamesToPage(fundedGames);
  }
  

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
  }  

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
const unfundedCount = unfundedGames.length;

const summaryStr = `
  A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games.
  Currently, ${unfundedCount} game${unfundedCount !== 1 ? "s" : ""} remain${unfundedCount !== 1 ? "" : "s"} unfunded.
  We need your help to fund these amazing games!
`;

const summaryParagraph = document.createElement("p");
summaryParagraph.innerText = summaryStr;
descriptionContainer.appendChild(summaryParagraph);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});


const [firstGame, secondGame, ...rest] = sortedGames;


const firstGameElement = document.createElement("p");
firstGameElement.innerText = firstGame.name;
firstGameContainer.appendChild(firstGameElement);


const secondGameElement = document.createElement("p");
secondGameElement.innerText = secondGame.name;
secondGameContainer.appendChild(secondGameElement);

//************************************************************************************
 
addGamesToPage(GAMES_JSON);

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
