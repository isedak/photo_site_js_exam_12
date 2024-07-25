import { FunctionComponent, ReactElement, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppDispatch, AppState } from "../../../store/store";
import { checkToken, initState } from "../../../store/users/users.slice";
import Logo from "../Logo/Logo";
import './NavBar.css';

const NavBar: FunctionComponent = (): ReactElement => {
    const { user, isAuth } = useSelector((state: AppState) => state.users, shallowEqual);
    const dispatch: AppDispatch = useDispatch();

    const logoutHandler = () => {
        localStorage.removeItem('token');
        dispatch(initState());
        window.location.reload();
    };

    useEffect(() => {
        dispatch(checkToken())
    }, []);

    return (
        <header className={"NavBar-background"}>
            <div className="NavBar-container">
                <div className={"NavBar-logo"}>
                    <Logo />
                </div>
                <nav className="NavBar-links-row">
                    {isAuth && user ?
                        <>
                            <NavLink to={`users/${user._id}`} className="NavBar-username">
                                {user.username}
                            </NavLink>
                            <button className="NavBar-link" onClick={logoutHandler}>Logout</button>
                        </>
                        :
                        <>
                            <NavLink className="NavBar-link" to={'/register'}>Register</NavLink>
                            <NavLink className="NavBar-link" to={'/login'}>Login</NavLink>
                        </>
                    }
                </nav>
            </div>
        </header>
    );
};

export default NavBar;