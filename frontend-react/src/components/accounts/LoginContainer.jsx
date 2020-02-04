import React from 'react';
import Store from '../../Store/store';
import Login from './login';

const LoginContainer = () => (
    <Store.Consumer>
        {store => (
            <Login onLogin={store.onLogin}/>
        )}
    </Store.Consumer>
)
export default LoginContainer;


