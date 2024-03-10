'use strict';

const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const diceImage = document.querySelector('.dice');
let currentScore0 = document.getElementById('current--0');
let currentScore1 = document.getElementById('current--1');
const RollBtn = document.querySelector('.btn--roll');
const HoldBtn = document.querySelector('.btn--hold');
const NewBtn = document.querySelector('.btn--new');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');


let currentScore;
let activePlayer;
let score;
let playing;

const init = () => {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore0.textContent = currentScore;
  currentScore1.textContent = currentScore;

  player0Element.classList.add("player--active");
  player1Element.classList.remove("player--active");
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');

  diceImage.classList.add('hidden');
};

init();

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

RollBtn.addEventListener('click', () => {
  if (playing) {
    diceImage.classList.remove('hidden');
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    diceImage.src = `dice-${randomNumber}.png`;
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

HoldBtn.addEventListener('click', () => {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 10) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceImage.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

NewBtn.addEventListener('click', () => {
  init();
});
