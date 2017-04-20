import React from 'react'
import {connect} from 'react-redux'
import {facebookLogin} from '../actions/auth.js'

let LoginUser = ({ dispatch }) => {
  return (
      <div>
        <button onclick={e => {
          e.preventDefault()
          dispatch(facebookLogin())
        }}></button>
      </div>
    )
}

LoginUser = connect()(LoginUser)

export default LoginUser
