"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;

const IMAGES = [
   "url(images/cry.jpg)", "url(images/cry.jpg)",
   "url(images/feline-lawyer.jpg)", "url(images/feline-lawyer.jpg)",
   "url(images/Smiling-Cat.jpg)", "url(images/Smiling-Cat.jpg)",
   "url(images/salad-cat.jpeg)", "url(images/salad-cat.jpeg)",
   "url(images/cheeseburgermeme.jpg)", "url(images/cheeseburgermeme.jpg)" 
];

let count = 0; //count how many cards are flipped at the moment

let score = document.getElementById("score");

let maxFlipped = false; //only allowing 2 cards flipped at a time

const images = shuffle(IMAGES);

createCards(images);


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
 function createCards(images) {
  const gameBoard = document.getElementById("game");
  for (let image of images) {
    let newDiv = document.createElement("div");
    newDiv.className = image;
    newDiv.addEventListener("click", handleCardClick);
    gameBoard.appendChild(newDiv);
    }
  }

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  card.style.backgroundImage = card.className;
  count++;
  card.setAttribute("name", "flipped");
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  card.style.backgroundImage = "";
  card.removeAttribute("name"); //removing it from the set of flippedCards
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // ... you need to write this ...
  
  let card = evt.target;
  //only works if card is not already flipped, or already matched, or there aren't 2 cards already flipped in the game
  if (card.getAttribute("name") === "flipped" 
  || card.getAttribute("name") === "matched" 
  || maxFlipped){
    return;
  }
 
  flipCard(card);

  if (count === 2) {
    maxFlipped = true; //preventing from clicking other cards at the time
    checkMatch();
  }
}
  
function checkMatch(){
  let flippedCards = document.getElementsByName("flipped"); 

  if (flippedCards[0].className === flippedCards[1].className){
    count = 0; //reset flipped cards to 0 since these two are flipped but out of the game
    setTimeout(function(){
      maxFlipped = false;
    }, FOUND_MATCH_WAIT_MSECS); //buffer time after matched pair to keep playing
    
    //change names of matched cards to remove it from set of flippedCards
    flippedCards[1].setAttribute("name","matched");
    flippedCards[0].setAttribute("name","matched");
  }
  else {
  setTimeout(function(){
    unFlipCard(flippedCards[1]); 
    unFlipCard(flippedCards[0]);
    maxFlipped = false; //buffer time 
  }, FOUND_MATCH_WAIT_MSECS);

  count = 0; //since we're unflipping these 2 cards
  }
  displayScore()

}

function displayScore(){
  let matches = document.getElementsByName("matched");
  let left = 5 - (matches.length/2);
  score.innerHTML = left;
  if (left === 0) {
    score.style.fontSize = "70px"; 
    score.innerHTML = "Cong-🐀-s!" 
    document.getElementsByTagName("body").style.backgroundImage = "url(cat-space.gif)";
    }
}

displayScore()

