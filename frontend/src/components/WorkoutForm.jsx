import { useState, useEffect } from 'react';
import workoutService from "../services/workoutService.js";

function WorkoutForm() {
    const [formData, setFormData] = useState({
        workoutName: '',
        muscleGroup: '',
        sets: 0,
        reps: 0,
        weight: 0,
        date: new Date().toISOString().split('T')[0],
        user: {
            userId: 1
        }
    });

    const [message, setMessage] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [muscleFilter, setMuscleFilter] = useState('ALL');
    const [showWeight, setShowWeight] = useState(false); // New state for toggling weight input

    useEffect(() => {
        loadWorkouts();
    }, []);

    const loadWorkouts = async () => {
        try {
            const response = await workoutService.getWorkoutsByUser(1);
            setWorkouts(response);
        } catch (error) {
            console.error('Failed to load workouts:', error);
            setMessage({ type: 'error', text: 'Failed to load workouts.' });
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
            setMessage({ type: 'error', text: 'Sets and reps must be positive numbers'});
            return;
        }
        try {
            await workoutService.createWorkout(formData);
            setMessage({ type: 'success', text: 'Workout added successfully!' });
            setFormData({
                ...formData,
                workoutName: '',
                muscleGroup: '',
                sets: 0,
                reps: 0,
                weight: 0
            });
            loadWorkouts();
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
        <div>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div>
                    <label>Workout Name:</label>
                    <input
                        type="text"
                        name="workoutName"
                        value={formData.workoutName}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label>Muscle Group:</label>
                    <select
                        name="muscleGroup"
                        value={formData.muscleGroup}
                        onChange={handleChange}
                        required
                        style={inputStyle}
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
                    <label>Sets:</label>
                    <input
                        type="number"
                        name="sets"
                        min="0"
                        value={formData.sets}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label>Reps:</label>
                    <input
                        type="number"
                        name="reps"
                        min="0"
                        value={formData.reps}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={showWeight}
                            onChange={() => setShowWeight(!showWeight)}
                        />
                        Include Weight
                    </label>
                </div>

                {showWeight && (
                    <div>
                        <label>Weight:</label>
                        <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>
                )}

                <button type="submit" style={buttonStyle}>Add Workout</button>

                {message && (
                    <div style={{
                        ...messageStyle,
                        backgroundColor: message.type === 'success' ? '#dff0d8' : '#f2dede',
                        color: message.type === 'success' ? '#3c763d' : '#a94442'
                    }}>
                        {message.text}
                    </div>
                )}
            </form>

            <div style={formStyle}>
                <h2>Workout History</h2>
                <div style={{ marginBottom: '20px' }}>
                    <label>Filter by Muscle Group: </label>
                    <select
                        value={muscleFilter}
                        onChange={(e) => setMuscleFilter(e.target.value)}
                        style={inputStyle}
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

                <table style={tableStyle}>
                    <thead>
                    <tr>
                        <th style={cellStyle}>Date</th>
                        <th style={cellStyle}>Workout</th>
                        <th style={cellStyle}>Muscle Group</th>
                        <th style={cellStyle}>Sets</th>
                        <th style={cellStyle}>Reps</th>
                        <th style={cellStyle}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredAndSortedWorkouts.map(workout => (
                        <tr key={workout.workoutId}>
                            <td style={cellStyle}>{new Date(workout.date).toLocaleDateString()}</td>
                            <td style={cellStyle}>{workout.workoutName}</td>
                            <td style={cellStyle}>{workout.muscleGroup}</td>
                            <td style={cellStyle}>{workout.sets}</td>
                            <td style={cellStyle}>{workout.reps}</td>
                            <td style={cellStyle}>
                                <button
                                    onClick={() => handleDelete(workout.workoutId)}
                                    style={deleteButtonStyle}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default WorkoutForm;