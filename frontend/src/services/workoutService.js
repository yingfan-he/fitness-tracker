// workoutService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/workouts';

const getAuthHeader = () => {
    const token = localStorage.getItem('jwt');
    return { headers: { Authorization: `Bearer ${token}` } };
};

const createWorkout = async (workoutData) => {
    return axios.post(API_URL, workoutData, getAuthHeader());
};

const getWorkoutsByUser = async (userId) => {
    return axios.get(`${API_URL}/user/${userId}`, getAuthHeader());
};

const deleteWorkout = async (workoutId) => {
    return axios.delete(`${API_URL}/${workoutId}`, getAuthHeader());
};

export default {
    createWorkout,
    getWorkoutsByUser,
    deleteWorkout
};