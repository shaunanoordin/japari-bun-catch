import Entity from '../entity'
import { COLUMNS_FOR_BUNS, ROWS_FOR_BUNS, LUCKY_BEAST_ROW, FAILURE_ROW } from '../constants'

const WIDTH = 50
const HEIGHT = 50
const Y_COORDS = [
  75, 125, 175
]
const X_COORDS = [
  125, 225, 325, 425, 525
]

class Bun extends Entity {
  constructor (app, col) {
    super(app)

    this.row = 0
    this.col = col
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
    const c2d = this._app.canvas2d
    
    c2d.fillStyle = '#48c'
    c2d.beginPath()
    c2d.rect(X_COORDS[this.col], Y_COORDS[this.row], WIDTH, HEIGHT)
    c2d.closePath()
    c2d.fill()
  }
}
  
export default Bun