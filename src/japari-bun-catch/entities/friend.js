import Entity from '../entity'
import { MIN_BUNS_FOR_FRIEND_TO_APPEAR, DELIVERY_COL } from '../constants'

const SRC_SIZE_X = 400
const SRC_SIZE_Y = 400
const TGT_SIZE_X = 150
const TGT_SIZE_Y = 150
const X_COORDS = 650
const Y_COORDS = 200

class Bun extends Entity {
  constructor (app, col) {
    super(app)
  }
  
  /*
  Section: General Logic
  ----------------------------------------------------------------------------
   */
  
  play (timeStep) {
    const app = this._app
    const luckyBeast = this._app.luckyBeast
    
    if (!luckyBeast) return
    
    if (luckyBeast.buns < MIN_BUNS_FOR_FRIEND_TO_APPEAR) return
    
    if (luckyBeast.col === DELIVERY_COL) {
      luckyBeast.giveBuns()
    }
  }
  
  paint (layer = 0) {
    const c2d = this._app.canvas2d
    const luckyBeast = this._app.luckyBeast
    const animationSpritesheet = app.assets.friends
    if (!animationSpritesheet) return
    
    if (layer !== 0) return
    if (luckyBeast.buns < MIN_BUNS_FOR_FRIEND_TO_APPEAR) return
    
    const srcX = 0
    const srcY = 0
    const tgtX = X_COORDS
    const tgtY = Y_COORDS
    
    c2d.drawImage(animationSpritesheet.img, srcX, srcY, SRC_SIZE_X, SRC_SIZE_Y, tgtX, tgtY, TGT_SIZE_X, TGT_SIZE_Y)
  }
}
  
export default Bun