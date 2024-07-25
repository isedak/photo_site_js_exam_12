import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../../store/store'
import IUserDto from '../../interfaces/IUserDto';
import DarkButton from '../../components/UI/DarkButton/DarkButton';
import './LoginPage.css';
import { clearError, login } from '../../store/users/users.slice';
import { Link } from 'react-router-dom';

const LoginPage: React.FunctionComponent = (): React.ReactElement => {

    const { isAuth, loginShowError, loginErrorMessage } = useSelector((state: AppState) => state.users, shallowEqual);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();
    const [passwordFieldErrorMessage, setPasswordFieldErrorMessage] = useState<string>('');
    const [usernameFieldErrorMessage, setUsernameFieldErrorMessage] = useState<string>('');
    const [passwordStatus, setPasswordStatus] = useState(false)
    const [userValues, setUserValues] = useState<IUserDto>({
        username: '',
        password: ''
    });

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(clearError());
        setUsernameFieldErrorMessage('');
        setPasswordFieldErrorMessage('');
        setUserValues(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        });
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (userValues.username.trim() === '') {
            setUsernameFieldErrorMessage('Username is required!')
            return;
        };
        if (userValues.password.trim() === '') {
            setPasswordFieldErrorMessage('Password is required!')
            return;
        };
        dispatch(login(userValues));
    };

    useEffect(() => {
        if (isAuth) {
            navigate(location.state?.from ? location.state.from : '/');
        };
    }, [isAuth]);

    const changePasswordStatus = () => {
        setPasswordStatus(!passwordStatus)
    }

    return (
        <div className="LoginPage-container">
            <div className="LoginPage-background LoginPage-flex-row">
                <div className="LoginPage-column">
                    <h3 className="LoginPage-subtitle">Login:</h3>
                    {loginShowError ? <p className='LoginPage-error-text'>{loginErrorMessage}</p> : null}
                    <div className="LoginPage-form-column">
                        <form onSubmit={submitHandler}>
                            <div className="LoginPage-form-box">
                                <label className="LoginPage-label" htmlFor='username'>Username:</label>
                                <p className='LoginPage-error-text'>{usernameFieldErrorMessage}</p>
                                <input className={'LoginPage-input LoginPage-input-password-name'}
                                    type="text"
                                    onChange={inputHandler}
                                    name={'username'}
                                    value={userValues.username}
                                />
                                <label className="LoginPage-label" htmlFor='password'>Password:</label>
                                <p className='LoginPage-error-text'>{passwordFieldErrorMessage}</p>
                                <label className='LoginPage-label-password LoginPage-input'>
                                    <input className={'LoginPage-input-password LoginPage-input-password-name'}
                                        type={passwordStatus ? 'text' : 'password'}
                                        onChange={inputHandler}
                                        name={'password'}
                                        value={userValues.password}
                                    />
                                    <span className='LoginPage-show-password-text' onClick={changePasswordStatus}>{passwordStatus ? "Hide" : "Show"}</span>
                                </label>
                                <div className="LoginPage-btn-row">
                                    <Link to={'/register'} className='LoginPage-link'>Sign up now</Link>
                                    <DarkButton
                                        label={'Sign in'}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;