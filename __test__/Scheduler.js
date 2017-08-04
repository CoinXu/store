/**
 * Created by asd on 17-8-4.
 */

import { Scheduler } from '../src/utils/Scheduler'
import { equal } from 'assert'

describe('Scheduler', function () {

  const scheduler = new Scheduler()

  it('callbacks that in scheduler invoke async and ordered', function (done) {
    let count = 0
    scheduler.push(function () {
      count++
    })
    scheduler.push(function () {
      count++
    })
    scheduler.push(function () {
      equal(count, 2)
      done()
    })
  })
})
