import {
  APP_WIDTH, APP_HEIGHT, TILE_SIZE, DIRECTIONS,
  TIME_BETWEEN_BUNS, ROWS_FOR_BUNS, COLUMNS_FOR_BUNS,
} from './constants'
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
      basket: new ImageAsset('assets/basket.png'),
      bun: new ImageAsset('assets/bun.png'),
      friends: new ImageAsset('assets/friends.png'),
      luckyBeast: new ImageAsset('assets/lucky-beast.png'),
    }
    
    this.luckyBeast = null
    this.friend = null
    this.entities = []
    
    this.score = 0
    this.timeToNextBun = 0
    
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
    
    // Run entity logic
    this.entities.forEach(entity => entity.play(timeStep))
    
    // Spawn a new bun
    this.timeToNextBun -= timeStep
    if (this.timeToNextBun <= 0) {
      this.timeToNextBun += TIME_BETWEEN_BUNS
      const newCol = Math.floor(Math.random() * COLUMNS_FOR_BUNS)
      const newBun = new Bun(this, newCol)
      this.entities.push(newBun)
    }
    
    // Cleanup
    this.entities = this.entities.filter(entity => !entity._expired)
  }
  
  paint () {
    const c2d = this.canvas2d
    
    c2d.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    // ----------------
    
    // Draw grid
    // ----------------
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
    // ----------------

    // Draw entities
    // ----------------
    const MAX_LAYER = 2
    for (let layer = 0 ; layer < MAX_LAYER ; layer++) {
      this.entities.forEach(entity => entity.paint(layer))
    }
    // ----------------
    
    // Draw UI data
    // ----------------
    const OFFSET = 20
    c2d.textAlign = 'right'
    c2d.textBaseline = 'top'
    c2d.fillStyle = '#c44'
    c2d.font = '1em monospace'
    c2d.fillText(this.score + ' すごい', APP_WIDTH - OFFSET, OFFSET)
    // ----------------
  }
  
  /*
  Section: UI and Event Handling
  ----------------------------------------------------------------------------
   */
  
  setupUI () {
    this.html.canvas.width = this.canvasWidth
    this.html.canvas.height = this.canvasHeight
    
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
    } else {
      this.html.menu.style.visibility = 'hidden'
      this.html.buttonReload.style.visibility = 'visible'
      this.html.main.focus()
    }
  }
  
  onKeyDown (e) {
    if (this.luckyBeast) {
      switch (e.key) {
        case 'Escape':
          this.setMenu(!this.menu)
          break
        case 'ArrowRight':
          this.luckyBeast.move(DIRECTIONS.EAST)
          return stopEvent(e)
          break
        case 'ArrowLeft':
          this.luckyBeast.move(DIRECTIONS.WEST)
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
    if (this.menu) return
    this.luckyBeast.move(DIRECTIONS.WEST)
  }
  
  buttonRight_onClick () {
    if (this.menu) return
    this.luckyBeast.move(DIRECTIONS.EAST)
  }
  
  /*
  Section: Gameplay
  ----------------------------------------------------------------------------
   */
  
  startGame () {
    this.entities = []
    this.score = 0
    
    this.luckyBeast = new LuckyBeast(this)
    this.entities.push(this.luckyBeast)
    
    this.friend = new Friend(this)
    this.entities.push(this.friend)
    
    this.timeToNextBun = TIME_BETWEEN_BUNS
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
