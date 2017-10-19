/**
 * @Author sugo.io<asd>
 * @Date 17-10-19
 */

function Rule (opt) {
  return function () {

  }
}

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

class Demo {
  @Range([0, 200])
  @DateType(DateTypes.PRIM_NUM)
  @Required()
  age = null

  @RangeLen([4, 32])
  @DateType(DateTypes.PRIM_STR)
  @Required()
  name = null

  @Enum(Gender)
  gender = null
}

const d = new Demo()
d.age = 0
d.name = 'demo'
d.gender = Gender.Female


class DemoX {
  @Rule([
    { required: true },
    { type: Number },
    { range: [0, 200] }
  ])
  age = null

  @Rule([
    { required: true },
    { type: String },
    { lenRange: [4, 32] }
  ])
  name = null

  @Rule({ enumData: Gender })
  gender = null
}

const dx = new DemoX()
dx.age = 0
dx.name = 'demo'
dx.gender = Gender.Female

