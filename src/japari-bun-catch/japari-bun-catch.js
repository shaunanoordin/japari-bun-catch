import {
  APP_WIDTH, APP_HEIGHT, TILE_SIZE, DIRECTIONS,
  TIME_BETWEEN_BUNS, ROWS_FOR_BUNS, COLUMNS_FOR_BUNS,
  STARTING_LIVES, MINIMUM_PAUSE_DURATION,
} from './constants'
import { fillTextWithShadow } from './utility'
import ImageAsset from './image-asset'
import LuckyBeast from './entities/lucky-beast'
import Friend from './entities/friend'
import Bun from './entities/bun'

const searchParams = new URLSearchParams(window.location.search)
const DEBUG = searchParams.get('debug') || false

class JapariBunCatch {
  constructor () {
    this.html = {
      main: document.getElementById('main'),
      canvas: document.getElementById('canvas'),
      menu: document.getElementById('menu'),
      buttonHome: document.getElementById('button-home'),
      buttonReload: document.getElementById('button-reload'),
      buttonLeft: document.getElementById('button-left'),
      buttonRight: document.getElementById('button-right'),
    }
    
    this.canvas2d = this.html.canvas.getContext('2d')
    this.canvasWidth = APP_WIDTH
    this.canvasHeight = APP_HEIGHT
    
    this.menu = false
    this.setMenu(false)
    this.setupUI()
    
    this.initialised = false
    this.assets = {
      background: new ImageAsset('assets/background.jpg'),
      basket: new ImageAsset('assets/basket.png'),
      bun: new ImageAsset('assets/bun.png'),
      friends: new ImageAsset('assets/friends.png'),
      luckyBeast: new ImageAsset('assets/lucky-beast.png'),
    }
    
    this.luckyBeast = null
    this.friend = null
    this.entities = []
    
    this.lives = 0
    this.score = 0
    this.difficulty = 0
    this.timeToNextBun = 0
    this.paused = false  // Game is paused when a bun drops to the floor. Pausing due to the menu being open is dictated by this.menu
    this.pauseTimer = 0  // When the game is paused, it stays paused for a short amount of time.
    
    this.prevTime = null
    this.nextFrame = window.requestAnimationFrame(this.main.bind(this))
  }
  
  initialisationCheck () {
    // Assets check
    let allAssetsLoaded = true
    let numLoadedAssets = 0
    let numTotalAssets = 0
    Object.keys(this.assets).forEach((id) => {
      const asset = this.assets[id]
      allAssetsLoaded = allAssetsLoaded && asset.loaded
      if (asset.loaded) numLoadedAssets++
      numTotalAssets++
    })
    
    // Paint status
    this.canvas2d.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.canvas2d.textAlign = 'start'
    this.canvas2d.textBaseline = 'top'
    this.canvas2d.fillStyle = '#ccc'
    this.canvas2d.font = `1em monospace`
    this.canvas2d.fillText(`Loading ${numLoadedAssets} / ${numTotalAssets} `, TILE_SIZE, TILE_SIZE)
    
    if (allAssetsLoaded) {
      this.initialised = true
      this.showUI()
      this.startGame()
    }
  }
  
  /*
  Section: General Logic
  ----------------------------------------------------------------------------
   */
  
  main (time) {
    const timeStep = (this.prevTime) ? time - this.prevTime : time
    this.prevTime = time
    
    if (this.initialised) {
      this.play(timeStep)
      this.paint()
    } else {
      this.initialisationCheck()
    }
    
    this.nextFrame = window.requestAnimationFrame(this.main.bind(this))
  }
  
  play (timeStep) {
    // If the menu is open, pause all action gameplay
    if (this.menu) return
    
    // If game is paused (as a result of losing a life), pause all action gameplay, of course
    if (this.paused) {
      this.pauseTimer = Math.max(0, this.pauseTimer - timeStep)
      return
    }
    
    // Run entity logic
    this.entities.forEach(entity => entity.play(timeStep))
    
    // Spawn a new bun
    this.timeToNextBun -= timeStep
    if (this.timeToNextBun <= 0) {
      const DIFFICULTY_MODIFIER = 0.2
      const timeToBun = TIME_BETWEEN_BUNS / (1 + this.difficulty * DIFFICULTY_MODIFIER)
      this.timeToNextBun += timeToBun
      const newCol = Math.floor(Math.random() * COLUMNS_FOR_BUNS)
      const newBun = new Bun(this, newCol, this.difficulty)
      this.entities.push(newBun)
    }
    
    // Cleanup
    this.entities = this.entities.filter(entity => !entity._expired)
  }
  
