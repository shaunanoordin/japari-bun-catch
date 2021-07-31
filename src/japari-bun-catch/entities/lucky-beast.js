import Entity from '../entity'
import { COLUMNS_FOR_LUCKY_BEAST } from '../constants'

const WIDTH = 100
const HEIGHT = 100
const Y_COORDS = 350
const X_COORDS = [
  50, 150, 250, 350, 450, 550
]

class LuckyBeast extends Entity {
  constructor (app) {
    super(app)
    
    this.col = 0
    this.buns = 0
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
    const app = this._app
    const c2d = this._app.canvas2d
    
    c2d.fillStyle = '#48c'
    c2d.rect(X_COORDS[this.col], Y_COORDS, WIDTH, HEIGHT)
    c2d.fill()
  }
  
  move (direction = 0) {
    this.col += direction
    this.col = Math.max(Math.min(this.col, COLUMNS_FOR_LUCKY_BEAST - 1), 0)
  }
}
  
export default LuckyBeast