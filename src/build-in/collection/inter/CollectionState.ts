/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */

export interface CollectionState<T> {
  list: T[]
  [key: string]: any
}
