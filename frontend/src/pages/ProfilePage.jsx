import { useState, useEffect } from 'react';
import axios from 'axios';

function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => { // runs when component mounts
            // fetches the user's profile data
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get('http://localhost:8080/api/users/current', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserData(response.data); // if successful, sets in userData state
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setError('Failed to load user profile');
            }
        };

        fetchUserData(); // call the method to actually fetch it
    }, []);

    if (error) return <div>{error}</div>;
    if (!userData) return <div>Loading...</div>;

    return (
        <div>
            <h1>Profile</h1>
            <div>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
            </div>
        </div>
    );
}

export default ProfilePage;
