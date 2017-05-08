/**
 * Created on 29/04/2017.
 */


const actions = {
  user: {
    add: function (name, state) {
      const { list } = state
      const new_user = { name, age: 0 }
      return { list: list.concat(new_user) }
    },
    remove: function (name, state, done) {
      setTimeout(function () {
        done({ list: state.list.filter(user => user.name !== name) })
      }, 3000)
    }
  },
  school: {
    add: function (name, state, done) {
      setTimeout(function () {
        done({ list: state.list.concat({ name, age: 0 }) })
      }, 2000)
    },
    remove: function (name, state, done) {
      done({ list: state.list.filter(school => school.name !== name) })
    }
  }
}

const user = {
  name: 'user',
  state: {
    list: []
  },
  scheduler: function (state, action, done) {
    switch (action.type) {
      case 'add':
        return actions.user.add(action.name)
      case 'remove':
        return actions.user.remove(action.name, state, done)
      default:
        return state
    }
  }
}

const school = {
  name: 'school',
  state: {
    list: []
  },
  scheduler: function (state, action, done) {
    switch (action.type) {
      case 'add':
        return action.school.add(action.name, state, done)
      case 'remove':
        return action.school.remove(action.name, state, done)
      default:
        return state
    }
  }
}

export { user, school }