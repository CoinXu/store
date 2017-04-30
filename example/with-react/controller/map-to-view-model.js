/**
 * Created on 30/04/2017.
 */

export default function (action, state, next) {
  next({ vm: state.user })
}