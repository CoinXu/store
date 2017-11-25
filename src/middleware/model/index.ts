/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   26/11/2017
 * @description
 */

import Model, { ModelDescription } from "./Model"
import { Action, Next } from "../../interfaces"
import Store from "../../Store"

/**
 * <h2>管理`model`的中间件</h2>
 * <p>`model`设计还在探索中</p>
 * @param {Array<Model|ModelDescription>} mods
 * @param {Store} store
 * @return {Store}
 */
function storeModelCreator<T> (mods: Array<Model<T> | ModelDescription<T>>, store: Store<any>) {
  mods
    .map(m => Model.isModel<T>(m) ? m : new Model<T>(m))
    .map((mod: Model<T>) => {
      store.use((action: Action, state: any, next: Next<any>) => {
        mod.receiver(action, state, next)
      })
    })
  return store
}

export default storeModelCreator