import Modal from 'react-modal';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser, createUser } from '../../store/usersReducer';
import './loginpopup.css'
import { LOG_IN } from '../../store/utilitiesReducer';
import { CLOSED_MODEL } from '.';
const REMOVE_ERRORS = "errors/REMOVE_ERROR";
const DEMO_EMAIL = "demo@demo.com"
const DEMO_PASSWORD = "password"

export default function LoginPopup() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.users);
    const modalOpen = useSelector(state => state.utilities.modalOpen)
    const errors = useSelector((state) => {
      if (Object.keys(state.errors).length !== 0){ // if theres no errors
        return state.errors
      } else {
        return []
      }
    })

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignInSubmit = (e) => {
      e.preventDefault();
      dispatch(loginUser({ email, password }))
      .then(
        function (value) {
          if (value.user) {
            dispatch({type: LOG_IN, payload: "logging in"})
            dispatch({type: REMOVE_ERRORS, payload: "clearing all errors"})
          }
        }
      )
        
    }  

    const handleModalClose = (e) => {
      dispatch(dispatch({type: CLOSED_MODEL, payload: "closing"})
      )
    }

    function handleDemoClick () {
      dispatch(loginUser({email: DEMO_EMAIL, password: DEMO_PASSWORD}))
      dispatch({type: LOG_IN, payload: "logging in"})
      dispatch({type: REMOVE_ERRORS, payload: "clearing all errors"})
    }

    const handleSignUpSubmit = (e) => {
      e.preventDefault();

      dispatch(createUser({ email, password }))
      .then(
        function (value) {
          if (value.user) {
            dispatch({type: LOG_IN, payload: "logging in"})
            dispatch({type: REMOVE_ERRORS, payload: "clearing all errors"})
          }
        }
      )
        
    } 
    // These fragments should be components, will refactor if i have time
    const signInFragment = <> 
            <h1>Welcome back.</h1>
                <form onSubmit={handleSignInSubmit}>
                    <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <div className='grouped-input'>
                      <label>
                      Email
                      <input
                          className='email-input'
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                      />
                      </label>
                    </div>
                    <div className='grouped-input'>
                    <label>
                    Password
                    <input
                        className='password-input'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </label>
                    </div>
                    <button className='auth-button' type="submit">Log In</button>
                </form>
                <button className='auth-button demo-button' onClick={handleDemoClick}>Demo User</button>
      </>

    const signUpFragment = <>
      <h1 >Join Premium.</h1>
        <form onSubmit={handleSignUpSubmit}>
          <ul>
            {errors.map((error) => <li key={error}>{error}</li>)}
          </ul>
          <div className='grouped-input'>
            <label>
              Email
              <input
                className='email-input'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className='grouped-input'>
            <label>
              Password
              <input
                className='password-input'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button className='auth-button' type="submit">Sign Up</button>
        </form>
        <button className='auth-button demo-button' onClick={handleDemoClick}>Demo User</button>
    </>

    // function changeNavBarZIndex() {

    // }

    if (modalOpen === "signIn") {
      return (
        <Modal isOpen={modalOpen === "signIn"} 
        className='popup'>
          <div className='close-modal'>
            <p onClick={handleModalClose}>X</p>
          </div>
          <div className='under-x'>
            {signInFragment}
          </div>
        </Modal>
    )} else if (modalOpen === "signUp") {
      return (
        <Modal isOpen={modalOpen === "signUp"}
        className='popup'>
          <div className='close-modal'>
            <p onClick={handleModalClose}>X</p>
          </div>
          <div className='under-x'>
            {signUpFragment}
          </div>
        </Modal>
      )
    } 
}