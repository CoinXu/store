/**
 * Created on 29/04/2017.
 */


const user = {
  name: 'user',
  state: {
    list: []
  },
  scheduler: function (state, action) {
    switch (action.type) {
      case 'add':
        return this.actions.add(action.name)
      case 'remove':
        return this.actions.remove(action.name)
      default:
        return state
    }
  },
  actions: {
    add: function (name, state) {
      const { list } = state
      const new_user = { name, age: 0 }
      return { list: list.concat(new_user) }
    },
    remove: function (name, state, done) {
      setTimeout(done, 3000, { list: state.list.filter(user => user.name !== name) })
    }
  }
}

const school = {
  name: 'school',
  state: {
    list: []
  },
  scheduler: function (state, action) {
    switch (action.type) {
      case 'add':
        return this.actions.add(action.name)
      case 'remove':
        return this.actions.remove(action.name)
      default:
        return state
    }
  },
  actions: {
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

export { user, school }