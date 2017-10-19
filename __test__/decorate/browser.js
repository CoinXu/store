/**
 * @Author sugo.io<asd>
 * @Date 17-10-19
 */

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

const Femal = {

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

  femal = null
}
