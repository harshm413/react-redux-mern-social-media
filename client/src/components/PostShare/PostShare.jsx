import React, { useState, useRef } from 'react';
import './PostShare.css';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/UploadAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCamera,
    faVideo,
    faMapMarkerAlt,
    faCalendarAlt,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';

const PostShare = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    const loading = useSelector((state) => state.postReducer.uploading);
    const [image, setImage] = useState(null);
    const desc = useRef();
    const serverPublic = 'http://localhost:5000/images/';

    // handle Image Change
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
        }
    };

    const imageRef = useRef();

    // handle post upload
    const handleUpload = async (e) => {
        e.preventDefault();

        // post data
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };

        // if there is an image with post
        if (image && desc.current.value) {
            const data = new FormData();
            const fileName = Date.now() + image.name;
            data.append('name', fileName);
            data.append('file', image);
            newPost.image = fileName;
            console.log(newPost);
            try {
                dispatch(uploadImage(data));
            } catch (err) {
                console.log(err);
            }
        }
        if (desc.current.value) dispatch(uploadPost(newPost));
        resetShare();
    };

    // Reset Post Share
    const resetShare = () => {
        setImage(null);
        desc.current.value = '';
    };

    return (
        <div className="PostShare">
            <img
                src={
                    user.profilePicture
                        ? serverPublic + user.profilePicture
                        : serverPublic + 'defaultProfile.png'
                }
                alt="Profile"
            />
            <div>
                <input
                    type="text"
                    placeholder="What's happening?"
                    required
                    ref={desc}
                />
                <div className="postOptions">
                    <div
                        className="option"
                        style={{ color: 'var(--photo)' }}
                        onClick={() => imageRef.current.click()}
                    >
                        <FontAwesomeIcon icon={faCamera} /> Photo
                    </div>

                    <div className="option" style={{ color: 'var(--video)' }}>
                        <FontAwesomeIcon icon={faVideo} /> Video
                    </div>
                    <div
                        className="option"
                        style={{ color: 'var(--location)' }}
                    >
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> Location
                    </div>
                    <div className="option" style={{ color: 'var(--shedule)' }}>
                        <FontAwesomeIcon icon={faCalendarAlt} /> Schedule
                    </div>
                    <button
                        className="button ps-button"
                        onClick={handleUpload}
                        disabled={loading}
                    >
                        {loading ? 'Uploading...' : 'Share'}
                    </button>

                    <div style={{ display: 'none' }}>
                        <input
                            type="file"
                            ref={imageRef}
                            onChange={onImageChange}
                        />
                    </div>
                </div>

                {image && (
                    <div className="previewImage">
                        <FontAwesomeIcon
                            icon={faTimes}
                            onClick={() => setImage(null)}
                        />
                        <img src={URL.createObjectURL(image)} alt="preview" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostShare;
