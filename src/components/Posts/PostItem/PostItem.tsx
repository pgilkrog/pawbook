import React, { useState, useEffect, useRef } from 'react';
import firebase from '../../../firebase';
import ContentEditable from 'react-contenteditable';

import './PostItem.css'
import { IPost } from '../../../interfaces/IPost';
import { PostComment } from '../PostComment/PostComment';
import { useAuth } from '../../../hooks/use-auth';
import { IComment } from '../../../interfaces/IComment';

interface Props {
    post: IPost
}

export const PostItem: React.FC<Props> = props => {
    const auth = useAuth();
    const [comments, setComments] = useState([] as IComment[]);
    
    const textContent = useRef(props.post.content);
    const titleContent = useRef(props.post.title);
    const editable = auth.user.email === props.post.userEmail ? false : true;

    useEffect(() => {
        const fetchedComments = [];

        for (let comment in props.post.comments) {
            fetchedComments.push({
                id: comment,
                ...props.post.comments[comment] as IComment
            })
        }
        setComments(fetchedComments);
    }, [props.post.comments])

    const submitComment = (event: any) => {
        event.preventDefault();

        const commentData = {
            userEmail: auth.user!.email,
            postId: props.post.id,
            userName: auth.user!.displayName,
            userImage: auth.user!.photoURL,
            commentText: event.target.comment.value,
            commentDate: Date.now()
        }

        firebase.database().ref('posts/'+ props.post.id).child('comments').push(commentData);
    }

    const giveLike = (binary: boolean) => {
        let post = firebase.database().ref('posts/'+ props.post.id);
        binary ? post.update({'like': ++props.post.like}) : post.update({'dislike': ++props.post.dislike})
    }

    const time = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(props.post.postedDate));

    const editPostContent = (event: any) => {
        textContent.current = event.target.value;
    }

    const handleblurContent = () => {
        console.log(textContent.current);
        firebase.database().ref('posts/' + props.post.id).update({'content': textContent.current})
    }

    const editPostTitle = (event: any) => {
        titleContent.current = event.target.value;
    }

    const handleblurTitle = () => {
        try {
            firebase.database().ref('posts/' + props.post.id).update({'title': titleContent.current});
        } catch (error) {
            console.log("Error accured deleting post with id = " + props.post.id);
            error.log(error);
        }
    }

    const deletePost = () => {
        try {
            firebase.database().ref('posts/' + props.post.id).remove();
            console.log("Deleted post with id = " + props.post.id)
        } catch (error) {
            console.log("Error accured deleting post with id = " + props.post.id);
            error.log(error);
        }
    }

    return (
        <div className="PostItemWrap">
            <div className="PostUserTop">
                <div className="PostUserImg">
                    <img src={props.post.userImg} alt="" style={{borderRadius: '50%', border: '1px solid #666'}} height="50" width="50" />                     
                </div>
                <div className="PostUserTitle">
                    <p>
                        {props.post.userName} {auth.user.email === props.post.userEmail ? 
                        <label className="PostDelete" onClick={deletePost}>delete</label> : 
                        null} <br /> 
                        <i style={{fontSize: '12px'}}>{time}</i>
                    </p>
                </div>
            </div>

            {props.post.postImg ? <img src={props.post.postImg} alt="" width="500" /> : null}

            <div className="PostUserText">
                <div style={{marginTop: '5px', marginBottom: '15px'}}>
                    <ContentEditable 
                        style={{fontWeight: '700', cursor: 'pointer'}} 
                        html={titleContent.current} 
                        onBlur={handleblurTitle} 
                        onChange={editPostTitle} 
                        disabled={editable}
                    ></ContentEditable> <br/>
                    <ContentEditable 
                        style={{cursor: 'pointer'}} 
                        html={textContent.current} 
                        onBlur={handleblurContent} 
                        onChange={editPostContent} 
                        disabled={editable}
                    ></ContentEditable>
                </div>
            </div>

            <div className="PostUserCommentList">
                {comments ? comments.map((comment: any) => 
                    <PostComment 
                        key={comment.id} 
                        comment={comment} 
                        userEmail={props.post.userEmail} 
                        postId={props.post.id}  
                    />
                    ) : <p>No comments!</p>}
            </div>

            <div className="PostUserComment">
                <div>
                    {auth.user.email !== props.post.userEmail ? <button onClick={() => giveLike(true)}>Like</button> : null} {props.post.like}- 
                    {props.post.dislike} {auth.user.email !== props.post.userEmail ? <button onClick={() => giveLike(false)}>Dislike</button> : null}
                
                    <form onSubmit={submitComment}>
                        <input type="text" placeholder="Comment..." name="comment" autoComplete="off" />
                        <button>Post</button>                    
                    </form>                    
                </div>
            </div>
        </div>
    );
}