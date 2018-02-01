/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */
import { isString, isFunction, assert, isObject } from "../../../core/impl/utils"
import { Action } from "../../../core/inter/Action"
import { NextCallback } from "../../../core/inter/NextCallback"
import { Middleware } from "../../../core/inter/Middleware"
import { Store } from "../../../core/impl/Store"
import { StoreValidatorDescription } from "../inter/StoreValidatorDescription"
import { Validator } from "./Validator"

export default function storeValidatorCreator<T>(description: StoreValidatorDescription<T>,
                                                 store: Store<any>): Store<any> {
  if (process.env.NODE_ENV === "development") {
    assert(isObject(description), 'store validator descriptor must be type of string')
  }
  const { namespace, model, scheduler, map } = description

  if (process.env.NODE_ENV === "development") {
    assert(isString(namespace), 'desc.namespace must be type of string')
    assert(isFunction(scheduler), 'desc.namespace must be type of function')
    assert(isFunction(map), 'desc.map must be type of function')
    assert(Validator.isValidator(model), 'desc.model must be instance of Validator class')
  }

  store.use(<Middleware<any>>function (action: Action, state: any, next: NextCallback<any>): void {
    scheduler(action, model, function () {
      next({ [namespace]: map(model) })
    })
  })
  return store
}

