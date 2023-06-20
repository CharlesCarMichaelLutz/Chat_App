import React from 'react'
import {Link} from 'react-router-dom'
import rabbit from '../App'

function LandingPage () {
  return (
    <div className='landingPage--container'>
      <header className='landingPage--header'>
        <img src={rabbit}
            className='landingPage--logo'/>
        <h3 className='landingPage--title'>Rabbit Chat</h3>
      </header>

      <main className='landingPage--main'>
        <div className='landingPage--links'>
          <label htmlFor='guest--button'>View as guest</label>
          <Link to='/chatroom' className='guest--button'>Guest</Link>

          <label htmlFor='createaccount--button'>Create an account</label>
          <Link to='/createaccount' className='createaccount-button'>Sign Up</Link>

          <label htmlFor='login--button'>Already have an account?</label>
          <Link to='/login' className='login--button'>Log In</Link>
        </div>
      </main>
    </div>
  )
}

export default LandingPage
