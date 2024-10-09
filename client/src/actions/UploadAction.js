import * as UploadApi from '../api/UploadRequest';

// Upload Image Action
export const uploadImage = (data) => async (dispatch) => {
    dispatch({ type: 'UPLOAD_IMAGE_START' });
    try {
        console.log('Image upload Action started.');
        await UploadApi.uploadImage(data);
        dispatch({ type: 'UPLOAD_IMAGE_SUCCESS' });
    } catch (error) {
        console.error(
            'Error uploading image:',
            error.response ? error.response.data : error.message
        );
        dispatch({
            type: 'UPLOAD_IMAGE_FAIL',
            error: error.response ? error.response.data : error.message,
        });
    }
};

// Upload Post Action
export const uploadPost = (data) => async (dispatch) => {
    dispatch({ type: 'UPLOAD_START' });
    try {
        const newPost = await UploadApi.uploadPost(data);
        dispatch({ type: 'UPLOAD_SUCCESS', data: newPost.data });
    } catch (error) {
        console.error(
            'Error uploading post:',
            error.response ? error.response.data : error.message
        );
        dispatch({
            type: 'UPLOAD_FAIL',
            error: error.response ? error.response.data : error.message,
        });
    }
};
