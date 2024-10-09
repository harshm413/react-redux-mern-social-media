import React, { useState } from 'react';
import './Post.css';
import { likePost } from '../../api/PostsRequests';
import { useSelector } from 'react-redux';

const Post = ({ data }) => {
    const { user } = useSelector((state) => state.authReducer.authData);

    // Initialize like state and like count
    const [liked, setLiked] = useState(data.likes.includes(user._id));
    const [likes, setLikes] = useState(data.likes.length);

    const handleLike = () => {
        // Toggle the like status
        if (liked) {
            setLikes(likes - 1); // Decrease like count if already liked
        } else {
            setLikes(likes + 1); // Increase like count if not liked
        }

        setLiked((prev) => !prev); // Toggle like state

        // Make API call to like/unlike post
        likePost(data._id, user._id);
    };

    return (
        <div className="Post">
            {/* Conditionally render the Post image only if an image exists */}
            {data.image && (
                <img
                    src={'http://localhost:5000/images/' + data.image}
                    alt="Post"
                />
            )}

            <div className="postReact">
                {/* Like button */}
                <button
                    className={`reactBtn ${liked ? 'liked' : ''}`}
                    onClick={handleLike}
                >
                    ❤
                </button>

                {/* Comment button */}
                <button className="reactBtn">Comment</button>

                {/* Share button */}
                <button className="reactBtn">Share</button>
            </div>

            {/* Display like count */}
            <span style={{ color: 'var(--gray)', fontSize: '12px' }}>
                {likes} likes
            </span>

            <div className="detail">
                {/* Post details (name and description) */}
                <span>
                    <b>{data.name}</b>
                </span>
                <span>{data.desc}</span>
            </div>
        </div>
    );
};

export default Post;
