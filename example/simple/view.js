/**
 * Created on 29/04/2017.
 */

import store from './store'
const body = document.body
function render (state) {
  body.innerHTML = `<h2>Count: ${state.mod.count}</h2>`
}

store.subscribe(render)

setInterval(store.dispatch.bind(store), 200, { type: 'add' })