/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */
import { StateSignature } from "./StateSignature"

export interface StoreObserver<T extends StateSignature> {
  (state?: Partial<T>): void
}