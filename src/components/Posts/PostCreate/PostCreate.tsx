import React from 'react';
import firebase from '../../../firebase';

import { useAuth } from '../../../hooks/use-auth';

export const PostCreate: React.FC = () => {
    const auth = useAuth();
    const database = firebase.database().ref('posts');
    let fileRef: any = null;

    const onSubmitHandler = (event: any) => {
        event.preventDefault();
        fileRef.focus();

        const postData = {
            title: event.target.title.value,
            content: event.target.content.value,
            postedDate: Date.now(),
            postImg: "",
            userImg: auth.user.photoURL,
            userEmail: auth.user.email,
            userName: auth.user.displayName,
            like: 0,
            dislike: 0
        }

        database.push(postData);
    }

    return (
        <div>
            {auth.user ? 
            <form onSubmit={(e) => onSubmitHandler(e)}>
                <input type="text" placeholder="title..." name="title" style={{width: '500px'}} autoComplete="off" /> <br />
                <textarea name="content" rows={5} placeholder="Write your text..." style={{width: '500px'}} ></textarea><br />
                <input type="file" ref={(input: any) => fileRef = input} /> <br />           
                <input type="submit" value="Post" />
            </form> 
            : <p>You need to be logged in to post something!</p>}
        </div>
    );
}