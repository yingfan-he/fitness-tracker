import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import { LogOut, User } from 'lucide-react';

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
        <div className="fixed top-4 right-4 flex items-center gap-3 z-50">
            {/* User Info */}
            <div className="flex items-center gap-2 bg-gray-800/80 backdrop-blur-lg px-4 py-2 rounded-full border border-gray-700">
                <User size={16} className="text-gray-400" />
                <span className="text-gray-200 font-medium">
                    {userName}
                </span>
            </div>

            {/* Sign Out Button */}
            <button
                onClick={handleSignOut}
                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400
                         px-4 py-2 rounded-full border border-red-500/30 transition-colors duration-200"
            >
                <LogOut size={16} />
                <span className="font-medium">Sign Out</span>
            </button>
        </div>
    );
}

export default UserGreeting;