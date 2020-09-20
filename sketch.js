var snake;
var food;
var apple = null;
var obstacles;
var bombs;
var deployedBombs;
var walkers;
var greyWalkers;
var whiteWalkers;
var redWalkers;
var stats;

var game_over = false;
var gameIsPaused = false;
var isLevelCompleted = false;
var affectTime = 0;

var levels_text;
var levels = [];
var currLevelIndex = LEVEL_START_NUM; // TODO: change to 0

function preload() {
  levels_text = loadStrings(LEVEL_FILE_PATH);
  //eatSound = loadSound('sound/Alert/Alert-06.mp3');
  //startOverSound = loadSound('sound/Voice/Male/Voice-Cartoon_Laugh-01.mp3');
  //hello = loadSound('sound/Voice/Male/Voice-Hello-01.mp3');
  //music = loadSound('sound/Music/Music-01.mp3');
}

function set_levels() {
  let levelAttributes = levels_text[0].split(",");
  for (let i = 1; i < levels_text.length; i++) {
    let fields = levels_text[i].split(",");
    let level = new Level(
      fields[0],
      fields[1],
      fields[2],
      fields[3],
      fields[4],
      fields[5],
      fields[6],
      fields[7],
      fields[8],
      fields[9]
    );
    levels.push(level);
  }
}

function setStats() {
  stats = new Stats(200, 50, 100, STATS_HEIGHT, LIVES, levels[currLevelIndex]);
}

function setSnake() {
  let snake_x = FRAME_X + int(random(0, FRAME_COLS)) * TILE_SIZE;
  let snake_y = FRAME_Y + int(random(0, FRAME_ROWS)) * TILE_SIZE;
  snake = new Snake(
    snake_x,
    snake_y,
    SNAKE_WIDTH,
    SNAKE_SPEED,
    color(0, 0, 255)
  );
}

function setFood() {
  food = new Food(0, 0, TILE_SIZE, color(0, 255, 0));
  food.changeLocation();
}

function setApple() {
  let _type = int(random(1, 4));
  if (_type == 1 && stats.level.allow_grey) {
    apple = new GreyApple(0, 0, TILE_SIZE, color(100));
    apple.changeLocation();
  } else if (_type == 2 && stats.level.allow_white) {
    apple = new WhiteApple(0, 0, TILE_SIZE, color(255));
    apple.changeLocation();
  } else if (stats.level.allow_purple) {
    apple = new PurpleApple(0, 0, TILE_SIZE, color(240, 130, 240));
    apple.changeLocation();
  }
}

function setObstacles() {
  obstacles = [];
  for (let i = 0; i < stats.level.obstacles_num; i++) {
    obstacle = new Obstacle(0, 0, TILE_SIZE, color(0));
    obstacle.changeLocation();
    obstacles.push(obstacle);
  }
}

function setBombs() {
  bombs = [];
  deployedBombs = [];
  for (let i = 0; i < stats.level.bombs_num; i++) {
    bomb = new Bomb(0, 0, TILE_SIZE, color(240, 240, 0), BOMB_SPEED);
    bombs.push(bomb);
  }
}

function setGreyWalkers() {
  greyWalkers = [];
  for (let i = 0; i < stats.level.grey_walkers_num; i++) {
    greyWalker = new GreyWalker(
      0,
      0,
      TILE_SIZE,
      color(100),
      WHITE_WALKER_SPEED
    );
    greyWalkers.push(greyWalker);
  }
}

function setWhiteWalkers() {
  whiteWalkers = [];
  for (let i = 0; i < stats.level.white_walkers_num; i++) {
    let whiteWalker = new WhiteWalker(
      0,
      0,
      TILE_SIZE,
      color(255),
      WHITE_WALKER_SPEED
    );
    whiteWalkers.push(whiteWalker);
  }
}

function setRedWalkers() {
  redWalkers = [];
  for (let i = 0; i < stats.level.red_walkers_num; i++) {
    let redWalker = new RedWalker(
      0,
      0,
      TILE_SIZE,
      color(240, 0, 0),
      RED_WALKER_SPEED
    );
    redWalkers.push(redWalker);
  }
}

function setWalkers() {
  setGreyWalkers();
  setWhiteWalkers();
  setRedWalkers();
}

function displayObstacles() {
  for (let obstacle of obstacles) {
    obstacle.show();
  }
}

function displayWalkers() {
  walkers = greyWalkers.concat(whiteWalkers);
  walkers = walkers.concat(redWalkers);
  for (let walker of walkers) {
    walker.show();
    walker.update();
  }
}

function resetGame() {
  game_over = false;
  snake.reset();
  food.changeLocation();
  stats.reset();
  setApple();
  setObstacles();
  setBombs();
  setWalkers();
  loop();
}

function gameOver() {
  displayGameOver();
  game_over = true;
  noLoop();
}

function levelCompleted() {
  displayLevelCompleted();
  isLevelCompleted = true;
  noLoop();
}

function displayLevelCompleted() {
  let msg_x = SCREEN_WIDTH / 2 - 100;
  let msg_y = SCREEN_HEIGHT / 2;
  let msg = "Level completed. Press ENTER for level " + (currLevelIndex + 2);
  displayMessage(msg, msg_x, msg_y, color(0, 255, 0), 24);
}

function displayMessage(msg, x, y, col, font_size) {
  fill(col);
  textSize(font_size);
  text(msg, x, y);
}

