import { useState, useEffect } from 'react';
import axios from 'axios';

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
                    localStorage.removeItem('jwt'); // Clear the expired token
                    window.location.href = '/login'; // Redirect to login page
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

            // Group by date and get latest entry for each date
            const groupedByDate = response.data.reduce((acc, entry) => {
                const date = entry.date.split('T')[0];  // Get just the date part
                if (!acc[date] || entry.creatine_id > acc[date].creatine_id) {
                    acc[date] = entry;
                }
                return acc;
            }, {});

            // Convert back to array and sort by date
            const latestEntries = Object.values(groupedByDate).sort((a, b) =>
                new Date(b.date) - new Date(a.date)
            );

            setHistory(latestEntries);
        } catch (error) {
            console.error('Failed to load history:', error);
        }
    };

    const handleToggle = async () => {
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
        <div>
            <div>
                <p>Today's Date: {creatineData.date}</p>
                <label>
                    Took Creatine Today:
                    <input
                        type="checkbox"
                        checked={creatineData.taken}
                        onChange={handleToggle}
                    />
                </label>
            </div>

            <div>
                <h3>History</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Taken</th>
                    </tr>
                    </thead>
                    <tbody>
                    {history.map(entry => (
                        <tr key={entry.creatine_id}>
                            <td>{new Date(entry.date).toLocaleDateString()}</td>
                            <td>{entry.taken ? '✅' : '❌'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CreatineTracker;