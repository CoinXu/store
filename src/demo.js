/**
 * Created on 28/04/2017.
 */

class AbstractObservable {
  constructor () {}
  
  onNext () {}
  
  onError () {}
  
  subscribe (observer) {}
}

class AbstractObserver {
  constructor (onNext, onError) {}
  
  onNext () {}
  
  onError () {}
}

class AbstractStore extends AbstractObservable {
  store (model) {}
  
  unstore (name) {}
  
  model (props) {}
  
  dispatch (action) {}
}

class AbstractModel {
  constructor ({ name, state, actions = {}, processor = function () {} }) {}
  
  done (next) {}
  
  reducer (next) {}
}

const s = new AbstractStore()
s.dispatch({ type: '' })