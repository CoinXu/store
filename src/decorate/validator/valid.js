/**
 * @Author sugo.io<asd>
 * @Date 17-10-19
 */

/**
 * 验证结果消息模版解析
 * @param {string} key
 * @param {string} type
 * @param {string} template
 * @return {string}
 * ```js
 * parse('a', 'Number', '{{key}}: Not {{type}} Error') // 'a: Not Number Error'
 * ```
 */
function parse (key, type, template) {
  return template
    .replace(/{{\s*key\s*}}/, key.toString())
    .replace(/{{\s*type\s*}}/, type.toString())
}

/**
 * 验证器，传入value，返回boolean值
 * @typedef {callback} Validator
 * @param {*} value
 * @param {Object} target
 * @return {boolean}
 */

/**
 * 传入验证器及信息，返回
 * @param {Validator} validator
 * @param {string} msg
 * @param {string} [messageKey=message]
 * @return {ValidDecorate}
 */
function decorate (validator, msg, messageKey = 'message') {

  /**
   * @param {Object} target
   * @param {string} key
   * @param {InitializeDescriptor|ValidDescriptor} descriptor
   * @return {ValidDescriptor}
   */
  function wrapper (target, key, descriptor) {

    function validator_wrapper (value) {
      if (!validator(value, target)) {
        target[messageKey] = parse(key, '', msg)
        return false
      }
      target[messageKey] = null
      return true
    }

    const { get, set, initializer } = descriptor

    let buf = get ? get.call(target) : initializer.call(target)

    // 如果初始值为null，则不验证
    // 如果初始值验证不通过则重置为undefined
    if (buf !== null && !validator_wrapper(buf)) {
      buf = void 0
    }

    const desc = {
      configurable: false,
      enumerable: true,
      // TODO 预先生成
      get(){
        return buf
      },
      // TODO 预先生成
      set(value){

        // 如果某一个set返回了false，则直接返回
        if (set && !set.call(target, value)) {
          return false
        }

        value = get ? get.call(target) : value
        if (validator_wrapper(value)) {
          buf = value
          return true
        } else {
          return false
        }
      }
    }

    desc.__proto__ = null

    return desc
  }

  return wrapper
}

export {
  parse,
  decorate
}
