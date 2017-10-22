/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   22/10/2017
 * @description
 */

import { isString, isFunction, assert, isObject } from '../../utils/utils'
import { Validator } from './Validator'

/**
 * @typedef {callback} map
 * @param {Validator} model
 * @return {Object}
 */

/**
 * @typedef {Object} StoreValidatorDesc
 * @property {string} namespace
 * @property {Validator} model
 * @property {scheduler} scheduler
 * @property {map} map
 */

/**
 * @param {StoreValidatorDesc} desc
 * @param {Store} store
 * @return {Store}
 */
function storeValidatorCreator (desc, store) {
  assert(isObject(desc), 'store validator descriptor must be type of string')

  const { namespace, model, scheduler, map } = desc

  assert(isString(namespace), 'desc.namespace must be type of string')
  assert(isFunction(scheduler), 'desc.namespace must be type of function')
  assert(isFunction(map), 'desc.map must be type of function')
  assert(Validator.isValidator(model), 'desc.model must be instance of Validator class')

  store.use(function (action, state, next) {
    scheduler(action, model, function () {
      next({ [namespace]: map(model) })
    })
  })

  return store
}

export default storeValidatorCreator

export {
  storeValidatorCreator
}
