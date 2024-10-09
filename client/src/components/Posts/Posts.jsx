import React, { useEffect } from 'react';
import { getTimelinePosts } from '../../actions/PostsAction';
import Post from '../Post/Post';
import { useSelector, useDispatch } from 'react-redux';
import './Posts.css';
import { useParams } from 'react-router-dom';

const Posts = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    const { posts, loading, error } = useSelector((state) => state.postReducer);

    // Fetch posts when the component mounts or user changes
    useEffect(() => {
        if (user?._id) {
            dispatch(getTimelinePosts(user._id));
        }
    }, [dispatch, user?._id]);

    // Handle loading state
    if (loading) {
        return <div>Fetching posts...</div>;
    }

    // Handle errors
    if (error) {
        return <div>Error fetching posts. Please try again later.</div>;
    }

    // Handle empty posts state
    if (!posts || posts.length === 0) {
        return <div>No posts available.</div>;
    }

    // Filter posts based on user ID (if necessary)
    const filteredPosts = params.id
        ? posts.filter((post) => post.userId === params.id)
        : posts;

    return (
        <div className="Posts">
            {filteredPosts.map((post, id) => {
                return <Post data={post} key={id} />;
            })}
        </div>
    );
};

export default Posts;
