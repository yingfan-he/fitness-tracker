import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/workouts';

const workoutService = {
    // Create a new workout
    createWorkout: async (workoutData) => {
        const response = await axios.post(BASE_URL, workoutData);
        return response.data;
    },

    // Get all workouts for a user
    getWorkoutsByUser: async (userId) => {
        const response = await axios.get(`${BASE_URL}/user/${userId}`);
        return response.data;
    },

    // Get workouts by muscle group
    getWorkoutsByMuscleGroup: async (muscleGroup) => {
        const response = await axios.get(`${BASE_URL}/muscle/${muscleGroup}`);
        return response.data;
    }
};

export default workoutService;