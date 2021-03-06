import Entity from '../entity'
import Basket from './basket'
import { COLUMNS_FOR_LUCKY_BEAST, DIRECTIONS, MAX_BUNS_LUCKY_BEAST_CAN_CARRY, SCORE_PER_BUN } from '../constants'

const SRC_SIZE_X = 200
const SRC_SIZE_Y = 200
const TGT_SIZE_X = 100
const TGT_SIZE_Y = 100
const Y_COORDS = 300
const X_COORDS = [
  100, 200, 300, 400, 500, 600
]

class LuckyBeast extends Entity {
  constructor (app) {
    super(app)
    
    this.direction = DIRECTIONS.EAST
    this.col = 0
    this.buns = 0
    this.basket = new Basket(app, this)
  }
  
  /*
  Section: General Logic
  ----------------------------------------------------------------------------
   */
  
  play (timeStep) {
    const app = this._app
    super.play(timeStep)
  }
  
  paint (layer = 0) {
    const c2d = this._app.canvas2d
    const animationSpritesheet = app.assets.luckyBeast
    if (!animationSpritesheet) return
    
    if (layer !== 1) return
    
    const srcX = (this.direction === DIRECTIONS.EAST) ? SRC_SIZE_X : 0
    const srcY = 0
    const tgtX = X_COORDS[this.col]
    const tgtY = Y_COORDS
    
    c2d.drawImage(animationSpritesheet.img, srcX, srcY, SRC_SIZE_X, SRC_SIZE_Y, tgtX, tgtY, TGT_SIZE_X, TGT_SIZE_Y)
    
    this.basket.paint(layer)
  }
  
  move (direction) {
    switch (direction) {
      case DIRECTIONS.EAST:
        this.col += 1
        this.direction = DIRECTIONS.EAST
        break
      case DIRECTIONS.WEST:
        this.col -= 1
        this.direction = DIRECTIONS.WEST
        break
    }
    
    this.col = Math.max(Math.min(this.col, COLUMNS_FOR_LUCKY_BEAST - 1), 0)
  }
  
  canTakeBun () {
    return this.buns < MAX_BUNS_LUCKY_BEAST_CAN_CARRY
  }
  
  takeBun () {
    this.buns++
  }
  
  giveBuns () {
    const score = this.buns * SCORE_PER_BUN
    this._app.increaseScore(score)
    this._app.increaseDifficulty()
    this.buns = 0
    return score
  }
}
  
export default LuckyBeast