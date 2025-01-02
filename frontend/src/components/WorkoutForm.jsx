// Importing necessary modules
import { useState } from 'react'; // useState is a React hook for managing state
import workoutService from "../services/workoutService.js"; // Module for handling API calls

// Defining the WorkoutForm component
function WorkoutForm() {
    // State to manage form data
    const [formData, setFormData] = useState({
        workoutName: '', // Name of the workout
        muscleGroup: 'CHEST', // Muscle group targeted
        sets: 0, // Number of sets
        reps: 0, // Number of reps
        date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
        user: {
            userId: 1 // Placeholder for user ID (will be replaced with logged-in user's ID later)
        }
    });

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target; // Extract the name and value of the input field
        setFormData(prevState => ({
            ...prevState, // Copy the previous state to avoid overwriting other fields
            [name]: value // Update the specific field that changed
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior (page reload)
        try {
            // Send the form data to the backend using the workoutService
            const response = await workoutService.createWorkout(formData);
            console.log('Workout created:', response); // Log the response from the backend
            // Here you could reset the form or show a success message
        } catch (error) {
            console.error('Failed to create workout:', error); // Log any errors that occur
        }
    };

    // The form's UI (JSX)
    return (
        <form onSubmit={handleSubmit}>
            {/* Workout Name Input */}
            <div>
                <label>Workout Name:</label>
                <input
                    type="text"
                    name="workoutName"
                    value={formData.workoutName}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Muscle Group Dropdown */}
            <div>
                <label>Muscle Group:</label>
                <select
                    name="muscleGroup"
                    value={formData.muscleGroup}
                    onChange={handleChange}
                    required
                >
                    <option value="CHEST">Chest</option>
                    <option value="BACK">Back</option>
                    <option value="BICEPS">Biceps</option>
                    <option value="TRICEPS">Triceps</option>
                    <option value="SHOULDERS">Shoulders</option>
                    <option value="LEGS">Legs</option>
                    <option value="CORE">Core</option>
                </select>
            </div>

            {/* Sets Input */}
            <div>
                <label>Sets:</label>
                <input
                    type="number"
                    name="sets"
                    value={formData.sets}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Reps Input */}
            <div>
                <label>Reps:</label>
                <input
                    type="number"
                    name="reps"
                    value={formData.reps}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Submit Button */}
            <button type="submit">Add Workout</button>
        </form>
    );
}

// Export the WorkoutForm component so it can be used in other files
export default WorkoutForm;