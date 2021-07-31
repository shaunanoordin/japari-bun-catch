class Entity {
  constructor (app) {
    this._app = app
    
    // General identity stats
    this.colour = '#ccc'
    
    // Expired entities are removed at the end of the cycle.
    this._expired = false
  }
  
  play (timeStep) {}
  
  paint (layer = 0) {}
  
}

export default Entity