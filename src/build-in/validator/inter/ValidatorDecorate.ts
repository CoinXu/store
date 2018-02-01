/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */

export interface ValidatorDecorate {
  (target: any, key: string, descriptor?: any): any
}