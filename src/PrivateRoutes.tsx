import React, { Fragment } from 'react';
import { useAuth } from './hooks/use-auth';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PostsContainer } from './containers/PostsContainer';
import { FriendContainer } from './containers/FriendContainer';
import { CreateUser } from './components/Authentication/CreateUser/CreateUser';
import { UserContainer } from './containers/UserContainer';
import { Logout } from './components/Authentication/Logout/Logout';
import { Login } from './components/Authentication/Login/Login';
import { WelcomePage } from './components/WelcomePage/WelcomePage';

export const PrivateRoutes = () => {
    const auth = useAuth();

    if (auth.user) {
        return (
            <Fragment>
                <Switch>
                    <Route path="/Home" component={PostsContainer} />
                    <Route path="/Friends" component={FriendContainer} />
                    <Route path="/UserPage" component={UserContainer} />
                    <Route path="/Logout" component={Logout} /> 
                    <Redirect to="/Home" />
                </Switch>
            </Fragment>            
        )
    } else {
        return (
            <Fragment>
                <Switch>
                    <Route path="/Home" component={WelcomePage} />
                    <Route path="/CreateUser" component={CreateUser} />
                    <Route path="/Login" component={Login} />
                    <Redirect to="/Home" />
                </Switch>
            </Fragment>            
        )
    }
}