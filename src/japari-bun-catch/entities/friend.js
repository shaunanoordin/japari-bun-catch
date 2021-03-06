import Entity from '../entity'
import { MIN_BUNS_FOR_FRIEND_TO_APPEAR, DELIVERY_COL, FONT_FAMILY } from '../constants'
import { fillTextWithShadow } from '../utility'

const SRC_SIZE_X = 400
const SRC_SIZE_Y = 400
const TGT_SIZE_X = 150
const TGT_SIZE_Y = 150
const X_COORDS = 650
const Y_COORDS = 200

const FRIENDS = [
  {
    name: 'serval',
    srcX: 0,
    srcY: 0,
  },
  {
    name: 'arai-san',
    srcX: SRC_SIZE_X,
    srcY: 0,
    text: 'なのだ〜!',
  },
  {
    name: 'fennec',
    srcX: SRC_SIZE_X * 2,
    srcY: 0,
    text: 'はい、ありがとう〜',
  },
  {
    name: 'white-serval',
    srcX: 0,
    srcY: SRC_SIZE_Y,
  },
  {
    name: 'okapi',
    srcX: SRC_SIZE_X,
    srcY: SRC_SIZE_Y,
  },
]

const SCORE_DISPLAY_DURATION = 3000

class Friend extends Entity {
  constructor (app, col) {
    super(app)
    
    this.selectedFriend = null
    this.friendsText = ''
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
    
    if (!luckyBeast) return
    
    // Spawn a Friend.
    // Friends only appears to receive buns when LB has at least 3 buns.
    if (luckyBeast.buns >= MIN_BUNS_FOR_FRIEND_TO_APPEAR
        && !this.selectedFriend) {
      this.selectedFriend = FRIENDS[Math.floor(Math.random() * FRIENDS.length)]
      this.friendsText = this.selectedFriend.text || 'すごい〜！'
      this.scoreDisplayTimer = 0
      this.scoreDisplayText = ''
    }
    
    if (luckyBeast.buns >= MIN_BUNS_FOR_FRIEND_TO_APPEAR
        && luckyBeast.col === DELIVERY_COL) {
      this.selectedFriend = null
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
        const srcX = (this.selectedFriend) ? this.selectedFriend.srcX : 0
        const srcY = (this.selectedFriend) ? this.selectedFriend.srcY : 0
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
        c2d.font = `1em ${FONT_FAMILY}`
        fillTextWithShadow(c2d, this.friendsText, X_COORDS + TGT_SIZE_X / 2, Y_COORDS + OFFSET_1)
        c2d.font = `2em ${FONT_FAMILY}`
        fillTextWithShadow(c2d, '+' + this.scoreDisplayText, X_COORDS + TGT_SIZE_X / 2, Y_COORDS + OFFSET_2)
        c2d.font = `1em ${FONT_FAMILY}`
        c2d.fillText('+⭐', X_COORDS + TGT_SIZE_X / 2, Y_COORDS + OFFSET_3)
      }
    }
  }
}
  
export default Friend