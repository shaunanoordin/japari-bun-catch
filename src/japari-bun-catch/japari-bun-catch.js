import {
  APP_WIDTH, APP_HEIGHT, TILE_SIZE,
  PLAYER_ACTIONS,
} from './constants'
import ImageAsset from './image-asset'

const searchParams = new URLSearchParams(window.location.search)
const DEBUG = searchParams.get('debug') || false

class JapariBunCatch {
  constructor () {
    this.html = {
      main: document.getElementById('main'),
      canvas: document.getElementById('canvas'),
      buttonReload: document.getElementById('button-reload'),
    }
    
    this.canvas2d = this.html.canvas.getContext('2d')
    this.canvasWidth = APP_WIDTH
    this.canvasHeight = APP_HEIGHT
    
    this.setupUI()
    
    this.initialised = false
    this.assets = {}
    
    this.hero = null
    this.entities = []
    
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
    // Run the action gameplay
    // ----------------
    this.entities.forEach(entity => entity.play(timeStep))
    
    // Cleanup
    this.entities = this.entities.filter(entity => !entity._expired)
    // ----------------
  }
  
  paint () {
    const c2d = this.canvas2d
    
    c2d.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    
    c2d.strokeStyle = 'rgba(128, 128, 128, 0.05)'
    c2d.lineWidth = 2
    // ----------------
    
    // Draw grid
    // ----------------
    const offsetX = 0
    const offsetY = 0
    
    for (let y = offsetY ; y < APP_HEIGHT ; y += TILE_SIZE) {
      for (let x = offsetX ; x < APP_WIDTH ; x += TILE_SIZE) {
        c2d.beginPath()
        c2d.rect(x, y, TILE_SIZE, TILE_SIZE)
        c2d.stroke()
        
        // Debug Grid
        if (DEBUG) {
          c2d.fillStyle = '#ccc'
          c2d.font = `1em Source Code Pro`
          c2d.textAlign = 'center'
          c2d.textBaseline = 'middle'
          const col = Math.floor(x / TILE_SIZE)
          const row = Math.floor(y / TILE_SIZE)
          c2d.fillText(col + ',' + row, x + TILE_SIZE / 2, y + TILE_SIZE / 2)  // using template strings here messes up colours in Brackets.
        }
      }
    }
    // ----------------

    // Draw entities
    // ----------------
    this.entities.forEach(entity => entity.paint(layer))
    // ----------------
    
    // Draw UI data
    // ----------------
    // ----------------
  }
  
  /*
  Section: UI and Event Handling
  ----------------------------------------------------------------------------
   */
  
  setupUI () {
    this.html.canvas.width = this.canvasWidth
    this.html.canvas.height = this.canvasHeight
    
    this.html.buttonReload.addEventListener('click', this.buttonReload_onClick.bind(this))
    
    this.html.main.addEventListener('keypress', this.onKeyPress.bind(this))
    
    window.addEventListener('resize', this.updateUI.bind(this))
    this.updateUI()
    this.hideUI()  // Hide until all assets are loaded
    
    this.html.main.focus()
  }
  
  hideUI () {
    this.html.buttonReload.style.visibility = 'hidden'
  }
  
  showUI () {
    this.html.buttonReload.style.visibility = 'visible'
  }
  
  updateUI () {
    // Fit the Interaction layer to the canvas
    const mainDivBounds = this.html.main.getBoundingClientRect()
    const canvasBounds = this.html.canvas.getBoundingClientRect()
  }
  
  onKeyPress (e) {
    console.log('+++ e.key: ', e.key)
    
    return stopEvent(e)
  }
  
  buttonReload_onClick () {
    this.startGame()
  }
  
  /*
  Section: Gameplay
  ----------------------------------------------------------------------------
   */
  
  startGame () {
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
