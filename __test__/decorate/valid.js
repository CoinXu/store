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

describe('Validator.valid', function () {

  // enum
  it(`Set value that not Enum type to a Enum property will receive error message`, function (done) {
    const En = { a: 0, b: 1 }

    class D {
      @Enum(En)
      en = En.a
    }

    const d = new D()

    equal(d.message, null)

    d.en = En.b
    equal(d.message, null)

    d.en = 2
    ok(d.message.indexOf('en') !== -1)

    done()
  })

  // pattern
  it(`Set value that not matched Pattern to a Pattern property will receive error message`, function (done) {

    class D {
      @Pattern(/\d/)
      pattern = 0
    }

    const d = new D()

    equal(d.message, null)

    d.pattern = 1
    equal(d.message, null)

    d.pattern = 'a'
    ok(d.message.indexOf('pattern') !== -1)

    done()
  })

  // require
  it(`Set undefined or empty string to a Required property will receive error message`, function (done) {
    class D {
      @Required()
      req = 0
    }

    const d = new D()

    equal(d.message, null)

    d.req = 1
    equal(d.message, null)

    d.req = void 0
    ok(d.message.indexOf('req') !== -1)

    d.req = []
    equal(d.message, null)

    d.req = ''
    ok(d.message.indexOf('req') !== -1)

    done()
  })

  // max length
  it(`Set value that not string type to a MaxLen property will receive error message`, function (done) {
    class D {
      @MaxLen(2)
      str = null
    }

    const d = new D()

    equal(d.message, null)

    d.str = 0
    ok(d.message.indexOf('str') !== -1)

    d.str = '1'
    equal(d.message, null)
    done()
  })

  it(`@MaxLen(2) property value's length must be less than or equal 2`, function (done) {
    class D {
      @MaxLen(2)
      str = null
    }

    const d = new D()

    equal(d.message, null)

    d.str = '1'
    equal(d.message, null)

    d.str = '123'
    ok(d.message.indexOf('str') !== -1)

    d.str = '12'
    equal(d.message, null)

    done()
  })

  // min length
  it(`Set value that not string type to a MinLen property will receive error message`, function (done) {
    class D {
      @MinLen(2)
      str = null
    }

    const d = new D()

    equal(d.message, null)

    d.str = 0
    ok(d.message.indexOf('str') !== -1)

    d.str = '12'
    equal(d.message, null)
    done()
  })

  it(`@MinLen(2) property value's length must be greater than or equal 2`, function (done) {
    class D {
      @MinLen(2)
      str = null
    }

    const d = new D()

    equal(d.message, null)

    d.str = '1'
    ok(d.message.indexOf('str') !== -1)

    d.str = '123'
    equal(d.message, null)

    d.str = '12'
    equal(d.message, null)

    done()
  })

  // range length
  it(`Set value that not string type to a RangeLen property will receive error message`, function (done) {
    class D {
      @RangeLen([0, 2])
      str = null
    }

    const d = new D()

    equal(d.message, null)

    d.str = 0
    ok(d.message.indexOf('str') !== -1)

    d.str = '1'
    equal(d.message, null)
    done()
  })

  it(`@RangeLen([1,3]) property value's length must be greater than or equal 1 less than or equal 3 `, function (done) {
    class D {
      @RangeLen([1, 3])
      str = null
    }

    const d = new D()

    equal(d.message, null)

    d.str = ''
    ok(d.message.indexOf('str') !== -1)

    d.str = '123'
    equal(d.message, null)

    d.str = '1234'
    ok(d.message.indexOf('str') !== -1)

    done()
  })

  // max
  it(`Set value that greeter than n to @Max(n) will receive error message`, function (done) {
    class D {
      @Max(2)
      n = -1
    }

    const d = new D()

    equal(d.message, null)

    d.n = 3
    ok(d.message.indexOf('n') !== -1)

    d.n = 2
    equal(d.message, null)

    done()
  })

  // min
  it(`Set value that less than n to @Min(n) will receive error message`, function (done) {
    class D {
      @Min(2)
      n = 3
    }

    const d = new D()

    equal(d.message, null)

    d.n = 1
    ok(d.message.indexOf('n') !== -1)

    d.n = 4
    equal(d.message, null)

    done()
  })

  // min
  it(`Set value that not in [n, m] to @Range([n, m]) will receive error message`, function (done) {
    class D {
      @Range([1, 3])
      n = null
    }

    const d = new D()

    equal(d.message, null)

    d.n = -1
    ok(d.message.indexOf('n') !== -1)

    d.n = 3
    equal(d.message, null)

    d.n = 4
    ok(d.message.indexOf('n') !== -1)

    d.n = 2
    equal(d.message, null)

    done()
  })
})
