/**
 * Created on 29/04/2017.
 */

import { Store, storeModelCreator } from '../../index'
import { user, school } from './models'
const store = new Store()
storeModelCreator([user, school], store)
store.initialize()

export default store