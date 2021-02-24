import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../hooks/use-auth';
import { UserPage } from '../components/User/UserPage/UserPage';
import firebase from '../firebase';
import { IUser } from '../interfaces/IUser';

export const UserContainer = () => {
    const auth = useAuth();
    const [userInfo, setUserInfo] = useState<IUser | null | undefined | any>();
    var firebaseRef = firebase.database().ref("users");

    useEffect(() => {
        firebaseRef.orderByChild('email').equalTo(auth.user.email).on("child_added", data => {
            setUserInfo(data.val());
        })
    }, [auth.user.email])

    const userStuff = useMemo(() => {
        return <UserPage user={auth.user} userInfo={userInfo} />
    }, [auth.user, userInfo])

    return (
        <div>
            {userStuff}
        </div>
    )
}