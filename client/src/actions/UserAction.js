import * as UserApi from '../api/UserRequests';

// Update User Action
export const updateUser = (id, formData) => async (dispatch) => {
    dispatch({ type: 'UPDATING_START' });
    try {
        const { data } = await UserApi.updateUser(id, formData);
        console.log('Received data:', data);
        dispatch({ type: 'UPDATING_SUCCESS', data: data });
    } catch (error) {
        console.error(
            'Error updating user:',
            error.response ? error.response.data : error.message
        );
        dispatch({
            type: 'UPDATING_FAIL',
            error: error.response ? error.response.data : error.message,
        });
    }
};

// Follow User Action
export const followUser = (id, data) => async (dispatch) => {
    dispatch({ type: 'FOLLOW_USER_START' });
    try {
        const response = await UserApi.followUser(id, data);
        dispatch({ type: 'FOLLOW_USER_SUCCESS', data: response.data });
    } catch (error) {
        console.error(
            'Error following user:',
            error.response ? error.response.data : error.message
        );
        dispatch({
            type: 'FOLLOW_USER_FAIL',
            error: error.response ? error.response.data : error.message,
        });
    }
};

// Unfollow User Action
export const unfollowUser = (id, data) => async (dispatch) => {
    dispatch({ type: 'UNFOLLOW_USER_START' });
    try {
        const response = await UserApi.unfollowUser(id, data);
        dispatch({ type: 'UNFOLLOW_USER_SUCCESS', data: response.data });
    } catch (error) {
        console.error(
            'Error unfollowing user:',
            error.response ? error.response.data : error.message
        );
        dispatch({
            type: 'UNFOLLOW_USER_FAIL',
            error: error.response ? error.response.data : error.message,
        });
    }
};
