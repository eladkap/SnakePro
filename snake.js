class Snake{
  constructor(x, y, w, speed, col){
    this.head_pos = createVector(x, y);
    this.w = w;
    this.initTail();
    this.speed = speed;
    this.velocity = createVector(0, 0);
    this.col = col;
    this.life = 100;
    this.isWallak = false;
    this.isTransparent = false;
    this.isUnharmfull = false;
  }

  initTail(){
    this.tail = [];
    for (let i = 0; i < SNAKE_INIT_LENGTH - 1; i++){
      this.tail.push(createVector(0, 0));
    }
  }

  reset(){
    this.initTail();
    let snake_x = FRAME_X + int(random(0, FRAME_COLS)) * TILE_SIZE;
    let snake_y = FRAME_Y + int(random(0, FRAME_ROWS)) * TILE_SIZE;
    this.head_pos = createVector(snake_x, snake_y);
    this.stop();
  }

  goRight(){
    this.velocity = createVector(this.speed, 0);
  }

  goLeft(){
    this.velocity = createVector(-this.speed, 0);
  }

  goUp(){
    this.velocity = createVector(0, -this.speed);
  }

  goDown(){
    this.velocity = createVector(0, this.speed);
  }

  stop(){
    this.velocity = createVector(0, 0);
  }

  direction(){
    if (this.velocity.x > 0){
      return 'R';
    }
    if (this.velocity.x < 0){
      return 'L';
    }
    if (this.velocity.y > 0){
      return 'D';
    }
    return 'U';
  }

  isInFrame(){
    if (this.head_pos.x < FRAME_X || this.head_pos.x > FRAME_X + FRAME_WIDTH - this.w){
      this.stop();
      return false;
    }
    if (this.head_pos.y < FRAME_Y || this.head_pos.y > FRAME_Y + FRAME_HEIGHT - this.w){
      this.stop();
      return false;
    }
    return true;
  }

  goThroughWall(){
    if (this.isWallak){
      if (this.head_pos.x < FRAME_X){
        this.head_pos.x = FRAME_X + FRAME_WIDTH;
      }
      if (this.head_pos.y < FRAME_Y){
        this.head_pos.y = FRAME_Y + FRAME_HEIGHT;
      }
      if (this.head_pos.x > FRAME_X + FRAME_WIDTH - this.w){
        this.head_pos.x = FRAME_X - TILE_SIZE;
      }
      if (this.head_pos.y > FRAME_Y + FRAME_HEIGHT - this.w){
        this.head_pos.y = FRAME_Y - TILE_SIZE;
      }
    }
  }

  show(){
    noStroke();
    fill(this.col);
    rect(this.head_pos.x, this.head_pos.y, this.w, this.w);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x , this.tail[i].y, this.w, this.w);
    }
  }

  update(){
    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.tail.length > 0){
      this.tail[this.tail.length - 1] = createVector(this.head_pos.x, this.head_pos.y);
    }
    this.goThroughWall();
    this.head_pos.add(this.velocity);
  }

  eat(food){
    var d = dist(this.head_pos.x, this.head_pos.y, food.pos.x, food.pos.y);
    return d < 1;
  }

  lengthen(){
    this.tail.push(createVector(this.head_pos.x, this.head_pos.y));
  }

  checkSelfCollision(){
    for (var i = 0; i < this.tail.length - 1; i++) {
      var pos = this.tail[i];
      var d = dist(this.head_pos.x, this.head_pos.y, pos.x, pos.y);
      if (d < 1){
        return true;
      }
    }
    return false;
  }

  collideHead(entity){
    var d = dist(this.head_pos.x + this.w / 2, this.head_pos.y + this.w / 2, entity.pos.x + entity.w / 2, entity.pos.y + entity.w / 2);
    return d < this.w;
  }

  collideTail(entity){
    for (var i = 0; i < this.tail.length; i++) {
      var d = dist(this.tail[i].x + this.w / 2, this.tail[i].y + this.w / 2, entity.pos.x + entity.w / 2, entity.pos.y + entity.w / 2);
      if (d < this.w){
        return true;
      }
    }
    return false;
  }

  collide(entity){
    return this.collideHead(entity) || this.collideTail(entity);
  }

  changeColor(col){
    this.col = col;
  }

  setWallak(value){
    this.isWallak = value;
  }

  setTransparent(value){
    this.isTransparent = value;
  }

  setUnharmfull(value){
    this.isUnharmfull = value;
  }

  hasPower(){
    return this.isWallak || this.isTransparent || this.isUnharmfull;
  }

  setNormal(){
    this.isWallak = false;
    this.isTransparent = false;
    this.isUnharmfull = false;
    this.changeColor(color(0, 0, 255));
  }
}
