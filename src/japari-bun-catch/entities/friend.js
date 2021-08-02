import Entity from '../entity'
import { MIN_BUNS_FOR_FRIEND_TO_APPEAR, DELIVERY_COL } from '../constants'
import { fillTextWithShadow } from '../utility'

const SRC_SIZE_X = 400
const SRC_SIZE_Y = 400
const TGT_SIZE_X = 150
const TGT_SIZE_Y = 150
const X_COORDS = 650
const Y_COORDS = 200

const SCORE_DISPLAY_DURATION = 3000

class Friend extends Entity {
  constructor (app, col) {
    super(app)
    
    this.scoreDisplayTimer = 0
    this.scoreDisplayText = ''
  }
  
  /*
  Section: General Logic
  ----------------------------------------------------------------------------
   */
  
  play (timeStep) {
    const app = this._app
    const luckyBeast = this._app.luckyBeast
    
    this.scoreDisplayTimer = Math.max(0, this.scoreDisplayTimer - timeStep)
    
    // Friend only appears to receive buns when LB has at least 3 buns.
    if (!luckyBeast) return
    if (luckyBeast.buns >= MIN_BUNS_FOR_FRIEND_TO_APPEAR
        && luckyBeast.col === DELIVERY_COL) {
      this.scoreDisplayTimer = SCORE_DISPLAY_DURATION
      const score = luckyBeast.giveBuns()
      this.scoreDisplayText = score
    }
  }
  
  paint (layer = 0) {
    const c2d = this._app.canvas2d
    const luckyBeast = this._app.luckyBeast
    const animationSpritesheet = app.assets.friends
    if (!animationSpritesheet) return
    
    if (layer === 0) {
      if (luckyBeast.buns >= MIN_BUNS_FOR_FRIEND_TO_APPEAR) {
        const srcX = 0
        const srcY = 0
        const tgtX = X_COORDS
        const tgtY = Y_COORDS

        c2d.drawImage(animationSpritesheet.img, srcX, srcY, SRC_SIZE_X, SRC_SIZE_Y, tgtX, tgtY, TGT_SIZE_X, TGT_SIZE_Y)
      }
    } else if (layer === 1) {
      if (this.scoreDisplayTimer > 0) {
        const OFFSET_1 = -50
        const OFFSET_2 = -15
        const OFFSET_3 = 5
        c2d.textAlign = 'center'
        c2d.textBaseline = 'bottom'
        c2d.font = '1em monospace'
        fillTextWithShadow(c2d, 'すごい〜！', X_COORDS + TGT_SIZE_X / 2, Y_COORDS + OFFSET_1)
        c2d.font = '2em monospace'
        fillTextWithShadow(c2d, '+' + this.scoreDisplayText, X_COORDS + TGT_SIZE_X / 2, Y_COORDS + OFFSET_2)
        c2d.font = '1em monospace'
        c2d.fillText('+⭐', X_COORDS + TGT_SIZE_X / 2, Y_COORDS + OFFSET_3)
      }
    }
  }
}
  
export default Friend