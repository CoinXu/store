/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */
import { ValidatorFunction } from "./ValidatorFunction"

export interface Descriptor {
  msg: string
  validator: ValidatorFunction
}