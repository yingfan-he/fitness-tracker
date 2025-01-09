import { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X } from 'lucide-react';

function CreatineTracker() {
    const [userId, setUserId] = useState(null);
    const [creatineData, setCreatineData] = useState({
        date: new Date().toISOString().split('T')[0],
        taken: false,
        user: null
    });
    const [history, setHistory] = useState([]);

    // Fetch the current user's ID when the component mounts
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem('jwt');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get('http://localhost:8080/api/users/current', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserId(response.data.userId);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                if (error.response && error.response.status === 403) {
                    localStorage.removeItem('jwt');
                    window.location.href = '/login';
                }
            }
        };

        fetchCurrentUser();
    }, []);

    // Load creatine history when the component mounts or userId changes
    useEffect(() => {
        if (userId) {
            loadCreatineHistory();
        }
    }, [userId]);

    const loadCreatineHistory = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.get(`http://localhost:8080/api/creatine/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const groupedByDate = response.data.reduce((acc, entry) => {
                const date = entry.date.split('T')[0];
                if (!acc[date] || entry.creatine_id > acc[date].creatine_id) {
                    acc[date] = entry;
                }
                return acc;
            }, {});

            const latestEntries = Object.values(groupedByDate).sort((a, b) =>
                new Date(b.date) - new Date(a.date)
            );

            setHistory(latestEntries);
        } catch (error) {
            console.error('Failed to load history:', error);
        }
    };

    const handleToggleCreatine = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.post(
                "http://localhost:8080/api/creatine",
                { ...creatineData, taken: !creatineData.taken, user: { userId } },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setCreatineData(prev => ({
                ...prev,
                taken: !prev.taken
            }));
            console.log('Creatine status updated:', response.data);
            loadCreatineHistory();
        } catch (error) {
            console.error('Failed to update creatine status', error);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F1420] text-white p-6">
            <div className="max-w-2xl mx-auto">
                {/* Today's Tracker Card */}
                <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-lg shadow-lg border border-gray-700 mb-8">
                    <h2 className="text-2xl font-semibold mb-6">Today's Creatine</h2>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <p className="text-gray-300">
                            {new Date(creatineData.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>

                        <button
                            onClick={handleToggleCreatine}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                                creatineData.taken
                                    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                    : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                            }`}
                        >
                            {creatineData.taken ? (
                                <>
                                    <Check size={20} />
                                    <span>Taken</span>
                                </>
                            ) : (
                                <>
                                    <span>Mark as Taken</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* History Section */}
                <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-lg shadow-lg border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6">History</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-gray-700">
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {history.map(entry => (
                                <tr
                                    key={entry.creatine_id}
                                    className="border-b border-gray-700/50 last:border-b-0"
                                >
                                    <td className="py-3 px-4 text-gray-300">
                                        {new Date(entry.date).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </td>
                                    <td className="py-3 px-4">
                                        {entry.taken ? (
                                            <span className="inline-flex items-center gap-1 text-green-400">
                                                    <Check size={16} />
                                                    <span>Taken</span>
                                                </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-red-400">
                                                    <X size={16} />
                                                    <span>Missed</span>
                                                </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatineTracker;