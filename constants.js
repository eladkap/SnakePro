const SCREEN_WIDTH = 1000;
const SCREEN_HEIGHT = 800;

const TILE_SIZE = 20;

const FRAME_X = 100;
const FRAME_Y = 100;

const FRAME_ROWS = 30;
const FRAME_COLS = 30;

const FRAME_WIDTH = FRAME_ROWS * TILE_SIZE;
const FRAME_HEIGHT = FRAME_COLS * TILE_SIZE;

var fps = 10;

var bomb_interval = 5; // sec
var grey_walker_change_direction_interval = 0.2; // sec
var white_walker_change_direction_interval = 1; // sec

const SNAKE_WIDTH = TILE_SIZE;
const SNAKE_SPEED = 1 * TILE_SIZE;
const SNAKE_INIT_LENGTH = 1;

const FOOD_WIDTH = TILE_SIZE;

const BOMB_SPEED = 8;

const EAT_PTS = 10;

const WHITE_WALKER_SPEED = 10;
const RED_WALKER_SPEED = 10;

const STATS_HEIGHT = 100;
const LIVES = 3;
const AFFECT_TIME = 7;

const LEVEL_FILE_PATH = "levels/levels.txt";

const LEVEL_START_NUM = 0;
