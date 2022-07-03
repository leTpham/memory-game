"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];
let count = 0;
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
  count++;
  console.log("IM FLIPPING")

  card.setAttribute("name", "flipped");
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  card.style.backgroundColor = "";
  card.removeAttribute("name");
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // ... you need to write this ...
  
  let card = evt.target;
  if (card.getAttribute("name") === "flipped" || card.getAttribute("name") === "matched"){
    return;
  }
  flipCard(card);
  console.log (count);
  if (count === 2) {
    checkMatch();
  }
}
  
function checkMatch(){
  console.log ("I'm checking!")
  let flippedCards = document.getElementsByName("flipped");
  console.log(flippedCards);
  if (flippedCards[0].className === flippedCards[1].className){
    console.log("these are matching");
    count = 0;
    flippedCards[1].setAttribute("name","matched");
    flippedCards[0].setAttribute("name","matched");
    console.log(flippedCards);
  }
  else {
  console.log("not matching");
  console.log(flippedCards[0]);
  console.log(flippedCards[1]);
  console.log(flippedCards);
  setTimeout(function(){
    unFlipCard(flippedCards[1]);
    unFlipCard(flippedCards[0]);
  }, 1000);
  
  count = 0;
  }

}

