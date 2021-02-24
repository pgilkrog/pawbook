import React from 'react';
import { useAuth } from '../../../hooks/use-auth';

export const Login = () => {
    const auth = useAuth();
    const onSubmitHandler = (event: any) => {
        event.preventDefault();
        
        auth.signin(event.target.email.value, event.target.password.value);
    }

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <input type="text" name="email" placeholder="Email..." /> <br />
                <input type="password" name="password" placeholder="Password..." /> <br />
                <button>Login</button>
            </form>
        </div>
    );
}