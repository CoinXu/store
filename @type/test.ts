import {Store, storeModelCreator, storeViewModelCreator} from './index'

interface User {
  id: string
  name: string
  age: number
}

const mod: User = {
  id: '1',
  name: 'name',
  age: 10
}

const desc = {
  name: 'model',
  scheduler(state: User): User | void{
    return state
  },
  state: mod
}

const store = storeModelCreator([desc], new Store<User>())

// method
store.subscribe((state: User) => {
  console.log(state)
})

store.initialize()
store.dispatch({type: 'action_type'}, (state: User) => console.log(state))
store.dispose({type: 'action_type'})
store.single({type: 'action_type'})
store.multiple([{type: 'action_type'}])

let state: User = store.getState()

store.use((action, state, next) => {
  console.log(action.type)
  console.log(state.name)
  next()
})

const viewStore = storeViewModelCreator([desc], new Store<User>())

viewStore.subscribe((state: User) => {
  console.log(state)
})

viewStore.initialize()
viewStore.dispatch({type: 'action_type'}, (state: User) => console.log(state))
viewStore.dispose({type: 'action_type'})
viewStore.single({type: 'action_type'})
viewStore.multiple([{type: 'action_type'}])

let viewState: User = store.getState()

viewStore.use((action, state, next) => {
  console.log(action.type)
  console.log(state.name)
  next()
})




