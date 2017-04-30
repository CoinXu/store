/**
 * Created on 29/04/2017.
 */

import store from './store'

const body = document.body
let count = 0

store.subscribe(render)
insert()

function remove () {
  const sid = setInterval(function () {
    if (count < 0) {
      clearInterval(sid)
    } else {
      store.dispatch({ type: 'remove', name: 'No.' + count-- })
    }
  }, 1000)
}

function insert () {
  const sid = setInterval(function () {
    if (count === 4) {
      clearInterval(sid)
      remove()
    } else {
      store.dispatch({ type: 'add', name: 'No.' + count++ })
    }
  }, 2000)
}

function render (state) {
  const { user, school } = state
  let html = []
  html.push('<h2>User List</h2>')
  html = html.concat(user.list.map(u => `<p>name: ${u.name}</p>`))
  html.push('<h2>School List</h2>')
  html = html.concat(school.list.map(s => `<p>name: ${s.name}</p>`))
  body.innerHTML = html.join('')
}