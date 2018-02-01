/**
 * @author sugo.io<asd>
 * @date 29-11-17
 * @description Validator基类测试用例
 */

import { equal } from "assert"
import {
  Enum,
  Pattern,
  Required,

  MaxLen,
  MinLen,
  RangeLen,

  Max,
  Min,
  Range
} from "../../src/build-in/validator/decorate"

import { Validator } from "../../src/build-in/validator/impl/Validator"

describe('Validator.valid', function () {

  // enum
  it(`Set value that not Enum type to a Enum property will receive error message`, function (done) {

    enum En { a, b }

    class D extends Validator<{ val: any }> {
      @Enum(En)
      val: En = null
    }

    const d = new D()

    d.set('val', En.b)
    equal(d.getValid(), null)

    d.set('val', 2)
    equal(typeof d.getValid().val, 'string')

    done()
  })

  // pattern
  it(`Set value that not matched Pattern to a Pattern property will receive error message`, function (done) {

    class D extends Validator<{ val: any }> {
      @Pattern(/\d/)
      val: string = null
    }

    const d = new D()

    d.set('val', 1)
    equal(d.getValid(), null)

    d.set('val', 'a')
    equal(typeof d.getValid().val, 'string')

    done()
  })

  // require
  it(`Set undefined or empty string to a Required property will receive error message`, function (done) {

    class D extends Validator<{ val: any }> {
      @Required()
      val: any = null
    }

    const d = new D()

    d.set('val', 1)
    equal(d.getValid(), null)

    d.set('val', void 0)
    equal(typeof d.getValid().val, 'string')

    d.set('val', [])
    equal(d.getValid(), null)

    d.set('val', '')
    equal(typeof d.getValid().val, 'string')

    done()
  })

  // max length
  it(`Set value that not string type to a MaxLen property will receive error message`, function (done) {

    class D extends Validator<{ val: any }> {
      @MaxLen(2)
      val: string = null
    }

    const d = new D()

    d.set('val', void 0)
    equal(typeof d.getValid().val, 'string')

    d.set('val', 'aa')
    equal(d.getValid(), null)

    d.set({ val: 1 })
    equal(typeof d.getValid().val, 'string')
    done()
  })

  it(`@MaxLen(2) property value's length must be less than or equal 2`, function (done) {

    class D extends Validator<{ val: any }> {
      @MaxLen(2)
      val: string = null
    }

    const d = new D()

    d.set('val', '123')
    equal(typeof d.getValid().val, 'string')

    d.set('val', '1')
    equal(d.getValid(), null)

    d.set({ val: '12' })
    equal(d.getValid(), null)

    done()
  })

  it(`@MinLen(2) property value's length must be greater than or equal 2`, function (done) {
    class D extends Validator<{ val: any }> {
      @MinLen(2)
      val: string = null
    }

    const d = new D()

    d.set('val', void 0)
    equal(typeof d.getValid().val, 'string')

    d.set('val', 'aa')
    equal(d.getValid(), null)

    d.set({ val: '1' })
    equal(typeof d.getValid().val, 'string')
    done()
  })

  // range length
  it(`@RangeLen([1,3]) property value's length must be greater than or equal 1 less than or equal 3 `, function (done) {
    class D extends Validator<{ val: any }> {
      @RangeLen(1, 3)
      val: string = null
    }

    const d = new D()

    d.set('val', void 0)
    equal(typeof d.getValid().val, 'string')

    d.set('val', 'aa')
    equal(d.getValid(), null)

    d.set({ val: '1234' })
    equal(typeof d.getValid().val, 'string')
    done()
  })

  // max
  it(`Set value that greeter than n to @Max(n) will receive error message`, function (done) {
    class D extends Validator<{ val: any }> {
      @Max(2)
      val: number = null
    }

    const d = new D()

    d.set('val', void 0)
    equal(typeof d.getValid().val, 'string')

    d.set('val', 0)
    equal(d.getValid(), null)

    d.set({ val: 3 })
    equal(typeof d.getValid().val, 'string')
    done()
  })

  // min
  it(`Set value that less than n to @Min(n) will receive error message`, function (done) {
    class D extends Validator<{ val: any }>{
      @Min(2)
      val: number = null
    }

    const d = new D()

    d.set('val', void 0)
    equal(typeof d.getValid().val, 'string')

    d.set('val', 3)
    equal(d.getValid(), null)

    d.set({ val: 1 })
    equal(typeof d.getValid().val, 'string')
    done()
  })

  it(`@Range([1,3]) property value must be greater than or equal 1 less than or equal 3`, function (done) {
    class D extends Validator<{ val: any }> {
      @Range(1, 3)
      val: number = null
    }

    const d = new D()

    d.set('val', void 0)
    equal(typeof d.getValid().val, 'string')

    d.set('val', 2)
    equal(d.getValid(), null)

    d.set({ val: 0 })
    equal(typeof d.getValid().val, 'string')
    done()
  })
})