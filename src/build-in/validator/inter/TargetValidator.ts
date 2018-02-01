/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */
import { Descriptor } from "./Descriptor"

export interface TargetValidator {
  target: any
  validator: { [key: string]: Descriptor[] }
}
