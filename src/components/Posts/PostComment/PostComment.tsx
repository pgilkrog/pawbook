import React from 'react';
import firebase from '../../../firebase';

import './PostComment.css';
import { IComment } from '../../../interfaces/IComment';
import { useAuth } from '../../../hooks/use-auth';

interface Props {
    comment: IComment,
    userEmail: string,
    postId: string,
}

export const PostComment: React.FC<Props> = (props) => {
    const auth = useAuth();

    const removeComment = () => {
        firebase.database()
            .ref('posts/' + props.postId)
            .child('comments/' + props.comment.id)
            .remove();
    }

    const time = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    }).format(new Date(props.comment.commentDate));

    return (
        <div className="CommentWrap">
            <div className="CommentImage">
                <img src={props.comment.userImage} alt="" height="80" width="80" />                
            </div>
            <div className="CommentContent">
                <p>
                    <i>{props.comment.userName}</i> &nbsp;
                    {props.comment.commentText}
                </p>
                <p style={{fontSize: '10px'}}>
                    {time} 
                    {auth.user.email === props.userEmail ? 
                        <span style={{cursor: 'pointer', fontWeight: 'bold'}} onClick={removeComment}> (remove comment)</span> 
                        : null}
                </p>                
            </div>
        </div>
    );
}