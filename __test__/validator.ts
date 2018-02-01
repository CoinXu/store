/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   29/11/2017
 * @description validator相关测试用例
 */

import { equal, ok } from "assert"
import { Store } from "../src/core/impl/Store"
import storeValidatorCreator from "../src/build-in/validator/impl"
import { Validator } from "../src/build-in/validator/impl/Validator"
import {
  DataType,
  DataTypes,

  Enum,
  Pattern,
  Required,

  MaxLen,
  MinLen,
  RangeLen,

  Max,
  Min,
  Range
} from "../src/build-in/validator/decorate"
import { Action } from "../src/core/inter/Action"
import { NextCallback } from "../src/core/inter/NextCallback"

/** --------------------- Define User --------------------- */
enum Gender {
  Female,
  Male
}

interface UserState {
  age: number
  name: string
  gender: Gender
  email: string
}

class User extends Validator<UserState> {
  @Max(200)
  @Min(0)
  @DataType(DataTypes.PRIM_NUM)
  @Required()
  public age: number = null

  @MaxLen(32)
  @MinLen(4)
  @DataType(DataTypes.PRIM_STR)
  @Required()
  public name: string = null

  @Enum(Gender)
  public gender: Gender = null

  @Pattern(/^\w+\.@\w+\.\w+$/, '邮箱格式为xxx@yyy.zzz')
  @RangeLen(6, 32)
  @DataType(DataTypes.PRIM_STR)
  @Required()
  public email: string = null
}

/** --------------------- Define User end --------------------- */

describe('Store.middleware.Validator', function () {

  it('A object that include all validator functions returned while Validator.validator() called', function () {
    const user = new User()
    const validator = user.validator()
    ok(validator.age.length === 4)
    ok(validator.name.length === 4)
    ok(validator.gender.length === 1)
    ok(validator.email.length === 4)
  })

  it('Should get null while Validator.validOne(key, value) pass', function () {
    const user = new User()
    equal(user.validOne('age', 1), null)
  })

  it('Should get string while Validator.validOne(key, value) not pass', function () {
    const user = new User()
    equal(typeof user.validOne('age', -1), 'string')
  })

  it('A object or null returned while Validator.getValid() called', function () {
    const user = new User()
    // no valid error
    equal(user.getValid(), null)
    // set a illegal value
    user.set('age', -1)
    equal(typeof user.getValid().age, 'string')
  })

  it('Validator will ignore null', function () {
    const user = new User()
    user.set({ age: null, name: null, gender: null, email: null })
    equal(user.getValid(), null)
  })

  it('Should get a string message while Validator.valid(values) not pass', function () {
    const user = new User()
    user.set({ age: -1 })
    equal(typeof user.getValid().age, 'string')
  })

  it('A illegal value will be ignore through Validator.set method', function () {
    const user = new User()
    user.set('age', -1)
    equal(user.age, void 0)
  })

  it('A legal value will be assign to property through Validator.set method', function () {
    const user = new User()
    equal(user.age, null)
  })

  it('Validator.isValidator is a static method to valid argument is a Validator instance', function () {
    ok(Validator.isValidator(new User()))
    ok(!Validator.isValidator(User))
    ok(!Validator.isValidator(0))
  })

  it('When A extends Validator & B extends A. B will extend all property and that validator decorator from A', function () {

    interface GameUser extends UserState {
      level: number
    }

    class GameUser extends User {
      @Range(0, 175)
      @DataType(DataTypes.PRIM_NUM)
      @Required()
      level = 0
    }

    // 向上转型为Validator
    const user = new GameUser() as Validator<GameUser>
    user.set({ age: -1, name: '', gender: -1, email: '' })
    equal(typeof user.getValid().age, 'string')
    equal(typeof user.getValid().name, 'string')
    equal(typeof user.getValid().gender, 'string')
    equal(typeof user.getValid().email, 'string')

    user.set('level', -1)
    equal(typeof user.getValid().level, 'string')
  })
})


describe('storeValidatorCreator', function () {

  const Action = {
    upgrade: 'upgrade'
  }

  /**
   * @param {Object} action
   * @param {User} model
   * @param {Function} done
   */
  function scheduler(action: Action, model: User, done: NextCallback<any>) {
    const { type, payload } = action
    switch (type) {
      case Action.upgrade:
        model.set(payload)
        done()
        break
      default:
        done()
    }
  }

  /**
   * @param {User} model
   * @return {Object}
   */
  function map(model: User) {
    return {
      name: model.name,
      message: model.getValid()
    }
  }

  interface UserStore extends UserState {
    message?: any
  }

  it('The scheduler method which is storeValidatorCreator method fist argument will receive all actions', function (done) {
    const store = new Store<{ User: UserStore }>()
    const name = 'Coin Xu'
    storeValidatorCreator({
      namespace: 'User',
      model: new User(),
      scheduler,
      map
    }, store)

    store.subscribe(state => {
      equal(state.User.name, name)
      equal(state.User.message, null)
      done()
    })

    store.dispatch({ type: Action.upgrade, payload: { name } })
  })
})
