/**
 * @author sugo.io<asd>
 * @date 29-11-17
 * @description 数据基础类型验证用例
 */

import { equal } from "assert"
import { DataType, DataTypes } from "../../src/build-in/validator/decorate"
import { Validator } from "../../src/build-in/validator/impl/Validator"

describe('Validator.DataType', function () {

  // bool
  it('Set value that not boolean type to a boolean property will receive error message', function () {
    class D extends Validator<{ val: any }> {
      @DataType(DataTypes.PRIM_BOOL)
      val: boolean = null
    }

    const d = new D()
    d.set({ val: 0 })
    equal(typeof d.getValid().val, 'string')
  })

  // number
  it('Set value that not number type to a number property will receive error message', function () {
    class D extends Validator<{ num: any }> {
      @DataType(DataTypes.PRIM_NUM)
      num: number = null
    }

    const d = new D()
    d.set({ num: '-1' })
    equal(typeof d.getValid().num, 'string')
  })

  // string
  it('Set value that not string type to a string property will receive error message', function () {
    class D extends Validator<{ val: any }> {
      @DataType(DataTypes.PRIM_STR)
      val: string = null
    }

    const d = new D()
    d.set({ val: [] })
    equal(typeof d.getValid().val, 'string')
  })

  // null
  it('Set value that not null type to a null property will receive error message', function () {
    class D extends Validator<{ val: any }> {
      @DataType(DataTypes.PRIM_NL)
      val: null = null
    }

    const d = new D()
    d.set({ val: 0 })
    equal(typeof d.getValid().val, 'string')
  })

  // undef
  it('Set value that not undefined type to a undefined property will receive error message', function () {
    class D extends Validator<{ val: any }> {
      @DataType(DataTypes.PRIM_UNDEF)
      val: undefined = null
    }

    const d = new D()
    d.set({ val: 1 })
    equal(typeof d.getValid().val, 'string')
  })

  // symbol
  it('Set value that not symbol type to a symbol property will receive error message', function () {
    class D extends Validator<{ val: any }> {
      @DataType(DataTypes.PRIM_SYMBOL)
      val: symbol = null
    }

    const d = new D()
    d.set({ val: 0 })
    equal(typeof d.getValid().val, 'string')
  })

  // object
  it('Set value that not object type to a object property will receive error message', function () {
    class D extends Validator<{ val: any }> {
      @DataType(DataTypes.OBJ_O)
      val: Object = null
    }

    const d = new D()
    d.set({ val: 0 })
    equal(typeof d.getValid().val, 'string')
  })

  // array
  it('Set value that not array type to a array property will receive error message', function () {
    class D extends Validator<{ val: any }> {
      @DataType(DataTypes.OBJ_A)
      val: any[] = null
    }

    const d = new D()
    d.set({ val: {} })
    equal(typeof d.getValid().val, 'string')
  })
})