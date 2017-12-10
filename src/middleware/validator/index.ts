/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   28/11/2017
 * @description
 */

import { isString, isFunction, assert, isObject } from "../../utils/utils"
import { Validator } from "./Validator"
import { Action, Next } from "../../interfaces"
import Store from "../../Store"

export interface ValidatorMap<T, U> {
  (model: T): U
}

export interface StoreValidatorScheduler<T> {
  (action: Action, model: Validator<T>, next: Next<T>): any
}

export interface StoreValidatorDesc<T> {
  namespace: string
  model: Validator<T>
  scheduler: StoreValidatorScheduler<T>
  map: ValidatorMap<Validator<T>, any>
}

export default function storeValidatorCreator<T> (desc: StoreValidatorDesc<T>, store: Store<any>): Store<any> {
  if (process.env.NODE_ENV === "development") {
    assert(isObject(desc), 'store validator descriptor must be type of string')
  }

  const { namespace, model, scheduler, map } = desc

  if (process.env.NODE_ENV === "development") {
    assert(isString(namespace), 'desc.namespace must be type of string')
    assert(isFunction(scheduler), 'desc.namespace must be type of function')
    assert(isFunction(map), 'desc.map must be type of function')
    assert(Validator.isValidator(model), 'desc.model must be instance of Validator class')
  }

  store.use(function (action: Action, state: any, next: Next<any>) {
    scheduler(action, model, function () {
      next({ [namespace]: map(model) })
    })
  })

  return store
}
