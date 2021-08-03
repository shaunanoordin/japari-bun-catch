export const TILE_SIZE = 50
export const APP_WIDTH = 800
export const APP_HEIGHT = 500

export const DIRECTIONS = {
  EAST: 0,
  SOUTH: 1,
  WEST: 2,
  NORTH: 3,
}

export const FONT_FAMILY = 'DotGothic16, monospace'

export const SCORE_PER_BUN = 100
export const TIME_BETWEEN_BUNS = 1500
export const COLUMNS_FOR_BUNS = 5
export const ROWS_FOR_BUNS = 5
export const COLUMNS_FOR_LUCKY_BEAST = 6

export const LUCKY_BEAST_ROW = 3  // 4th row, where Lucky Beast can catch falling buns.
export const FAILURE_ROW = 4  // 5th row, where uncaught buns splat on the ground.
export const DELIVERY_COL = COLUMNS_FOR_LUCKY_BEAST - 1  // Column where Lucky Beast delivers the buns to a friend.

export const MIN_BUNS_FOR_FRIEND_TO_APPEAR = 3
export const MAX_BUNS_LUCKY_BEAST_CAN_CARRY = 6

export const STARTING_LIVES = 3

export const MINIMUM_PAUSE_DURATION = 1000

/*
While the engine is technically able to support any given framerate (determined
by the hardware), a baseline is required to ground our video game logic to.
e.g. we can say that we expect an object with "movement speed" of "2" to travel
120 pixels in 1 second. (2 pixels per frame * 60 frames per second)
 */
export const EXPECTED_FRAMES_PER_SECOND = 60
export const EXPECTED_TIMESTEP = 1000 / EXPECTED_FRAMES_PER_SECOND
