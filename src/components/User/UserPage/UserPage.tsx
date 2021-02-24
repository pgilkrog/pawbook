import React, { useState, useEffect} from 'react';
import { IUser } from '../../../interfaces/IUser';

interface Props {
    user: IUser
    userInfo: any
}

interface IFriend {
    displayName: string
    email: string
    photoURL: string
}

export const UserPage: React.FC<Props> = props => {
    let display = <div></div>;
    const [friends, setFriends] = useState([] as IFriend[]);

    useEffect(() => {
       const userFriends = [];
        if(props.userInfo){
            for (let item in props.userInfo.friends) {
                userFriends.push({
                    id: item,
                    ...props.userInfo.friends[item]
                })
            }

            setFriends(userFriends);
        } 
    }, [props.userInfo])

    if (props.user && props.userInfo) {
        display = (
            <div>
                <h1>Hej {props.user.displayName}</h1>
                <h2>Email {props.userInfo.email}</h2>
                {friends ? friends.map((friend: any) => <h3 key={friend.id}>{friend.friendName}</h3>) : <p>No comments!</p>}
            </div>
        )
    }   

    return (
        <div>
            {display}        
        </div>
    );
}