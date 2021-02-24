import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../../../hooks/use-auth';

export const Logout = () => {
    const auth = useAuth();

    useEffect(() => {
        auth.signout()
    }, [auth])

    return (
        <div>
            <Redirect to="/Home" />
        </div>
    );
}