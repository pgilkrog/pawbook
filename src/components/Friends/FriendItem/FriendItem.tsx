import React from 'react';
import firebase from '../../../firebase';

import './FriendItem.css';
import { IUser } from '../../../interfaces/IUser';
import { useAuth } from '../../../hooks/use-auth';

interface IProps {
    user: IUser
}

export const FriendItem: React.FC<IProps> = props => {
    const auth = useAuth();

    const addFriend = () => {
        const friendData = {
            email: props.user.email,
            friendPhoto: props.user.photoURL,
            friendName: props.user.displayName
        }

        firebase.database().ref('users').orderByChild('email').equalTo(auth.user.email).on('child_added', data => {
            console.log("data", data.val(), data.key)
            firebase.database().ref('users/' + data.key).child('friends').push(friendData);
        });   
    }

    return (
        <div className="FriendItemWrap">
            <div className="FriendItemInfo">
                <img src="http://placehold.it/32x32" alt="" />
                <strong> {props.user.email}</strong>                
            </div>
            <div className="FriendItemButtons">
                <button onClick={addFriend}>Add friend</button>
            </div>
        </div>
    );
};