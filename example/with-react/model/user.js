/**
 * Created on 30/04/2017.
 */

import Actions from '../controller/actions'
import Resource from './resource'

const actions = {
  update: function (key, value) {
    return { [key]: value }
  },
  create: async function (state, done) {
    const res = await Resource.create(state.nickname, state.email, state.password)
    done({ signUp: res.success })
  }
}

export default {
  name: 'user',
  state: {
    // model
    nickname: '',
    email: '',
    password: '',

    // state
    signUp: false
  },
  scheduler: function (state, action, done) {
    switch (action.type) {
      case Actions.update:
        return actions.update(action.key, action.value)
      case Actions.create:
        return actions.create(state, done)
      default:
        return state
    }
  }
}
