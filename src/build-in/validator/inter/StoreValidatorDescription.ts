/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */
import { Validator } from "./Validator"
import { Scheduler } from "./Scheduler"
import { ValidatorMapFunction } from "./ValidatorMapFunction"

export interface StoreValidatorDescription<T> {
  namespace: string
  model: Validator<T>
  scheduler: Scheduler<T>
  map: ValidatorMapFunction<Validator<T>, any>
}