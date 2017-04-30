/**
 * Created on 30/04/2017.
 */

import { Store, storeModelCreator } from '../../../src'

import mapToViewModel from './map-to-view-model'
import validate from './validate'
import UserModel from '../model/user'

import Actions from './actions'

class Controller extends Store {
  constructor () {
    super()
    storeModelCreator([UserModel], this)
    this.use(validate)
    this.use(mapToViewModel)
    this.initialize()
  }
  
  update (key, value) {
    this.dispatch({ type: Actions.update, key, value })
  }
  
  create () {
    this.dispatch({ type: Actions.create })
  }
}

export default Controller