function displayGameOver() {
  let msg_x = SCREEN_WIDTH / 2 - 100;
  let msg_y = SCREEN_HEIGHT / 2;
  let msg = "Game over. Press SPACE to restart game";
  displayMessage(msg, msg_x, msg_y, color(255, 0, 0), 24);
}

function displayPause() {
  let msg_x = SCREEN_WIDTH / 2 - 100;
  let msg_y = SCREEN_HEIGHT / 2;
  let msg = "Game is Paused. Press ESC to resume";
  displayMessage(msg, msg_x, msg_y, color(255), 24);
}

function drawFrame() {
  fill(150);
  rect(FRAME_X, FRAME_Y, FRAME_WIDTH, FRAME_HEIGHT);
}

function pauseGame() {
  gameIsPaused = true;
  displayPause();
  noLoop();
}

function resumeGame() {
  gameIsPaused = false;
  loop();
}

function pauseResumeGame() {
  if (gameIsPaused) {
    resumeGame();
  } else {
    pauseGame();
  }
}

function setNextLevel() {
  stats.nextLevel();
  setObstacles();
  setBombs();
  setGreyWalkers();
  setWalkers();
  setApple();
  loop();
}

function checkObstacleCollision() {
  if (snake.isTransparent) {
    return;
  }
  for (let obstacle of obstacles) {
    if (snake.collideHead(obstacle)) {
      gameOver();
      return;
    }
  }
}

function checkBombCollision() {
  if (snake.isUnharmfull) {
    return;
  }
  for (let deployedBomb of deployedBombs) {
    if (snake.collide(deployedBomb)) {
      gameOver();
      return;
    }
  }
}

function checkWalkerCollision() {
  if (snake.isUnharmfull) {
    return;
  }
  for (let walker of walkers) {
    if (snake.collide(walker)) {
      gameOver();
      return;
    }
  }
}

function deployBomb() {
  if (bombs.length > 0) {
    let bomb = bombs.pop();
    deployedBombs.push(bomb);
  }
}

function updateDeployedBombs() {
  for (let i = deployedBombs.length - 1; i >= 0; i--) {
    deployedBombs[i].show();
    deployedBombs[i].update();
    if (deployedBombs[i].toDelete) {
      deployedBombs.splice(i, 1);
    }
  }
}

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT + STATS_HEIGHT);
  background(30);
  frameRate(fps);
  set_levels();
  setStats();
  setSnake();
  setFood();
  setApple();
  setObstacles();
  setBombs();
  setWalkers();
}

function draw() {
  background(60);
  drawFrame();
  stats.show();
  snake.update();
  snake.show();
  food.show();
  if (apple != null) {
    apple.show();
  }
  displayObstacles();
  if (frameCount % (fps * bomb_interval) == 0) {
    deployBomb();
  }
  updateDeployedBombs();
  displayWalkers();

  if (snake.eat(food)) {
    stats.increaseScore(EAT_PTS);
    if (stats.score >= levels[currLevelIndex].pts_to_reach) {
      levelCompleted();
    }
    snake.lengthen();
    food.changeLocation();
  }

  if (apple != null && snake.eat(apple)) {
    if (apple instanceof GreyApple) {
      snake.changeColor(color(80));
      snake.setWallak(true);
      affectTime = 0;
    } else if (apple instanceof WhiteApple) {
      snake.changeColor(color(255));
      snake.setTransparent(true);
      affectTime = 0;
    }
    if (apple instanceof PurpleApple) {
      snake.changeColor(color(240, 130, 240));
      snake.setUnharmfull(true);
      affectTime = 0;
    }
    apple = null;
  }

  if (!snake.isWallak && snake.checkSelfCollision()) {
    gameOver();
  }

  if (!snake.isWallak && !snake.isInFrame()) {
    gameOver();
  }

  checkObstacleCollision();
  checkBombCollision();
  checkWalkerCollision();

  if (snake.hasPower() && frameCount % (fps * 1) == 0) {
    stats.affectTime--;
    if (stats.affectTime == 0) {
      snake.setNormal();
      stats.affectTime = AFFECT_TIME;
      setApple();
    }
  }
}

function keyPressed() {
  if (!game_over && key == "B") {
    deployBomb();
    console.log("bomb deployed");
  }
  if (game_over && key == " ") {
    resetGame();
  }
  if (key == "S") {
    snake.stop();
  }
  if (!game_over && isLevelCompleted && keyCode == ENTER) {
    setNextLevel();
  }
  if (!game_over && keyCode === ESCAPE) {
    pauseResumeGame();
  }
  if (keyCode === RIGHT_ARROW && snake.direction() != "L") {
    snake.goRight();
  } else if (keyCode === LEFT_ARROW && snake.direction() != "R") {
    snake.goLeft();
  } else if (keyCode === UP_ARROW && snake.direction() != "D") {
    snake.goUp();
  } else if (keyCode === DOWN_ARROW && snake.direction() != "U") {
    snake.goDown();
  }
}

function mousePressed() {
  if (
    (snake.direction() == "U" || snake.direction() == "D") &&
    mouseX > snake.getX()
  ) {
    snake.goRight();
    return;
  }
  if (
    (snake.direction() == "U" || snake.direction() == "D") &&
    mouseX < snake.getX()
  ) {
    snake.goLeft();
    return;
  }
  if (
    (snake.direction() != "L" || snake.direction() != "R") &&
    mouseY < snake.getY()
  ) {
    snake.goUp();
    return;
  }
  if (
    (snake.direction() != "L" || snake.direction() != "R") &&
    mouseY > snake.getY()
  ) {
    snake.goDown();
  }
}
