// Select HTML elements
const app = document.querySelector('.app')! as HTMLElement;
const btns = document.querySelectorAll('.btn');
const btnNewGame = document.querySelector('.btn--new-game')! as HTMLElement;
const colorContainer = document.querySelector(
  '.container-color--inner'
)! as HTMLElement;
const healthEl = document.querySelector('.hp')!;

// Game variables
const initialHealth = 10;
let health = initialHealth;
let guessColor: string;
let gameOver = false;
let guessedCorrect = 0;

// generates random hex color
const generateHexColor = function () {
  const hexMap = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    const index = Math.trunc(Math.random() * 16);
    color += hexMap[index];
  }

  return color;
};

// toggles button when health is 0
const handleButtonVisibility = function () {
  btns.forEach(btn => btn.classList.toggle('hidden'));
  btnNewGame.classList.toggle('hidden');
};

// generates html for health indicator and sets gameover
const handleHealth = function () {
  healthEl.innerHTML = `<p>Health</p> <p>${'❤️'.repeat(health)}</p>`;

  if (health <= 0) {
    gameOver = true;
    healthEl.innerHTML = `Game Over! You guessed ${guessedCorrect} ${
      guessedCorrect > 1 ? 'colors' : 'color'
    }.`;
    handleButtonVisibility();
  }
};

const handleCorrect = function () {
  guessedCorrect += 1;
  resetButtons();
};

const handleButtonClick = function (e: Event) {
  if (gameOver) return;

  const targetEl = e.target as HTMLElement;
  const colorValue = targetEl.innerHTML;

  if (colorValue === guessColor) {
    handleCorrect();
  } else if (
    colorValue !== guessColor &&
    !targetEl.classList.contains('false')
  ) {
    targetEl.classList.add('false');
    health -= 1;
    handleHealth();
  }
};

const newGame = function () {
  health = initialHealth;
  gameOver = false;
  handleHealth();
  resetButtons();
};

// adds eventlisteners to buttons
const initButtons = function () {
  btns.forEach(btn =>
    btn.addEventListener('click', e => {
      handleButtonClick(e);
    })
  );

  btnNewGame.addEventListener('click', () => {
    handleButtonVisibility();
    newGame();
  });

  resetButtons();
};

// resets buttons color and generates new random color
const resetButtons = function () {
  guessColor = generateHexColor();
  colorContainer.style.backgroundColor = guessColor;

  const correctButtonIndex = Math.trunc(Math.random() * 3);

  for (let i = 0; i < 3; i++) {
    const btn = btns[i];

    if (i === correctButtonIndex) btn.innerHTML = guessColor;
    else btn.innerHTML = generateHexColor();

    btn.classList.remove('false');
  }
};

const init = function () {
  initButtons();
  handleHealth();
};

init();
