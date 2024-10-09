import React from 'react';
import Posts from '../Posts/Posts';
import PostShare from '../PostShare/PostShare';
import './PostSide.css';

const PostSide = () => {
    return (
        <div className="PostSide">
            {/* PostShare component: For sharing new posts */}
            <PostShare />

            {/* Posts component: For displaying a list of posts */}
            <Posts />
        </div>
    );
};

export default PostSide;
