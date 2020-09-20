class Stats {
  constructor(x, y, w, h, lives, level) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.score = 0;
    this.total_score = 0;
    this.lives = lives;
    this.affectTime = AFFECT_TIME;
    this.level = level;
  }

  reset() {
    this.score = 0;
    this.lives = MAX_LIVES;
    this.level = levels[LEVEL_START_NUM];
    this.affectTime = AFFECT_TIME;
  }

  GetLives() {
    return this.lives;
  }

  increaseScore(amount) {
    this.score += amount;
  }

  DecrementLives() {
    this.lives--;
  }

  IncrementLives() {
    this.lives++;
  }

  nextLevel() {
    this.total_score += this.score;
    this.score = 0;
    currLevelIndex++;
    this.level = levels[currLevelIndex];
  }

  show() {
    fill(50, 50, 50);
    // rect(this.x, this.y - this.height * 0.5, this.width, this.height);
    textSize(24);
    fill(0, 102, 153);
    text(
      `Total: ${this.total_score}\t\tScore: ${this.score}\t\tLevel: ${this.level.num}\t\tPTS to reach: ${this.level.pts_to_reach}\t\tPower Time: ${this.affectTime}\t\tLives: ${this.lives}`,
      this.x,
      this.y
    );
  }
}
