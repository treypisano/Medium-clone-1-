import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import logo from './icons8-pie-chart-64.png'
const OPEN_MODAL = "utilities/modal/OPEN_MODAL"

export default function NavBar() {
    const dispatch = useDispatch()

    function handleSignInClick() {
        dispatch({type: OPEN_MODAL, payload: "signIn"})
    }

    function handleSignUpClick() {
        dispatch({type: OPEN_MODAL, payload: "signUp"})
    }

    return (
        <div className='whole-nav-bar'>
            <div className='Nav-Bar'>
                <div className='logo'>
                    <Link to="/">
                        <img href="/" src={logo}></img>
                        <p id="title">Premium</p>    
                    </Link>  
                </div>
                    {/* <div className='Middle'>
                    </div> */}
                <div className='Nav-Links'>
                    <p>Our story</p>
                    <p>Membership</p>
                    <p onClick={handleSignInClick} className='Sign-In'>Sign In</p>
                    <p onClick={handleSignUpClick} id="Get-Started">Get Started</p>
                </div>
            </div>
        </div>
    )
}