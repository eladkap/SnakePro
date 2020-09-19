class Obstacle{
  constructor(x, y, w, col){
    this.pos = createVector(x, y);
    this.w = w;
    this.col = col;
  }

  show(){
    noStroke();
    fill(this.col);
    rect(this.pos.x, this.pos.y, this.w, this.w);
  }

  changeLocation(){
    this.pos.x = FRAME_X + int(random(0, FRAME_COLS)) * TILE_SIZE;
    this.pos.y = FRAME_Y + int(random(0, FRAME_ROWS)) * TILE_SIZE;
  }
}
