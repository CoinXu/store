/**
 * @Author sugo.io<asd>
 * @Date 17-10-19
 */
import { StoreModel } from '../../src/middleware/store-next-model/Model'
import {
  DateType,
  DateTypes,

  Enum,
  Pattern,
  Required,

  MaxLen,
  MinLen,
  RangeLen,

  Max,
  Min,
  Range
} from '../../src/decorate/validator'

const Gender = {
  Female: 0,
  Male: 1
}

class User extends StoreModel {
  @Range([0, 200])
  @DateType(DateTypes.PRIM_NUM)
  @Required()
  age = null

  @RangeLen([4, 32])
  @DateType(DateTypes.PRIM_STR)
  @Required()
  name = null

  @Enum(Gender)
  gender = null
}

const user = new User()

/**
 * @param {Array<ValidMessage>} msg
 */
function listener (msg) {
  console.log(msg)
}

user.listen(listener)

//user.age = 0
//user.name = 'demo'
//user.gender = Gender.Female

window.user = user

class GameUser extends StoreModel {
  @Range([0, 175])
  @DateType(DateTypes.PRIM_NUM)
  @Required()
  level = 0
}

const guser = window.guser = new GameUser()
guser.listen(function (msg) {
  console.log('guser => ', msg)
})
