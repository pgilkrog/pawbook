import React, { useState, useEffect, useMemo } from 'react';

import firebase from '../firebase';
import { useAuth } from '../hooks/use-auth';

import { IUser } from '../interfaces/IUser';
import { FriendsList } from '../components/Friends/FriendsList/FriendsList';

export const FriendContainer = () => {
    const auth = useAuth();
    const [users, setUsers] = useState([] as IUser[]);
    const userData = firebase.database().ref('users');

    useEffect(() => {
        userData.on('value', response => {
            let users = response.val();
            const fetchedUsers = [] as IUser[];
            for (let user in users) {
                if(users[user].email !== auth.user.email){
                    fetchedUsers.push({
                        uid: user,
                        ...users[user] as IUser
                    })                    
                }
            }    
            setUsers(fetchedUsers);
        })
    }, [auth.user.email])

    const friendList = useMemo(() => {
        return <FriendsList users={users} />
    }, [users])

    return (
        <div>
            {friendList}
        </div>
    )
}