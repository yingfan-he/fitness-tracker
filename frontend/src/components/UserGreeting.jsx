import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

function UserGreeting() {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('jwt');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8080/api/users/current', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setUserName(response.data.name);
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                    localStorage.removeItem('jwt');
                    logout();
                }
            }
        };

        if (isLoggedIn) {
            fetchUserData();
        }
    }, [isLoggedIn, logout]);

    const handleSignOut = () => {
        logout();
        navigate('/auth');
    };

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div style={{
            position: 'absolute',
            top: '10px',
            right: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        }}>
            <span>Hi, {userName}</span>
            <button
                onClick={handleSignOut}
                style={{
                    padding: '5px 10px',
                    cursor: 'pointer',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                }}
            >
                Sign Out
            </button>
        </div>
    );
}

export default UserGreeting;