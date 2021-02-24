import React from 'react';

import { useAuth } from '../../../hooks/use-auth';

export const CreateUser: React.FC = () => {
    const auth = useAuth();

    const onSubmitHandler = (event: any) => {
        event.preventDefault();

        const authUser = {
            email: event.target.email.value,
            password: event.target.password.value,
            displayName: event.target.firstName.value + " " + event.target.lastName.value,
            photoURL: event.target.photoURL.value
        }

        auth.signup(authUser)
    }

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <input type="text" name="firstName" placeholder="First name..." /> <br />
                <input type="text" name="lastName" placeholder="Last name..." /> <br />
                <input type="text" name="email" placeholder="Email..." /> <br />
                <input type="password" name="password" placeholder="Password..." /> <br />
                <input type="text" name="photoURL" placeholder="photoUrl..." /> <br />

                <button>Create</button>                
            </form>
        </div>
    );
}