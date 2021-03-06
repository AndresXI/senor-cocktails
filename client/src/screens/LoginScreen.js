import React from 'react'
import { Link } from 'react-router-dom'

const Login = (props) => {
  const submitHandler = (event) => {
    event.preventDefault()
  }

  return (
    <div className='formContainer-bg'>
      <div className='formContainer container'>
        <Link to='/'>
          <img
            alt='logo'
            id='logo'
            src='https://firebasestorage.googleapis.com/v0/b/senor-cocktails.appspot.com/o/Logo.jpg?alt=media&token=db113644-029b-4eb3-9467-32fd50ad84ac'
          />
        </Link>
        <form onSubmit={submitHandler} className='formContainer__form'>
          <h1>Login</h1>
          <input type='text' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <button className='btn__primary'>Login</button>
          <p>
            Can't log in? <Link to='/signup'>Sign up for an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
