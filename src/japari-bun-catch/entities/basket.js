import Entity from '../entity'
import { MAX_BUNS_LUCKY_BEAST_CAN_CARRY, FONT_FAMILY } from '../constants'
import { fillTextWithShadow } from '../utility'

const SRC_SIZE_X = 200
const SRC_SIZE_Y = 150
const TGT_SIZE_X = 100
const TGT_SIZE_Y = 75
const Y_COORDS = 260
const X_COORDS = [
  100, 200, 300, 400, 500, 600
]

class Basket extends Entity {
  constructor (app, luckyBeast) {
    super(app)
    this.luckyBeast = luckyBeast
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
    const animationSpritesheet = app.assets.basket
    if (!animationSpritesheet) return
    
    if (this._expired) return
    
    const srcX = 0
    const srcY = SRC_SIZE_Y * this.luckyBeast.buns
    const tgtX = X_COORDS[this.luckyBeast.col]
    const tgtY = Y_COORDS
    
    c2d.drawImage(animationSpritesheet.img, srcX, srcY, SRC_SIZE_X, SRC_SIZE_Y, tgtX, tgtY, TGT_SIZE_X, TGT_SIZE_Y)
    
    if (this.luckyBeast.buns >= MAX_BUNS_LUCKY_BEAST_CAN_CARRY) {
      c2d.textAlign = 'center'
      c2d.textBaseline = 'bottom'
      c2d.font = `1.25em ${FONT_FAMILY}`
      fillTextWithShadow(c2d, 'FULL! いっぱい!', tgtX + TGT_SIZE_X / 2, tgtY, '#ee4444')
    }
  }
}
  
export default Basket