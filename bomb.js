class Bomb{
  constructor(x, y, w, col, speed){
    this.pos = createVector(x, y);
    this.w = w;
    this.col = col;
    this.velocity = createVector(0, speed);
    this.setRandomLocation();
    this.toDelete = false;
  }

  show(){
    noStroke();
    fill(this.col);
    rect(this.pos.x, this.pos.y, this.w, this.w);
  }

  update(){
    this.pos.add(this.velocity);
    if (this.pos.y > FRAME_Y + FRAME_HEIGHT){
      this.toDelete = true;
    }
  }

  setRandomLocation(){
    this.pos.x = FRAME_X + int(random(0, FRAME_COLS)) * TILE_SIZE;
    this.pos.y = FRAME_Y;
  }
}
