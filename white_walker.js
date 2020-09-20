class WhiteWalker extends Walker {
  constructor(x, y, w, col, speed) {
    super(x, y, w, col, speed);
    // this.pos = createVector(x, y);
    // this.w = w;
    // this.col = col;
    // this.velocity = createVector(0, speed);
    // this.setRandomLocation();
    // this.toDelete = false;
  }

  // show(){
  //   noStroke();
  //   fill(this.col);
  //   rect(this.pos.x, this.pos.y, this.w, this.w);
  // }

  update() {
    this.pos.add(this.velocity);
    this.setDirectionTowardSnake();
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
      var diff_x = abs(this.pos.x - snake.head_pos.x);
      var diff_y = abs(this.pos.y - snake.head_pos.y);

      // white walker is one-tile from snake
      if (diff_x == TILE_SIZE) {
        if (this.pos.x < snake.head_pos.x) {
          this.goRight();
        } else {
          this.goLeft();
        }
      } else if (diff_y == TILE_SIZE) {
        if (this.pos.y < snake.head_pos.y) {
          this.goDown();
        } else {
          this.goUp();
        }
      }

      // white walker is left-up from the snake
      if (this.pos.x < snake.head_pos.x && this.pos.y < snake.head_pos.y) {
        if (diff_x < diff_y) {
          this.goDown();
        } else {
          this.goRight();
        }
      }
      // white walker is left-down from the snake
      if (this.pos.x < snake.head_pos.x && this.pos.y > snake.head_pos.y) {
        if (diff_x < diff_y) {
          this.goUp();
        } else {
          this.goRight();
        }
      }
      // white walker is right-up from the snake
      if (this.pos.x > snake.head_pos.x && this.pos.y < snake.head_pos.y) {
        if (diff_x < diff_y) {
          this.goDown();
        } else {
          this.goLeft();
        }
      }
      // white walker is right-down the snake
      if (this.pos.x > snake.head_pos.x && this.pos.y > snake.head_pos.y) {
        if (diff_x < diff_y) {
          this.goUp();
        } else {
          this.goLeft();
        }
      }
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
