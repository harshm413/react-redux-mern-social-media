import * as PostsApi from '../api/PostsRequests';

export const getTimelinePosts = (id) => async (dispatch) => {
    dispatch({ type: 'RETREIVING_START' });
    try {
        const { data } = await PostsApi.getTimelinePosts(id);
        dispatch({ type: 'RETREIVING_SUCCESS', data });
    } catch (error) {
        // Detailed error logging
        console.error(
            'Error fetching timeline posts:',
            error.response ? error.response.data : error.message
        );

        dispatch({
            type: 'RETREIVING_FAIL',
            error: error.response ? error.response.data : error.message,
        });
    }
};
