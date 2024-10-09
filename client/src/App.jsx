import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Auth from './pages/Auth/Auth';
import Profile from './pages/Profile/Profile';
import Chat from './pages/Chat/Chat';

function App() {
    // Access user data from Redux store
    const user = useSelector((state) => state.authReducer.authData);

    return (
        <div className="App">
            <Routes>
                {/* Redirect to Home or Auth based on user's login status */}
                <Route
                    path="/"
                    element={
                        user ? <Navigate to="home" /> : <Navigate to="auth" />
                    }
                />
                <Route
                    path="/home"
                    element={user ? <Home /> : <Navigate to="/auth" />}
                />
                <Route
                    path="/auth"
                    element={user ? <Navigate to="/home" /> : <Auth />}
                />
                <Route
                    path="/profile/:id"
                    element={user ? <Profile /> : <Navigate to="/auth" />}
                />
                <Route
                    path="/chat"
                    element={user ? <Chat /> : <Navigate to="/auth" />}
                />
                {/* Fallback for undefined routes */}
                <Route path="*" element={<div>404: Page not found!</div>} />
            </Routes>
        </div>
    );
}

export default App;
