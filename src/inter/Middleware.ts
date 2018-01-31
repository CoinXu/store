/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */
import { Action } from "./Action"
import { StateSignature } from "./StateSignature"
import { NextCallback } from "./NextCallback"

export interface Middleware<T extends StateSignature> {
  (action: Action, state: T, next: NextCallback<T>): void
}