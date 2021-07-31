class Entity {
  constructor (app) {
    this._app = app
    
    // Expired entities are removed at the end of the cycle.
    this._expired = false
  }
  
  play (timeStep) {}
  
  paint (layer = 0) {}
  
}

export default Entity