  paint () {
    const c2d = this.canvas2d
    
    c2d.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    // ----------------
    
    // Draw background
    // ----------------
    if (this.assets.background) {
      const BACKGROUND_SIZE_X = 800
      const BACKGROUND_SIZE_Y = 500
      c2d.drawImage(this.assets.background.img, 0, 0, BACKGROUND_SIZE_X, BACKGROUND_SIZE_Y, 0, 0, APP_WIDTH, APP_HEIGHT)
    }
    // ----------------
    
    // Draw grid
    // ----------------
    /*
    c2d.strokeStyle = 'rgba(128, 128, 128, 0.05)'
    c2d.lineWidth = 2
    const offsetX = 0
    const offsetY = 0
    
    for (let y = offsetY ; y < APP_HEIGHT ; y += TILE_SIZE) {
      for (let x = offsetX ; x < APP_WIDTH ; x += TILE_SIZE) {
        c2d.beginPath()
        c2d.rect(x, y, TILE_SIZE, TILE_SIZE)
        c2d.closePath()
        c2d.stroke()
      }
    }
    */
    // ----------------

    // Draw entities
    // ----------------
    const MAX_LAYER = 2
    for (let layer = 0 ; layer < MAX_LAYER ; layer++) {
      this.entities.forEach(entity => entity.paint(layer))
    }
    // ----------------
    
    // Draw pause overlay (indicating a bun just dropped to the floor)
    // ----------------
    if (this.paused) {
      const PAUSE_OFFSET = 20
      c2d.fillStyle = 'rgba(255, 255, 255, 0.5)'
      c2d.beginPath()
      c2d.rect(0, 0, APP_WIDTH, APP_HEIGHT)
      c2d.closePath()
      c2d.fill()
      
      c2d.textAlign = 'center'
      c2d.textBaseline = 'middle'
      c2d.fillStyle = '#000'
      
      if (this.lives > 0) {
        c2d.font = '1em monospace'
        c2d.fillText('No problem, let\'s try again!', APP_WIDTH / 2, APP_HEIGHT / 2 - PAUSE_OFFSET)
        c2d.fillText('大丈夫、もう一度やってみよう！', APP_WIDTH / 2, APP_HEIGHT / 2 + PAUSE_OFFSET)
      } else {
        c2d.font = '1.5em monospace'
        c2d.fillText('Good job! おめでとう！', APP_WIDTH / 2, APP_HEIGHT / 2 - PAUSE_OFFSET)
        c2d.fillText(this.score + ' すごい', APP_WIDTH / 2, APP_HEIGHT / 2 + PAUSE_OFFSET)
      }
    }
    // ----------------
    
    const SCREEN_EDGE_OFFSET = 20
    const SHADOW_X = 2
    const SHADOW_Y = 1
    
    // Draw UI data: score
    // ----------------
    c2d.textAlign = 'right'
    c2d.textBaseline = 'top'
    c2d.font = '1.5em monospace'
    fillTextWithShadow(c2d, this.score + ' すごい', APP_WIDTH - SCREEN_EDGE_OFFSET, SCREEN_EDGE_OFFSET)
    // ----------------
    
    // Draw UI data: lives
    // ----------------
    c2d.textAlign = 'left'
    c2d.textBaseline = 'top'
    c2d.font = '2em monospace'
    fillTextWithShadow(c2d, '❤'.repeat(this.lives), SCREEN_EDGE_OFFSET, SCREEN_EDGE_OFFSET, '#ee4444')
    // ----------------
    
    // Draw UI data: difficulty
    // ----------------
    const DIFFICULTY_OFFSET = SCREEN_EDGE_OFFSET + 40
    c2d.textAlign = 'left'
    c2d.textBaseline = 'top'
    c2d.fillStyle = '#444'
    c2d.font = '1em monospace'
    c2d.fillText('⭐'.repeat(this.difficulty), SCREEN_EDGE_OFFSET, DIFFICULTY_OFFSET)
    // ----------------
  }
  
  /*
  Section: UI and Event Handling
  ----------------------------------------------------------------------------
   */
  
  setupUI () {
    this.html.canvas.width = this.canvasWidth
    this.html.canvas.height = this.canvasHeight
    
    // Prevent "touch and hold to open context menu" menu on touchscreens.
    this.html.canvas.addEventListener('touchstart', stopEvent)
    this.html.canvas.addEventListener('touchmove', stopEvent)
    this.html.canvas.addEventListener('touchend', stopEvent)
    this.html.canvas.addEventListener('touchcancel', stopEvent)
    
    this.html.buttonHome.addEventListener('click', this.buttonHome_onClick.bind(this))
    this.html.buttonReload.addEventListener('click', this.buttonReload_onClick.bind(this))
    this.html.buttonLeft.addEventListener('click', this.buttonLeft_onClick.bind(this))
    this.html.buttonRight.addEventListener('click', this.buttonRight_onClick.bind(this))
    
    this.html.main.addEventListener('keydown', this.onKeyDown.bind(this))
    
    window.addEventListener('resize', this.updateUI.bind(this))
    this.updateUI()
    this.hideUI()  // Hide until all assets are loaded
    
    this.html.main.focus()
  }
  
