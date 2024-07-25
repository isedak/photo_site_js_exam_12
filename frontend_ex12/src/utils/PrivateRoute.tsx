import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AppDispatch, AppState } from '../store/store';
import { checkToken } from '../store/users/users.slice';

const PrivateRoute: React.FunctionComponent = (): React.ReactElement => {

    const { isAuth } = useSelector((state: AppState) => state.users, shallowEqual);
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(checkToken())
    }, []);
    
    return (
        isAuth
            ?
            <Outlet />
            :
            <Navigate to='/login' replace state={{ from: location }} />
    )
};

export default PrivateRoute;