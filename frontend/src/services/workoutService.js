import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/workouts';

const workoutService = {
    // Create a new workout
    createWorkout: async (workoutData) => {
        const token = localStorage.getItem('jwt');
        const response = await axios.post(BASE_URL, workoutData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    },

    // Get all workouts for a user
    getWorkoutsByUser: async (userId) => {
        const token = localStorage.getItem('jwt');
        const response = await axios.get(`${BASE_URL}/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    },

    // Get workouts by muscle group
    getWorkoutsByMuscleGroup: async (muscleGroup) => {
        const token = localStorage.getItem('jwt');
        const response = await axios.get(`${BASE_URL}/muscle/${muscleGroup}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    },

    // Delete workout
    deleteWorkout: async (workoutId) => {
        const token = localStorage.getItem('jwt');
        const response = await axios.delete(`${BASE_URL}/${workoutId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }
};

export default workoutService;