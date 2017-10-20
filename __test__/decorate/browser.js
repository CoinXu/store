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
  @Max(200)
  @Min(0)
  @DateType(DateTypes.PRIM_NUM)
  @Required()
  age = null

  @MaxLen(32)
  @MinLen(4)
  @DateType(DateTypes.PRIM_STR)
  @Required()
  name = null

  @Enum(Gender)
  gender = null

  @Pattern(/^\w+\.@\w+\.\w+$/, '邮箱格式为xxx@yyy.zzz')
  @RangeLen([6, 32])
  @DateType(DateTypes.PRIM_STR)
  @Required()
  email = null
}

const user = new User()

/**
 * @param {Array<ValidMessage>} msg
 */
function listener (msg) {
  console.log(msg)
}

user.listen(listener)
user.set({ age: -1, name: '', gender: -1, email: 'aaaa.c' })

window.user = user

class GameUser extends User {
  @Range([0, 175])
  @DateType(DateTypes.PRIM_NUM)
  @Required()
  level = 0
}

const guser = window.guser = new GameUser()
guser.listen(function (msg) {console.log('guser => ', msg)})
user.set({ age: -1, name: '', gender: -1, email: 'bbbb.a', level: '' })
