import React from 'react';

import './WelcomePage.css';
import { Login } from '../Authentication/Login/Login';
import { CreateUser } from '../Authentication/CreateUser/CreateUser';

export const WelcomePage = () => {
    return (
        <div className="WelcomeWrap"> 
            <div className="WelcomeTop">
                <h1>Welcome to Pawbook</h1>
            </div>
            <div className="WelcomeImg">
                <img src="https://cdn.pixabay.com/photo/2019/07/10/14/41/start-4328799_960_720.png" alt="" width="300" />
            </div>
            <div className="WelcomeLog">
                <CreateUser /> <br />
                <Login />
            </div>
           
        </div>
    );
}