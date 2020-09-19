class Level {
  constructor(
    num,
    pts_to_reach,
    obstacles_num,
    bombs_num,
    grey_walkers_num,
    white_walkers_num,
    red_walkers_num,
    allow_grey,
    allow_white,
    allow_purple
  ) {
    this.num = int(num);
    this.pts_to_reach = int(pts_to_reach);
    this.obstacles_num = int(obstacles_num);
    this.bombs_num = int(bombs_num);
    this.grey_walkers_num = int(grey_walkers_num);
    this.white_walkers_num = int(white_walkers_num);
    this.red_walkers_num = int(red_walkers_num);
    this.allow_grey = allow_grey == "1";
    this.allow_white = allow_white == "1";
    this.allow_purple = allow_purple == "1";
  }
}
