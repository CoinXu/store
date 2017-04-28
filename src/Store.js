/**
 * Created on 28/04/2017.
 */

import Observable from './Observable'
import Mod from './Model'
import { warning, isPureObject, isString, assert } from './utils'

const DefAction = { type: '__COLLECTION__INITIALIZE__ACTION__' }

class Store extends Observable {
  constructor () {
    super()
    this.mods = []
    this.state = {}
    this.receiver = this.receiver.bind(this)
    this.onError = this.receiver.bind(this)
  }
  
  getModel (name) {
    return this.mods.find(m => m.name === name)
  }
  
  store (descOrMod) {
    const mod = Mod.isModel(descOrMod) ? descOrMod : new Mod(descOrMod)
    
    assert(!this.getModel(mod.name), `duplicate model name: ${mod.name}`)
    
    mod.subscribe(this.receiver, this.onError)
    mod.receiver(DefAction)
    
    this.mods.push(mod)
    
    return this
  }
  
  receiver ({ state, name }) {
    this.state[name] = state
    // TODO 异步执行队列
    this.onNext(this.state)
    
    return this
  }
  
  dispatch (action) {
    assert(isPureObject(action), 'action must a pure object')
    warning(isString(action.type), 'type of action should be string')
    
    this.mods.forEach(mod => mod.receiver(action))
    
    return this
  }
}

export default Store
