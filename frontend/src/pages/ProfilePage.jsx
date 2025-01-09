import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Loader } from 'lucide-react';

function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get('http://localhost:8080/api/users/current', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setError('Failed to load user profile');
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return (
            <div className="min-h-screen bg-[#0F1420] pt-20 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6 text-red-400 text-center">
                        <p>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="min-h-screen bg-[#0F1420] pt-20 px-4 flex items-center justify-center">
                <div className="flex items-center gap-3 text-blue-400">
                    <Loader className="animate-spin" size={24} />
                    <span>Loading profile...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F1420] pt-20 px-4 pb-8">
            <div className="max-w-2xl mx-auto">
                {/* Profile Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
                    <p className="text-gray-400">Manage your account information</p>
                </div>

                {/* Profile Card */}
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 overflow-hidden">
                    {/* Profile Avatar Section */}
                    <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-8 flex justify-center">
                        <div className="bg-gray-700 rounded-full p-6">
                            <User size={48} className="text-gray-400" />
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-6 space-y-4">
                        {/* Name Field */}
                        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                            <div className="flex items-center gap-3">
                                <User className="text-gray-400" size={20} />
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Name</p>
                                    <p className="text-white font-medium">{userData.name}</p>
                                </div>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                            <div className="flex items-center gap-3">
                                <Mail className="text-gray-400" size={20} />
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Email</p>
                                    <p className="text-white font-medium">{userData.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions Section */}
                    <div className="border-t border-gray-700 p-6">
                        <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-xl py-3 transition-colors">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;