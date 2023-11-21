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

let interval = null;

const clearAll = () => {
  clearInterval(interval);
  const zombies = document.querySelectorAll('.zombie');
  zombies.forEach((zombie) => zombie.remove());
};

const onAnimationEnd = (event) => {
  event.target.remove();

  gameState.lives -= 1;
  drawLives();

  if (gameState.lives === 0) {
    onEndGame();
  }
};

const drawLives = () => {
  livesContainer.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    const element = document.createElement('img');
    element.className = 'heart';
    element.src = i < gameState.lives ? 'full_heart.png' : 'empty_heart.png';
    livesContainer.appendChild(element);
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
  scoreDisplay.classList.add('hidden');

  score.innerText = gameState.score.toString().padStart(5, '0');

  drawLives();

  interval = setInterval(spawnZombie, 750);
};

const onEndGame = () => {
  gameState.status = 'over';

  container.classList.toggle('active');
  container.removeEventListener('mousemove', onMouseMove);
  modalPane.classList.toggle('hidden');
  aim.classList.toggle('hidden');
  scoreDisplay.classList.remove('hidden');

  modalText.innerText = 'Game over';
  scoreDisplay.innerText = `Your score: ${gameState.score}`;
  playButton.addEventListener('click', onClick);

  clearAll();
};

const onMouseMove = (event) => {
  aim.style.left = `${event.clientX - 125}px`;
  aim.style.top = `${event.clientY - 125}px`;
};

const onClick = () => {
  onStartGame();
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
