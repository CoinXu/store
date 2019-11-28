/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */

export type CollectionState<T, U = Omit<any, "list">> = { list: T[] } & U;
