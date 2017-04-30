/**
 * Created on 30/04/2017.
 */

export default {
  create: async function (nickname, email, password) {
    // 模拟创建新用户
    return new Promise(resolve => setTimeout(
      resolve,
      1000,
      { success: true, result: { nickname, email, password } }
    ))
  }
}