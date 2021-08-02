import Entity from '../entity'
import { EXPECTED_TIMESTEP, COLUMNS_FOR_BUNS, ROWS_FOR_BUNS, LUCKY_BEAST_ROW, FAILURE_ROW } from '../constants'

const SRC_SIZE_X = 100
const SRC_SIZE_Y = 100
const TGT_SIZE_X = 50
const TGT_SIZE_Y = 50
const Y_COORDS = [
  25, 125, 225, 325, 425
]
const X_COORDS = [
  125, 225, 325, 425, 525
]

const BASE_DROP_SPEED = 1.5
const DROP_TIMER_MAX = 60
const DIFFICULTY_MODIFIER = 0.5

class Bun extends Entity {
  constructor (app, col, difficulty = 0) {
    super(app)

    this.row = 0
    this.col = col
    this.buns = 0
    
    this.dropSpeed = BASE_DROP_SPEED + difficulty * DIFFICULTY_MODIFIER
    this.dropTimer = 0
  }
  
  /*
  Section: General Logic
  ----------------------------------------------------------------------------
   */
  
  play (timeStep) {
    const app = this._app
    super.play(timeStep)
    
    const luckyBeast = app.luckyBeast
    if (!luckyBeast) return
    
    if (this._expired) return
    
    if (this.row === LUCKY_BEAST_ROW
        && this.col === luckyBeast.col
        && luckyBeast.canTakeBun()
    ) {
      luckyBeast.takeBun()
      this._expired = true
      return
    }
    
    this.dropTimer += this.dropSpeed * timeStep / EXPECTED_TIMESTEP
    if (this.dropTimer >= DROP_TIMER_MAX) {
      this.dropTimer -= DROP_TIMER_MAX
      
      this.row += 1
      
      if (this.row > FAILURE_ROW) {
        app.stopGame()
        this._expired = true  
      }
    }
  }
  
  paint (layer = 0) {
    const c2d = this._app.canvas2d
    const animationSpritesheet = app.assets.bun
    if (!animationSpritesheet) return
    
    if (layer !== 0) return
    if (this._expired) return
    
    const srcX = 0
    const srcY = (this.row >= FAILURE_ROW) ? SRC_SIZE_X : 0  // If at the failure row, show the "splatted" bun
    const tgtX = X_COORDS[this.col]
    const tgtY = Y_COORDS[this.row]
    
    c2d.drawImage(animationSpritesheet.img, srcX, srcY, SRC_SIZE_X, SRC_SIZE_Y, tgtX, tgtY, TGT_SIZE_X, TGT_SIZE_Y)
  }
}
  
export default Bun