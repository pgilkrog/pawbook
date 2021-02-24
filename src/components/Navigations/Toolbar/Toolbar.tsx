import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';

import './Toolbar.css';

export const Toolbar: React.FC = () => {
    const auth = useAuth();

    let navlinks = null;

    if (auth.user){
        navlinks = (
            <ul className="NavigationItem">
                <img src={auth.user.photoURL} height="30" width="30" alt="" />
                <li><NavLink to={'/UserPage'} exact>{auth.user.displayName}</NavLink></li>
                <li><NavLink to={'/Home'} exact>Home</NavLink></li>
                <li><NavLink to={'/Friends'} exact>Friends</NavLink></li>
                <li><NavLink to={'/Groups'} exact>Groups</NavLink></li>
                <li><NavLink to={"/Logout"} exact>Logout</NavLink></li>
            </ul>                   
        )
    }

    return (
        <header>
            <strong>Pawbook</strong>
            <nav>
                {navlinks}
            </nav>
        </header>
    );
}