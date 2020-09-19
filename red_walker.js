class RedWalker extends Walker {
  constructor(x, y, w, col, speed) {
    super(x, y, w, col, speed);
    // this.pos = createVector(x, y);
    // this.w = w;
    // this.col = col;
    // this.velocity = createVector(0, speed);
    // this.setRandomLocation();
    // this.toDelete = false;
  }

  update() {
    this.pos.add(this.velocity);
    this.setDirectionTowardSnake();
    this.checkEdges();
  }

  checkEdges() {
    if (this.pos.x < FRAME_X) {
      this.pos.x = FRAME_X + FRAME_WIDTH;
    }
    if (this.pos.x > FRAME_X + FRAME_WIDTH - this.w) {
      this.pos.x = FRAME_X;
    }
    if (this.pos.y < FRAME_Y) {
      this.pos.y = FRAME_Y + FRAME_HEIGHT;
    }
    if (this.pos.y > FRAME_Y + FRAME_HEIGHT - this.w) {
      this.pos.y = FRAME_Y;
    }
  }

  setDirectionTowardSnake() {
    if (frameCount % (fps * grey_walker_change_direction_interval) == 0) {
      var vec = createVector(snake.head_pos.x, snake.head_pos.y);
      vec.sub(this.pos.x, this.pos.y);
      this.velocity = vec.copy();
      this.velocity.setMag(RED_WALKER_SPEED);
    }
  }

  // goRight(){
  //   this.velocity = createVector(this.speed, 0);
  // }
  //
  // goLeft(){
  //   this.velocity = createVector(-this.speed, 0);
  // }
  //
  // goUp(){
  //   this.velocity = createVector(0, -this.speed);
  // }
  //
  // goDown(){
  //   this.velocity = createVector(0, this.speed);
  // }
  //
  // stop(){
  //   this.velocity = createVector(0, 0);
  // }

  isInFrame() {
    if (this.pos.x < FRAME_X || this.pos.x > FRAME_X + FRAME_WIDTH - this.w) {
      this.stop();
      return false;
    }
    if (this.pos.y < FRAME_Y || this.pos.y > FRAME_Y + FRAME_HEIGHT - this.w) {
      this.stop();
      return false;
    }
    return true;
  }

  // setRandomLocation(){
  //   this.pos.x = FRAME_X + int(random(0, FRAME_COLS)) * TILE_SIZE;
  //   this.pos.y = FRAME_Y + int(random(0, FRAME_ROWS)) * TILE_SIZE;
  // }
}
