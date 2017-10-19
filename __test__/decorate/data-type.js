/**
 * @Author sugo.io<asd>
 * @Date 17-10-19
 */

import { ok } from 'assert'
import { DateType, DateTypes } from '../../src/decorate/validator'

describe('Validator.DateType', function () {

  class Demo {
    // primitive

    @DateType(DateTypes.PRIM_BOOL)
    bool = true

    @DateType(DateTypes.PRIM_NUM)
    num = 0

    @DateType(DateTypes.PRIM_STR)
    str = ''

    @DateType(DateTypes.PRIM_NL)
    nl = null

    @DateType(DateTypes.PRIM_UNDEF)
    undef = void 0

    @DateType(DateTypes.PRIM_SYMBOL)
    symbol = Symbol()

    // object
    @DateType(DateTypes.OBJ_O)
    obj = {}

    @DateType(DateTypes.OBJ_A)
    arr = []
  }

  const demo = new Demo()

  // bool
  it('Set value that not boolean type to a boolean property will receive error message', function (done) {
    demo.bool = 0
    done(ok(demo.message.indexOf('bool') !== -1))
  })

  // number
  it('Set value that not number type to a number property will receive error message', function (done) {
    demo.num = '-1'
    done(ok(demo.message.indexOf('num') !== -1))
  })

  // string
  it('Set value that not string type to a string property will receive error message', function (done) {
    demo.str = []
    done(ok(demo.message.indexOf('str') !== -1))
  })

  // null
  it('Set value that not null type to a null property will receive error message', function (done) {
    demo.nl = 0
    done(ok(demo.message.indexOf('nl') !== -1))
  })

  // undef
  it('Set value that not undefined type to a undefined property will receive error message', function (done) {
    demo.undef = 0
    done(ok(demo.message.indexOf('undef') !== -1))
  })

  // symbol
  it('Set value that not symbol type to a symbol property will receive error message', function (done) {
    demo.symbol = 0
    done(ok(demo.message.indexOf('symbol') !== -1))
  })

  // object
  it('Set value that not object type to a object property will receive error message', function (done) {
    demo.obj = 0
    done(ok(demo.message.indexOf('obj') !== -1))
  })

  // array
  it('Set value that not array type to a array property will receive error message', function (done) {
    demo.arr = 0
    done(ok(demo.message.indexOf('arr') !== -1))
  })
})