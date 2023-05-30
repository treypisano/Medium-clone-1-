import Modal from 'react-modal';
import LoginFormPage from '../LoginForm';

export default function LoginPopup({ loginPopup }) {
    return (
        <Modal isOpen={loginPopup}>
            <h2>Sign In</h2>
            <LoginFormPage></LoginFormPage>
        </Modal>
    )
    
}