class Walker {
  constructor(x, y, w, col, speed) {
    this.pos = createVector(x, y);
    this.w = w;
    this.col = col;
    this.init_speed = speed;
    this.velocity = createVector(0, speed);
    this.setRandomLocation();
    this.toDelete = false;
  }

  show() {
    noStroke();
    fill(this.col);
    rect(this.pos.x, this.pos.y, this.w, this.w);
  }

  // update(){
  //   this.pos.add(this.velocity);
  //   if (this.pos.y > FRAME_Y + FRAME_HEIGHT){
  //     this.toDelete = true;
  //   }
  // }

  goRight() {
    this.velocity = createVector(this.init_speed, 0);
  }

  goLeft() {
    this.velocity = createVector(-this.init_speed, 0);
  }

  goUp() {
    this.velocity = createVector(0, -this.init_speed);
  }

  goDown() {
    this.velocity = createVector(0, this.init_speed);
  }

  stop() {
    this.velocity = createVector(0, 0);
  }

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

  setRandomLocation() {
    this.pos.x = FRAME_X + int(random(0, FRAME_COLS)) * TILE_SIZE;
    this.pos.y = FRAME_Y + int(random(0, FRAME_ROWS)) * TILE_SIZE;
  }
}
