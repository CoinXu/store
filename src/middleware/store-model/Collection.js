/**
 * Created on 30/04/2017.
 */

import Model from './Model'

class Collection {
  constructor (mods) {
    super()
    this.mods = mods
      .map(mod => Model.isModel(mod) ? mod : new Model(mod))
      .map(mod => mod.subscribe(this.done.bind(this)))
    this.state = {}
    this.running = 0
  }
  
  receiver (action, state, next) {
    this.mods.forEach(mod => {
      this.running = this.running + 1
      mod.receiver(action)
    })
    return this
  }
  
  done (state) {
    Object.assign(this.state, state)
    this.running = this.running - 1
    // 所有的model都done的时候再执行storeNext
    if (this.running === 0) {
      this.onNext(this.state)
    }
    return this
  }
}

export default Collection