  hideUI () {
    this.html.buttonHome.style.visibility = 'hidden'
    this.html.buttonReload.style.visibility = 'hidden'
    this.html.buttonLeft.style.visibility = 'hidden'
    this.html.buttonRight.style.visibility = 'hidden'
  }
  
  showUI () {
    this.html.buttonHome.style.visibility = 'visible'
    this.html.buttonReload.style.visibility = 'visible'
    this.html.buttonLeft.style.visibility = 'visible'
    this.html.buttonRight.style.visibility = 'visible'
  }
  
  updateUI () {
    // Fit the Interaction layer to the canvas
    const mainDivBounds = this.html.main.getBoundingClientRect()
    const canvasBounds = this.html.canvas.getBoundingClientRect()
    this.html.menu.style.width = `${canvasBounds.width}px`
    this.html.menu.style.height = `${canvasBounds.height}px`
    this.html.menu.style.top = `${canvasBounds.top - mainDivBounds.top}px`
    this.html.menu.style.left = `${canvasBounds.left}px`
  }
  
  setMenu (menu) {
    this.menu = menu
    if (menu) {
      this.html.menu.style.visibility = 'visible'
      this.html.buttonReload.style.visibility = 'hidden'
      this.html.buttonLeft.style.visibility = 'hidden'
      this.html.buttonRight.style.visibility = 'hidden'
    } else {
      this.html.menu.style.visibility = 'hidden'
      this.html.buttonReload.style.visibility = 'visible'
      this.html.buttonLeft.style.visibility = 'visible'
      this.html.buttonRight.style.visibility = 'visible'
      
      this.html.main.focus()
    }
  }
  
  onKeyDown (e) {
    if (this.luckyBeast) {
      switch (e.key) {
        case 'Escape':
          this.setMenu(!this.menu)
          break
        case 'R':
        case 'r':
          this.startGame()
          break
        case 'ArrowRight':
          this.moveLuckyBeast(DIRECTIONS.EAST)
          return stopEvent(e)
          break
        case 'ArrowLeft':
          this.moveLuckyBeast(DIRECTIONS.WEST)
          return stopEvent(e)
          break
      }
    }
  }
  
  buttonHome_onClick () {
    this.setMenu(!this.menu)
  }
  
  buttonReload_onClick () {
    this.startGame()
    this.html.main.focus()
  }
  
  buttonLeft_onClick () {
    this.moveLuckyBeast(DIRECTIONS.WEST)
  }
  
  buttonRight_onClick () {
    this.moveLuckyBeast(DIRECTIONS.EAST)
  }
  
  /*
  Section: Gameplay
  ----------------------------------------------------------------------------
   */
  
  /*
  Start the game. Triggers when game loads, or reloads.
   */
  startGame (resetScore = true) {
    if (resetScore) {
      this.lives = STARTING_LIVES
      this.score = 0
    }
    
    this.difficulty = 0
    
    this.entities = []
    
    this.luckyBeast = new LuckyBeast(this)
    this.entities.push(this.luckyBeast)
    
    this.friend = new Friend(this)
    this.entities.push(this.friend)
    
    this.timeToNextBun = TIME_BETWEEN_BUNS
    this.paused = false
  }
  
  /*
  Stop the game after dropping a bun (losing a life).
   */
  stopGame () {
    if (this.paused) return  // Don't trigger this more than once
    this.lives = Math.max(0, this.lives - 1)
    this.paused = true
    this.pauseTimer = MINIMUM_PAUSE_DURATION
  }
  
  /*
  Continue the game after game is paused.
   */
  continueGame () {
    if (this.pauseTimer > 0) return
    if (this.lives > 0) {
      this.startGame(false)
    }
  }
  
  increaseScore (score) {
    this.score += score
  }
  
  /*
  Difficulty increases every time Lucky Beast delivers buns
   */
  increaseDifficulty () {
    this.difficulty++
  }
  
  moveLuckyBeast (direction) {
    if (this.menu) return
    
    if (this.paused) {
      this.continueGame()
      return
    }
    
    this.luckyBeast.move(direction)
  }
}

function stopEvent (e) {
  if (!e) return false
  e.preventDefault && e.preventDefault()
  e.stopPropagation && e.stopPropagation()
  e.returnValue = false
  e.cancelBubble = true
  return false
}

export default JapariBunCatch
