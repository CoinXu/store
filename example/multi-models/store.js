/**
 * Created on 29/04/2017.
 */

import { Store, storeModelCreator } from '../../index'
import { school, user } from './models'
debugger
const store = new Store()
store.use(storeModelCreator([school, user]))
store.initialize()

export default store