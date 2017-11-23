/**
 * @Author sugo.io<asd>
 * @Date 17-10-19
 */
import { equal, ok } from 'assert'
import Store from '../src/Store'
import { storeValidatorCreator } from '../src/middleware/store-validator'
import { Validator } from '../src/middleware/store-validator/Validator'
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
} from '../src/decorate/validator/index'

/** --------------------- Define User --------------------- */
const Gender = {
  Female: 0,
  Male: 1
}

class User extends Validator {
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
  @RangeLen(6, 32)
  @DateType(DateTypes.PRIM_STR)
  @Required()
  email = null
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

  it('A object or null returned while Validator.getValid() called', function () {
    const user = new User()
    // no valid error
    equal(user.getValid(), null)
    // set a illegal value
    user.set('age', -1)
    equal(user.getValid().age.length, 1)
  })

  it('Validator will ignore null', function () {
    const user = new User()
    user.valid({ age: null, name: null, gender: null, email: null })
    equal(user.getValid(), null)
  })

  it('An Array that include validate message returned while Validator.valid(values) called', function () {
    const user = new User()
    user.valid({ age: -1 })
    equal(user.getValid().age.length, 1)
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
    class GameUser extends User {
      @Range(0, 175)
      @DateType(DateTypes.PRIM_NUM)
      @Required()
      level = 0
    }

    const user = new GameUser()
    user.set({ age: -1, name: '', gender: -1, email: '' })
    equal(user.getValid().age.length, 1)
    equal(user.getValid().name.length, 1)
    equal(user.getValid().gender.length, 1)
    equal(user.getValid().email.length, 1)

    user.set('level', -1)
    equal(user.getValid().level.length, 1)
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
  function scheduler (action, model, done) {
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
  function map (model) {
    return {
      name: model.name,
      message: model.getValid()
    }
  }

  it('The scheduler method which is storeValidatorCreator method fist argument will receive all actions', function (done) {
    const store = new Store()
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


