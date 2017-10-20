/**
 * @Author sugo.io<asd>
 * @Date 17-10-19
 */

import { ok } from 'assert'
import { DateType, DateTypes } from '../../src/decorate/validator'
import { StoreModel } from '../../src/middleware/store-next-model/Model'

describe('Validator.DateType', function () {

  // bool
  it('Set value that not boolean type to a boolean property will receive error message', function (done) {
    class D extends StoreModel {
      @DateType(DateTypes.PRIM_BOOL)
      val = null
    }
    const d = new D()

    d.listen(msg => {
      ok(msg.val.length === 1)
      done()
    })
    d.set({ val: 0 })
  })

  // number
  it('Set value that not number type to a number property will receive error message', function (done) {
    class D extends StoreModel {
      @DateType(DateTypes.PRIM_NUM)
      num = null
    }
    const d = new D()

    d.listen(msg => {
      ok(msg.num.length === 1)
      done()
    })
    d.set({ num: '-1' })
  })

  // string
  it('Set value that not string type to a string property will receive error message', function (done) {
    class D extends StoreModel {
      @DateType(DateTypes.PRIM_STR)
      val = null
    }
    const d = new D()

    d.listen(msg => {
      ok(msg.val.length === 1)
      done()
    })
    d.set({ val: [] })
  })

  // null
  it('Set value that not null type to a null property will receive error message', function (done) {
    class D extends StoreModel {
      @DateType(DateTypes.PRIM_NL)
      val = null
    }
    const d = new D()

    d.listen(msg => {
      ok(msg.val.length === 1)
      done()
    })
    d.set({ val: 0 })
  })

  // undef
  it('Set value that not undefined type to a undefined property will receive error message', function (done) {
    class D extends StoreModel {
      @DateType(DateTypes.PRIM_UNDEF)
      val = null
    }
    const d = new D()

    d.listen(msg => {
      ok(msg.val.length === 1)
      done()
    })
    d.set({ val: 1 })
  })

  // symbol
  it('Set value that not symbol type to a symbol property will receive error message', function (done) {
    class D extends StoreModel {
      @DateType(DateTypes.PRIM_SYMBOL)
      val = null
    }
    const d = new D()

    d.listen(msg => {
      ok(msg.val.length === 1)
      done()
    })
    d.set({ val: 0 })
  })

  // object
  it('Set value that not object type to a object property will receive error message', function (done) {
    class D extends StoreModel {
      @DateType(DateTypes.OBJ_O)
      val = null
    }
    const d = new D()

    d.listen(msg => {
      ok(msg.val.length === 1)
      done()
    })
    d.set({ val: 0 })
  })

  // array
  it('Set value that not array type to a array property will receive error message', function (done) {
    class D extends StoreModel {
      @DateType(DateTypes.OBJ_A)
      val = null
    }
    const d = new D()

    d.listen(msg => {
      ok(msg.val.length === 1)
      done()
    })
    d.set({ val: {} })
  })
})