class Stats{
  constructor(x, y, w, h, lives, level){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.score = 0;
    this.total_score = 0;
    this.lives = lives;
    this.livesLeft = lives;
    this.affectTime = AFFECT_TIME;
    this.level = level;
  }

  reset(){
    this.score = 0;
    this.lives = LIVES;
    this.level = levels[LEVEL_START_NUM];
    this.affectTime = AFFECT_TIME;
  }

  increaseScore(amount){
    this.score += amount;
  }

  decreaseLives(){
    this.livesLeft -= 1;
  }

  nextLevel(){
    this.total_score += this.score;
    this.score = 0;
    currLevelIndex++;
    this.level = levels[currLevelIndex];
  }

  show(){
    fill(255, 0, 0);
    // rect(this.x, this.y, this.width, this.height);
    textSize(24);
    fill(0, 102, 153);
    text(`Total: ${this.total_score}\t\tScore: ${this.score}\t\tLevel: ${this.level.num}\t\tPTS to reach: ${this.level.pts_to_reach}\t\tPower Time: ${this.affectTime}`, this.x, this.y);
  }
}
