class GreyWalker extends Walker {
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
    this.setRandomDirection();
    // this.checkEdges();
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

  // checkEdges(){
  //   if (this.pos.x < FRAME_X){
  //     this.stop();
  //   }
  //   if (this.pos.x > FRAME_X + FRAME_WIDTH - this.w){
  //     this.stop();
  //   }
  //   if (this.pos.y < FRAME_Y){
  //     this.stop();
  //   }
  //   if (this.pos.y > FRAME_Y + FRAME_HEIGHT - this.w){
  //     this.stop();
  //   }
  // }

  setRandomDirection() {
    // if (this.pos.y < FRAME_Y + FRAME_HEIGHT - this.w){
    //   this.goDown();
    // }
    // else{
    //   this.stop();
    // }
    // return;
    var d = 0;
    if (frameCount % (fps * grey_walker_change_direction_interval) == 0) {
      d = int(random(4));
      if (d == 0 && this.pos.x < FRAME_X + FRAME_WIDTH - this.w) {
        this.goRight();
      } else if (d == 1 && this.pos.x > FRAME_X) {
        this.goLeft();
      } else if (d == 2 && this.pos.y > FRAME_Y) {
        this.goUp();
      } else if (this.pos.y < FRAME_Y + FRAME_HEIGHT - this.w) {
        this.goDown();
      } else {
        this.stop();
      }
    }
  }

  // setRandomLocation(){
  //   this.pos.x = FRAME_X + int(random(0, FRAME_COLS)) * TILE_SIZE;
  //   this.pos.y = FRAME_Y + int(random(0, FRAME_ROWS)) * TILE_SIZE;
  // }
}
