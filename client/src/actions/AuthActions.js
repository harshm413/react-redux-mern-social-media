import * as AuthApi from '../api/AuthRequests';

// Log in action
export const logIn = (formData, navigate) => async (dispatch) => {
    dispatch({ type: 'AUTH_START' });
    try {
        const { data } = await AuthApi.logIn(formData);
        dispatch({ type: 'AUTH_SUCCESS', data: data });
        navigate('../home', { replace: true }); // Navigate to the homepage after successful login
    } catch (error) {
        console.error(
            'Login failed: ',
            error.response ? error.response.data : error.message
        );
        dispatch({
            type: 'AUTH_FAIL',
            error: error.response ? error.response.data : error.message,
        });
        // Optionally show a message to the user here using a notification or alert
    }
};

// Sign up action
export const signUp = (formData, navigate) => async (dispatch) => {
    dispatch({ type: 'AUTH_START' });
    try {
        const { data } = await AuthApi.signUp(formData);
        dispatch({ type: 'AUTH_SUCCESS', data: data });
        navigate('../home', { replace: true }); // Navigate to the homepage after successful signup
    } catch (error) {
        console.error(
            'SignUp failed: ',
            error.response ? error.response.data : error.message
        );
        dispatch({
            type: 'AUTH_FAIL',
            error: error.response ? error.response.data : error.message,
        });
        // Optionally show a message to the user here using a notification or alert
    }
};

// Logout action
export const logout = () => async (dispatch) => {
    // Optionally, clear user-related data in localStorage or Redux store if needed
    localStorage.removeItem('token'); // Assuming you're using a token for auth
    dispatch({ type: 'LOG_OUT' }); // Reset auth state to logged-out
};
