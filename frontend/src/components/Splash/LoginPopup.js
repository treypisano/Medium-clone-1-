import Modal from 'react-modal';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../store/usersReducer';
const OPEN_MODAL = "utilities/modal/OPEN_MODAL"
const CLOSED_MODEL = "utilities/modal/CLOSE_MODAL"

export default function LoginPopup({ loginPopup }) {
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
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(loginUser({ email, password })) // syntactic sugar, key name equal to value 
      // if logged in succesful, on submit close the modal
        
    }  
    console.log(errors)
    return (
        <Modal isOpen={modalOpen}>
            <h2>Sign In</h2>
            <>
            <h1>Login!</h1>
                <form onSubmit={handleSubmit}>
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
        </Modal>
    )
    
}