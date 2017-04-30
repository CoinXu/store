/**
 * Created on 30/04/2017.
 */

import React from 'react'
import Controller from '../controller'

class View extends React.Component {
  constructor () {
    super()
    this.store = new Controller()
    this.state = this.store.getState()
    this.store.subscribe(state => this.setState(state))
  }
  
  render () {
    const { vm, validate }= this.state
    const style = { padding: '10px' }
    const labelStyle = { paddingRight: '10px' }
    return (
      <div style={{ width: '50%', margin: '100px auto' }}>
        <div style={style}>
          <p>
            <label htmlFor="nickname" style={labelStyle}>nickname</label>
            <input
              type="text"
              id="nickname"
              value={vm.nickname}
              onChange={e => this.store.update('nickname', e.target.value.trim())}
            />
          </p>
          {validate.nickname ? (<p>{validate.nickname}</p>) : null}
        </div>
        <div style={style}>
          <p>
            <label htmlFor="email" style={labelStyle}>email</label>
            <input
              type="text"
              id="email"
              value={vm.email}
              onChange={e => this.store.update('email', e.target.value.trim())}
            />
          </p>
          {validate.email ? (<p>{validate.email}</p>) : null}
        </div>
        <div style={style}>
          <p>
            <label htmlFor="password" style={labelStyle}>password</label>
            <input
              type="text"
              id="password"
              value={vm.password}
              onChange={e => this.store.update('password', e.target.value.trim())}
            />
          </p>
          {validate.password ? (<p>{validate.password}</p>) : null}
        </div>
        {
          !validate.nickname && !validate.email && !validate.password
            ? (
              <div style={style}>
                <button onClick={() => this.store.create()}>创建新用户</button>
              </div>
            )
            : null
        }
        {vm.signUp ? (<p>创建用户成功</p>) : null}
      </div>
    )
  }
}

export default View