import Entity from '../entity'
import { COLUMNS_FOR_LUCKY_BEAST, DIRECTIONS } from '../constants'

const WIDTH = 100
const HEIGHT = 100
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
    
    /*
    c2d.fillStyle = '#48c'
    c2d.beginPath()
    c2d.rect(X_COORDS[this.col], Y_COORDS, WIDTH, HEIGHT)
    c2d.closePath()
    c2d.fill()
    */
    
    const srcSizeX = WIDTH * 2, srcSizeY = HEIGHT * 2  // Lucky Beast sprite is 200x200
    const srcX = (this.direction === DIRECTIONS.EAST) ? srcSizeX : 0
    const srcY = 0
    const tgtSizeX = WIDTH, tgtSizeY = WIDTH
    const tgtX = X_COORDS[this.col]
    const tgtY = Y_COORDS
    
    c2d.drawImage(animationSpritesheet.img, srcX, srcY, srcSizeX, srcSizeY, tgtX, tgtY, tgtSizeX, tgtSizeY)
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
}
  
export default LuckyBeast