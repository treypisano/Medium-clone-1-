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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
  
    if (sessionUser) return <Redirect to="/" />;
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors([]);
      dispatch({ type: CLOSED_MODEL, payload: "closing modal" })
      return dispatch(loginUser({ email, password })) // syntactic sugar, key name equal to value 
        .catch(async (res) => {
          let data;
          try {
            data = await res.clone().json();
          } catch {
            data = await res.text(); 
          }
          if (data?.errors) setErrors(data.errors);
          else if (data) setErrors([data]);
          else setErrors([res.statusText]);
        }); 
      // if logged in succesful, on submit close the modal
        
    }  

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