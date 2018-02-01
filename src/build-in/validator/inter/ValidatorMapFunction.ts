/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */

export interface ValidatorMapFunction<T, U> {
  (model: T): U
}