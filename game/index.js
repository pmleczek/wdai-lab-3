let gameState = {
  status: 'initial',
  score: 0,
  lives: 3,
};

const aim = document.querySelector('#aim');
const container = document.querySelector('#container');
const livesContainer = document.querySelector('#lives');
const modalPane = document.querySelector('#modal-pane');
const modalText = document.querySelector('#modal-text');
const playButton = document.querySelector('#play-button');
const score = document.querySelector('#score');
const scoreDisplay = document.querySelector('#score-display');

const onAnimationEnd = (event) => {
  event.target.remove();

  if (gameState.lives === 0) {
    onEndGame();
  } else {
    gameState.lives -= 1;
  }

  drawLives();
};

const drawLives = () => {
  livesContainer.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    if (i < gameState.lives - 1) {
      
    }
  }
};

const spawnZombie = () => {
  const zombie = document.createElement('div');
  zombie.classList = 'zombie';

  const scale = 0.75 + Math.random() * 0.35;
  zombie.style.transform = `scale(${scale})`;

  zombie.style.zIndex = 50 + Math.random() * 100;

  zombie.style.bottom = `${Math.random() * 250}px`;

  const moveSpeed = Math.floor(Math.random() * 20 + 10);
  zombie.style.animationDuration = `0.5s, ${moveSpeed}s`;

  zombie.addEventListener('animationend', onAnimationEnd);

  container.appendChild(zombie);
};

const onStartGame = () => {
  gameState = {
    status: 'active',
    score: 30,
    lives: 3,
  };

  container.classList.toggle('active');
  container.addEventListener('mousemove', onMouseMove);
  modalPane.classList.toggle('hidden');
  aim.classList.toggle('hidden');

  score.innerText = gameState.score.toString().padStart(5, '0');

  drawLives();

  setInterval(spawnZombie, 750);
};

const onEndGame = () => {
  container.classList.toggle('active');
  container.removeEventListener('mousemove', onMouseMove);
  modalPane.classList.toggle('hidden');
  aim.classList.toggle('hidden');
  scoreDisplay.classList.toggle('hidden');

  modalText.innerText = 'Game over';
  scoreDisplay.innerText = `Your score: ${gameState.score}`;
};

const onMouseMove = (event) => {
  aim.style.left = `${event.clientX - 125}px`;
  aim.style.top = `${event.clientY - 125}px`;
};

const onClick = () => {
  if (gameState.status === 'initial') {
    onStartGame();
  }
};

const onClickContainer = (event) => {
  if (gameState.status === 'active' && gameState.score > 0) {
    if (event.target.className === 'zombie') {
      gameState.score += 10;
      event.target.remove();
    } else {
      gameState.score -= 3;
    }

    score.innerText = gameState.score.toString().padStart(5, '0');
  }
};

playButton.addEventListener('click', onClick);

container.addEventListener('click', onClickContainer);
