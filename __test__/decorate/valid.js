/**
 * @Author sugo.io<asd>
 * @Date 17-10-19
 */
import { ok, equal } from 'assert'
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
} from '../../src/decorate/validator'
import { Validator } from '../../src/middleware/store-validator/Validator'

describe('Validator.valid', function () {

  // enum
  it(`Set value that not Enum type to a Enum property will receive error message`, function (done) {

    const En = { a: 0, b: 1 }

    class D extends Validator {
      @Enum(En)
      val = null
    }

    const d = new D()

    d.set('val', En.b)
    equal(d.getValid(), null)

    d.set('val', 2)
    equal(d.getValid().val.length, 1)

    done()
  })

  // pattern
  it(`Set value that not matched Pattern to a Pattern property will receive error message`, function (done) {

    class D extends Validator {
      @Pattern(/\d/)
      val = null
    }

    const d = new D()

    d.set('val', 1)
    equal(d.getValid(), null)

    d.set('val', 'a')
    equal(d.getValid().val.length, 1)

    done()
  })

  // require
  it(`Set undefined or empty string to a Required property will receive error message`, function (done) {

    class D extends Validator {
      @Required()
      val = null
    }

    const d = new D()

    d.set('val', 1)
    equal(d.getValid(), null)

    d.set('val', void 0)
    equal(d.getValid().val.length, 1)

    d.set('val', [])
    equal(d.getValid(), null)

    d.set('val', '')
    equal(d.getValid().val.length, 1)

    done()
  })

  // max length
  it(`Set value that not string type to a MaxLen property will receive error message`, function (done) {

    class D extends Validator {
      @MaxLen(2)
      val = null
    }

    const d = new D()

    d.set('val', void 0)
    equal(d.getValid().val.length, 1)

    d.set('val', 'aa')
    equal(d.getValid(), null)

    d.set({ val: 1 })
    equal(d.getValid().val.length, 1)
    done()
  })

  it(`@MaxLen(2) property value's length must be less than or equal 2`, function (done) {

    class D extends Validator {
      @MaxLen(2)
      val = null
    }

    const d = new D()

    d.set('val', '123')
    equal(d.getValid().val.length, 1)

    d.set('val', '1')
    equal(d.getValid(), null)

    d.set({ val: '12' })
    equal(d.getValid(), null)

    done()
  })

  it(`@MinLen(2) property value's length must be greater than or equal 2`, function (done) {
    class D extends Validator {
      @MinLen(2)
      val = null
    }

    const d = new D()

    d.set('val', void 0)
    equal(d.getValid().val.length, 1)

    d.set('val', 'aa')
    equal(d.getValid(), null)

    d.set({ val: '1' })
    equal(d.getValid().val.length, 1)
    done()
  })

  // range length
  it(`@RangeLen([1,3]) property value's length must be greater than or equal 1 less than or equal 3 `, function (done) {
    class D extends Validator {
      @RangeLen(1, 3)
      val = null
    }

    const d = new D()

    d.set('val', void 0)
    equal(d.getValid().val.length, 1)

    d.set('val', 'aa')
    equal(d.getValid(), null)

    d.set({ val: '1234' })
    equal(d.getValid().val.length, 1)
    done()
  })

  // max
  it(`Set value that greeter than n to @Max(n) will receive error message`, function (done) {
    class D extends Validator {
      @Max(2)
      val = null
    }

    const d = new D()

    d.set('val', void 0)
    equal(d.getValid().val.length, 1)

    d.set('val', 0)
    equal(d.getValid(), null)

    d.set({ val: 3 })
    equal(d.getValid().val.length, 1)
    done()
  })

  // min
  it(`Set value that less than n to @Min(n) will receive error message`, function (done) {
    class D extends Validator {
      @Min(2)
      val = null
    }

    const d = new D()

    d.set('val', void 0)
    equal(d.getValid().val.length, 1)

    d.set('val', 3)
    equal(d.getValid(), null)

    d.set({ val: 1 })
    equal(d.getValid().val.length, 1)
    done()
  })

  it(`@Range([1,3]) property value must be greater than or equal 1 less than or equal 3`, function (done) {
    class D extends Validator {
      @Range(1, 3)
      val = null
    }

    const d = new D()

    d.set('val', void 0)
    equal(d.getValid().val.length, 1)

    d.set('val', 2)
    equal(d.getValid(), null)

    d.set({ val: 0 })
    equal(d.getValid().val.length, 1)
    done()
  })
})
