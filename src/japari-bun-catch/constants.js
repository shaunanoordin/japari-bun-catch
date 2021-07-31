export const TILE_SIZE = 50
export const APP_WIDTH = 800
export const APP_HEIGHT = 500

export const PLAYER_ACTIONS = {
  IDLE: 'idle',  // Player isn't doing anything
  POINTER_DOWN: 'pointer down',  // Player is actively interacting with the canvas.
}

/*
While the engine is technically able to support any given framerate (determined
by the hardware), a baseline is required to ground our video game logic to.
e.g. we can say that we expect an object with "movement speed" of "2" to travel
120 pixels in 1 second. (2 pixels per frame * 60 frames per second)
 */
export const EXPECTED_FRAMES_PER_SECOND = 60
export const EXPECTED_TIMESTEP = 1000 / EXPECTED_FRAMES_PER_SECOND
