/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */

export interface CollectionJSON<T> {
  models: T[]
  toDelete: T[]
  toUpdate: T[]
  toCreate: T[]
}
