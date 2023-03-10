import classes from './ProfileForm.module.css';
import { useContext, useRef } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
    const newPasswordRef = useRef();
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const submitHandler = event => {
        event.preventDefault();

        const enteredNewPassword = newPasswordRef.current.value;

        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCZ25rkqlmyDKk7Zi_mtAVIlo31nDcg3sM', {
                method: 'POST',
                body: JSON.stringify({
                    idToken: authCtx.token,
                    password: enteredNewPassword,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        ).then((res) => {
            history.replace('/');
        })
    };

    return ( <
        form className = { classes.form }
        onSubmit = { submitHandler } >
        <
        div className = { classes.control } >
        <
        label htmlFor = 'new-password' > New Password < /label> <
        input type = 'password'
        id = 'new-password'
        ref = { newPasswordRef }
        /> <
        /div> <
        div className = { classes.action } >
        <
        button > Change Password < /button> <
        /div> <
        /form>
    );
}

export default ProfileForm;