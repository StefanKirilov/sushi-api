import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import Cookies from 'js-cookies';
// import { Cookies } from 'react-cookie';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

import * as userService from '../services/userService';

const AuthContext = createContext();

// let cookie = read_cookie('auth');
// console.log(cookie);

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(read_cookie('auth'));

    const loginSubmitHandler = async (data) => {
        const result = await userService.login(data);
        setAuth(result);

        console.log(result);

        bake_cookie('auth', result);

        navigate("/");
    }

    const registerSubmitHandler = async (data) => {
        const result = await userService.register(data);
        setAuth(result);

        bake_cookie('auth', result);

        navigate("/");
    }

    const logoutHandler = async (data) => {
        setAuth({});

        delete_cookie('auth');

        // 
        // bake_cookie('shop', []);

        navigate("/");
    }

    const editProfileSubmitHandler = async (data) => {

        const result = await userService.editProfile(data);

        setAuth(result);

        bake_cookie('auth', result);
    }

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        editProfileSubmitHandler,
        userId: auth._id,
        email: auth.email,
        isAuthenticated: !!auth.accessToken,
    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;