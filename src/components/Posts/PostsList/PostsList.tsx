import React from 'react';

import './PostsList.css';
import { PostItem } from '../PostItem/PostItem';
import { PostCreate } from '../PostCreate/PostCreate';
import { IPost } from '../../../interfaces/IPost';

interface Props {
    posts: IPost[]
}

export const PostsList: React.FC<Props> = props => {
    return (
        <React.Fragment>
            <div className="PostListWrap">
                <PostCreate />
                <div style={{marginTop: '20px'}}>
                    {props.posts.map(post => 
                        <PostItem key={post.id} post={post} />
                    ).reverse()}
                </div>
            </div>            
        </React.Fragment>
    );
}