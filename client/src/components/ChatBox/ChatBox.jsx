import React, { useEffect, useState, useRef } from 'react';
import { addMessage, getMessages } from '../../api/MessageRequests';
import { getUser } from '../../api/UserRequests';
import './ChatBox.css';

const ChatBox = ({ chat, currentUser }) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // Fetch chat user data for the header
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        if (chat) getUserData();
    }, [chat, currentUser]);

    // Fetch messages for the current chat
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id);
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages', error);
            }
        };

        if (chat) fetchMessages();
    }, [chat]);

    // Handle new message input change
    const handleChange = (message) => {
        setNewMessage(message);
    };

    // Handle sending a new message
    const handleSend = async (e) => {
        e.preventDefault();

        if (newMessage.trim()) {
            const message = {
                senderId: currentUser,
                text: newMessage,
                chatId: chat._id,
            };

            try {
                const { data } = await addMessage(message);
                setMessages([...messages, data]);
                setNewMessage(''); // Clear input after sending
            } catch (error) {
                console.error('Error sending message', error);
            }
        }
    };

    // Automatically scroll to the latest message
    const scroll = useRef();
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Manually format the timestamp to show the time ago (in minutes and hours, for example)
    const timeAgo = (timestamp) => {
        const diff = Date.now() - new Date(timestamp);
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 1) return `${days} days ago`;
        if (hours > 1) return `${hours} hours ago`;
        if (minutes > 1) return `${minutes} minutes ago`;
        return `${seconds} seconds ago`;
    };

    return (
        <div className="ChatBox-container">
            {chat ? (
                <>
                    {/* Chat header */}
                    <div className="chat-header">
                        <div className="follower">
                            <div>
                                <img
                                    src={
                                        userData?.profilePicture
                                            ? process.env
                                                  .REACT_APP_PUBLIC_FOLDER +
                                              userData.profilePicture
                                            : process.env
                                                  .REACT_APP_PUBLIC_FOLDER +
                                              'defaultProfile.png'
                                    }
                                    alt="Profile"
                                    className="followerImage"
                                    style={{ width: '50px', height: '50px' }}
                                />
                                <div
                                    className="name"
                                    style={{ fontSize: '0.9rem' }}
                                >
                                    <span>
                                        {userData?.firstname}{' '}
                                        {userData?.lastname}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <hr
                            style={{
                                width: '95%',
                                border: '0.1px solid #ececec',
                                marginTop: '20px',
                            }}
                        />
                    </div>

                    {/* Chat body */}
                    <div className="chat-body">
                        {messages.map((message) => (
                            <div
                                ref={scroll}
                                key={message._id}
                                className={
                                    message.senderId === currentUser
                                        ? 'message own'
                                        : 'message'
                                }
                            >
                                <span>{message.text}</span>{' '}
                                <span>{timeAgo(message.createdAt)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Chat sender */}
                    <div className="chat-sender">
                        {/* Replace InputEmoji with a regular input */}
                        <textarea
                            value={newMessage}
                            onChange={(e) => handleChange(e.target.value)}
                            placeholder="Type a message"
                            rows="2"
                            className="message-input"
                        />
                        <div
                            className="send-button button"
                            onClick={handleSend}
                        >
                            Send
                        </div>
                    </div>
                </>
            ) : (
                <span className="chatbox-empty-message">
                    Tap on a chat to start a conversation...
                </span>
            )}
        </div>
    );
};

export default ChatBox;
