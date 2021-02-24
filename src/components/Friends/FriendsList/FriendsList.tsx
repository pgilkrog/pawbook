import React from 'react';

import './FriendsList.css';
import { FriendItem } from '../FriendItem/FriendItem';
import { IUser } from '../../../interfaces/IUser';

interface IProps {
    users: IUser[]
}

export const FriendsList: React.FC<IProps> = props => {
    return (
        <div className="FriendListWrap">
            <h1>FriendList</h1>
            {props.users.map((user: IUser) => <FriendItem key={user.uid} user={user} />)}  
        </div>
    );
}