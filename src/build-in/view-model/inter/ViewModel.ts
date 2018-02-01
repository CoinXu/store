/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */
import { Store } from "../../../core/impl/Store"
import { Model } from "../../model/inter/Model"

export interface ViewModel<T> extends Model<T> {
  store: Store<any>
}