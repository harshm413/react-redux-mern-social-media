import React, { useEffect, useState } from 'react';
import ChatBox from '../../components/ChatBox/ChatBox';
import Conversation from '../../components/Coversation/Conversation';
import LogoSearch from '../../components/LogoSearch/LogoSearch';
import NavIcons from '../../components/NavIcons/NavIcons';
import './Chat.css';
import { userChats } from '../../api/ChatRequests';
import { useSelector } from 'react-redux';

const Chat = () => {
    const { user } = useSelector((state) => state.authReducer.authData);

    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);

    // Get the chat in the chat section
    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(user._id); // Fetch the chats for the user
                setChats(data);
            } catch (error) {
                console.log(error);
            }
        };
        getChats();
    }, [user._id]);

    return (
        <div className="Chat">
            {/* Left Side */}
            <div className="Left-side-chat">
                <LogoSearch />
                <div className="Chat-container">
                    <h2>Chats</h2>
                    <div className="Chat-list">
                        {chats.map((chat) => (
                            <div
                                key={chat._id} // Ensure a unique key is used
                                onClick={() => {
                                    setCurrentChat(chat); // Set the current chat when a conversation is clicked
                                }}
                            >
                                <Conversation
                                    data={chat}
                                    currentUser={user._id}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="Right-side-chat">
                <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
                    <NavIcons />
                </div>
                <ChatBox chat={currentChat} currentUser={user._id} />
            </div>
        </div>
    );
};

export default Chat;
