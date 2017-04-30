/**
 * Created on 30/04/2017.
 */

export default function (action, state, next) {
  const user = state.user
  next({
    validate: {
      nickname: user.nickname ? '' : '昵称为必填项',
      email: user.email ? '' : '邮箱为必填项',
      password: user.password ? '' : '密码为必填项'
    }
  })
}
