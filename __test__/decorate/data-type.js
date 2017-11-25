/**
 * @Author sugo.io<asd>
 * @Date 17-10-19
 */

import { equal } from 'assert'
import { DataType, DataTypes } from '../../src/decorate/validator'
import { Validator } from '../../src/middleware/store-validator/Validator'

describe('Validator.DataType', function () {

  // bool
  it('Set value that not boolean type to a boolean property will receive error message', function () {
    class D extends Validator {
      @DataType(DataTypes.PRIM_BOOL)
      val = null
    }

    const d = new D()
    d.set({ val: 0 })
    equal(typeof d.getValid().val, 'string')
  })

  // number
  it('Set value that not number type to a number property will receive error message', function () {
    class D extends Validator {
      @DataType(DataTypes.PRIM_NUM)
      num = null
    }

    const d = new D()
    d.set({ num: '-1' })
    equal(typeof d.getValid().num, 'string')
  })

  // string
  it('Set value that not string type to a string property will receive error message', function () {
    class D extends Validator {
      @DataType(DataTypes.PRIM_STR)
      val = null
    }

    const d = new D()
    d.set({ val: [] })
    equal(typeof d.getValid().val, 'string')
  })

  // null
  it('Set value that not null type to a null property will receive error message', function () {
    class D extends Validator {
      @DataType(DataTypes.PRIM_NL)
      val = null
    }

    const d = new D()
    d.set({ val: 0 })
    equal(typeof d.getValid().val, 'string')
  })

  // undef
  it('Set value that not undefined type to a undefined property will receive error message', function () {
    class D extends Validator {
      @DataType(DataTypes.PRIM_UNDEF)
      val = null
    }

    const d = new D()
    d.set({ val: 1 })
    equal(typeof d.getValid().val, 'string')
  })

  // symbol
  it('Set value that not symbol type to a symbol property will receive error message', function () {
    class D extends Validator {
      @DataType(DataTypes.PRIM_SYMBOL)
      val = null
    }

    const d = new D()
    d.set({ val: 0 })
    equal(typeof d.getValid().val, 'string')
  })

  // object
  it('Set value that not object type to a object property will receive error message', function () {
    class D extends Validator {
      @DataType(DataTypes.OBJ_O)
      val = null
    }

    const d = new D()
    d.set({ val: 0 })
    equal(typeof d.getValid().val, 'string')
  })

  // array
  it('Set value that not array type to a array property will receive error message', function () {
    class D extends Validator {
      @DataType(DataTypes.OBJ_A)
      val = null
    }

    const d = new D()
    d.set({ val: {} })
    equal(typeof d.getValid().val, 'string')
  })
})