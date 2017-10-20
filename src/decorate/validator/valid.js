/**
 * @Author sugo.io<asd>
 * @Date 17-10-20
 */

const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * @param {string} temp
 * @param {Object} values
 * @return {string}
 * @example
 * ```js
 * template('{{key}} is {{value}}', {key:'k', value: 'v'}) // k is v
 * ```
 */
function template (temp, values) {
  for (let propKey in values) {
    if (!hasOwnProperty.call(values, propKey)) continue
    temp = temp.replace(new RegExp(`{{${propKey}}}`, 'g'), values[propKey])
  }
  return temp
}

/**
 * @typedef {Object} ValidatorBuffer
 * @property {string} msg
 * @property {Validator} validator
 */

/**
 * @typedef {Object} TargetValidator
 * @property {Object} target
 * @property {Object<string, Array<ValidatorBuffer>>} validator
 */

/**
 * @class 缓存验证器
 */
class ValidatorBuffer {
  constructor () {
    /** @type {Array<TargetValidator>} */
    this.buffer = []
  }

  /**
   * @param {Object} target
   * @param {string} key
   * @param {Validator} validator
   * @param {string} msg
   * @return {ValidatorBuffer}
   */
  add (target, key, validator, msg) {
    let buf = this.buffer.find(buf => buf.target === target)

    if (buf) {
      const arr = buf.validator[key] || (buf.validator[key] = [])
      arr.push({ msg, validator })
      return this
    }

    this.buffer.push({
      target,
      validator: {
        [key]: [{ msg, validator }]
      }
    })

    return this
  }

  /**
   * @param {Object} target
   * @return {Object<string, Array<ValidatorBuffer>>|null}
   */
  get (target) {
    return this.buffer.find(buf => buf.target === target) || null
  }

  /**
   * @param {Object} target
   * @return {ValidatorBuffer}
   */
  destroy (target) {
    this.buffer = this.buffer.filter(buf => buf.target !== target)
    return this
  }
}

const ValidatorDefaultBuffer = new ValidatorBuffer()

/**
 * @param {Validator} validator
 * @param {string} msg
 * @return {ValidDecorate}
 */
function decorate (validator, msg) {
  return function (target, key, descriptor) {
    ValidatorDefaultBuffer.add(target, key, validator, msg)
    return descriptor
  }
}

export {
  ValidatorDefaultBuffer,
  hasOwnProperty,
  decorate,
  template
}
