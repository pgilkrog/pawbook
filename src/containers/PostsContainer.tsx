import React, { useEffect, useMemo, useReducer, useState } from 'react';
import firebase from '../firebase';

import { PostsList } from '../components/Posts/PostsList/PostsList';
import { Spinner } from '../components/UI/Spinner/Spinner';
import { IPost } from '../interfaces/IPost';

const postsListReducer = (currentPosts: any, action: any) => {
    switch(action.type) {
        case 'SET':
            return action.posts;
        case 'EDIT':
            return null;
    }
}

export const PostsContainer = () => {
    const [posts, dispatch] = useReducer(postsListReducer, []);
    const [isLoading, setIsLoading] = useState(true);
    const postData = firebase.database().ref('posts').orderByChild('postedDate');
    
    useEffect(() => {    
        postData.on('value', response => {
            let posts = response.val();
            const fetchedPosts = [] as IPost[];

            for (let post in posts) {
                fetchedPosts.push({
                    id: post,
                    ...posts[post] as IPost
                })
            }
            dispatch({ type: 'SET', posts: fetchedPosts });
        })

        setIsLoading(false);

        return () => {}
    }, []);

    const postsList = useMemo(() => {
        return <PostsList posts={posts} />
    }, [posts]);

    return (
        <div>
            {isLoading ? <Spinner /> : postsList}
        </div>
    );
}
