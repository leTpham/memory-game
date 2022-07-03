"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.


  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */
function createCards(colors) {
  const gameBoard = document.getElementById("game");
  for (let color of colors) {
    // missing code here ...
    let newDiv = document.createElement("div");
    newDiv.className = color;
    newDiv.addEventListener("click", handleCardClick);
    gameBoard.appendChild(newDiv);
    }
  }


/** Flip a card face-up. */


function flipCard(card) {
  // ... you need to write this ...
  card.style.backgroundColor = card.className;
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  card.style.backgroundColor = "";

}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // ... you need to write this ...
  let card = evt.target;
  if (card.style.backgroundColor !== card.className){
    flipCard(card);
    console.log("flipping card");
    card.setAttribute("name","flipped");
  }
  let flippedCards = [];
  flippedCards=document.getElementsByName("flipped");
  console.log(flippedCards);
  console.log(flippedCards.length);
  if (!flippedCards.length > 2){ //what to do here
    if (checkMatch(flippedCards)){
      console.log ("matching!");
    }
    else {
      console.log("not matching");
      for (card of flippedCards){
        unFlipCard(card);
        console.log("flipping you back")
      }
    }
      }
    }
    
 

function checkMatch(flippedCards){
  return flippedCards[0].getAttribute("class") === flippedCards[1].getAttribute("class");
}
