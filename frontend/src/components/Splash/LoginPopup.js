import Modal from 'react-modal';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser, createUser } from '../../store/usersReducer';
import './loginpopup.css'
const OPEN_MODAL = "utilities/modal/OPEN_MODAL"
const CLOSED_MODEL = "utilities/modal/CLOSE_MODAL"


export default function LoginPopup() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.user);
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
  
    if (sessionUser) return <Redirect to="/" />;
  
    const handleSignInSubmit = (e) => {
      e.preventDefault();
      dispatch(loginUser({ email, password })) // syntactic sugar, key name equal to value 
      // if logged in succesful, on submit close the modal
        
    }  

    const handleSignUpSubmit = (e) => {
      e.preventDefault();
      dispatch(createUser({ email, password })) // syntactic sugar, key name equal to value 
      // if logged in succesful, on submit close the modal
        
    } 
    // These fragments should be components, will refactor if i have time
    const signInFragment = <> 
            <h1>Welcome back.</h1>
                <form onSubmit={handleSignInSubmit}>
                    <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </label>
                    <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </label>
                    <button type="submit">Log In</button>
                </form>
    </>

    const signUpFragment = <>
      <h1 >Join Premium.</h1>
        <form onSubmit={handleSignUpSubmit}>
          <ul>
            {errors.map((error) => <li key={error}>{error}</li>)}
          </ul>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Sign Up</button>
        </form>
    </>

    if (modalOpen === "signIn") {
      return (
        <Modal isOpen={modalOpen === "signIn"} 
        className='popup'>
            {signInFragment}
        </Modal>
    )} else if (modalOpen === "signUp") {
      return (
        <Modal isOpen={modalOpen === "signUp"}
        className='popup'>
            {signUpFragment}
        </Modal>
      )
    }
    
    
}