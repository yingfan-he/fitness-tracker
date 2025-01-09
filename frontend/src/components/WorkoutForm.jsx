import { useState, useEffect } from 'react';
import workoutService from "../services/workoutService.js";
import axios from 'axios';
import { Trash2 } from 'lucide-react';

function WorkoutForm() {
    const [userId, setUserId] = useState(null);
    const [formData, setFormData] = useState({
        workoutName: '',
        muscleGroup: '',
        sets: 0,
        reps: 0,
        weight: 0,
        date: new Date().toISOString().split('T')[0] // Default to today's date in YYYY-MM-DD format
    });
    const [message, setMessage] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [muscleFilter, setMuscleFilter] = useState('ALL');
    const [showWeight, setShowWeight] = useState(false);

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

    useEffect(() => {
        if (userId) {
            loadWorkouts();
        }
    }, [userId]);

    const loadWorkouts = async () => {
        try {
            const response = await workoutService.getWorkoutsByUser(userId);
            setWorkouts(response.data);
        } catch (error) {
            console.error('Failed to load workouts:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (formData.sets <= 0 || formData.reps <= 0) {
            setMessage({ type: 'error', text: 'Sets and reps must be positive numbers' });
            return;
        }

        try {
            // Get the date from the form input
            const selectedDate = new Date(formData.date);

            // Get the current time
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            // Set the time on the selected date
            selectedDate.setHours(hours);
            selectedDate.setMinutes(minutes);
            selectedDate.setSeconds(seconds);

            // Convert to UTC
            const utcDate = selectedDate.toISOString();

            // Send the workout data to the backend
            await workoutService.createWorkout({
                ...formData,
                date: utcDate // Use the UTC date with the current time
            });

            // Show success message
            setMessage({ type: 'success', text: 'Workout added successfully!' });

            // Reset the form
            setFormData({
                workoutName: '',
                muscleGroup: '',
                sets: 0,
                reps: 0,
                weight: 0,
                date: new Date().toISOString().split('T')[0] // Reset to today's date
            });

            // Reload workouts
            loadWorkouts();
            console.log('Date being sent to backend:', utcDate);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to add workout. Please try again.' });
        }
    };

    const handleDelete = async (workoutId) => {
        if (window.confirm('Are you sure you want to delete this workout?')) {
            try {
                await workoutService.deleteWorkout(workoutId);
                setMessage({ type: 'success', text: 'Workout deleted successfully!' });
                loadWorkouts();
            } catch (error) {
                setMessage({ type: 'error', text: 'Failed to delete workout.' });
            }
        }
    };

    const filteredAndSortedWorkouts = [...workouts]
        .filter(workout => muscleFilter === 'ALL' || workout.muscleGroup === muscleFilter)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const formStyle = {
        maxWidth: '500px',
        margin: '20px auto',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '5px'
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd'
    };

    const buttonStyle = {
        padding: '10px 15px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    const deleteButtonStyle = {
        padding: '5px 10px',
        backgroundColor: '#ff4444',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
    };

    const cellStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left'
    };

    const messageStyle = {
        padding: '10px',
        marginTop: '10px',
        borderRadius: '4px',
        textAlign: 'center'
    };
    return (
        <div className="space-y-8">
            {/* Add Workout Form */}
            <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-1">Workout Name:</label>
                        <input
                            type="text"
                            name="workoutName"
                            value={formData.workoutName}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-1">Muscle Group:</label>
                        <select
                            name="muscleGroup"
                            value={formData.muscleGroup}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        >
                            <option value="">Select muscle group...</option>
                            <option value="CHEST">Chest</option>
                            <option value="BACK">Back</option>
                            <option value="BICEPS">Biceps</option>
                            <option value="TRICEPS">Triceps</option>
                            <option value="SHOULDERS">Shoulders</option>
                            <option value="LEGS">Legs</option>
                            <option value="CORE">Core</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-1">Sets:</label>
                        <input
                            type="number"
                            name="sets"
                            min="0"
                            value={formData.sets}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-1">Reps:</label>
                        <input
                            type="number"
                            name="reps"
                            min="0"
                            value={formData.reps}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showWeight}
                            onChange={() => setShowWeight(!showWeight)}
                            className="w-4 h-4 rounded border-gray-700 bg-gray-900/50"
                        />
                        <label className="text-gray-300">Include Weight</label>
                    </div>

                    {showWeight && (
                        <div>
                            <label className="block text-gray-300 mb-1">Weight:</label>
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-gray-300 mb-1">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-2 font-medium transition-colors"
                    >
                        Add Workout
                    </button>

                    {message && (
                        <div className={`p-3 rounded-lg text-center ${
                            message.type === 'success'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-red-500/20 text-red-400'
                        }`}>
                            {message.text}
                        </div>
                    )}
                </div>
            </form>

            {/* Workout History */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-4">Workout History</h2>

                <div className="mb-4">
                    <label className="block text-gray-300 mb-1">Filter by Muscle Group:</label>
                    <select
                        value={muscleFilter}
                        onChange={(e) => setMuscleFilter(e.target.value)}
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                        <option value="ALL">All</option>
                        <option value="CHEST">Chest</option>
                        <option value="BACK">Back</option>
                        <option value="BICEPS">Biceps</option>
                        <option value="TRICEPS">Triceps</option>
                        <option value="SHOULDERS">Shoulders</option>
                        <option value="LEGS">Legs</option>
                        <option value="CORE">Core</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-gray-700">
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Workout</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Muscle Group</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Sets</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Reps</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredAndSortedWorkouts.map(workout => (
                            <tr key={workout.workoutId} className="border-b border-gray-700/50">
                                <td className="py-3 px-4 text-gray-300">
                                    {new Date(workout.date).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </td>
                                <td className="py-3 px-4 text-gray-300">{workout.workoutName}</td>
                                <td className="py-3 px-4 text-gray-300">{workout.muscleGroup}</td>
                                <td className="py-3 px-4 text-gray-300">{workout.sets}</td>
                                <td className="py-3 px-4 text-gray-300">{workout.reps}</td>
                                <td className="py-3 px-4">
                                    <button
                                        onClick={() => handleDelete(workout.workoutId)}
                                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


export default WorkoutForm;