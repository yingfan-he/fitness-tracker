import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.jsx';
import workoutService from "../services/workoutService.js";

function WorkoutDistribution() {
    const [userId, setUserId] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const COLORS = {
        CHEST: '#3B82F6',
        BACK: '#10B981',
        LEGS: '#F59E0B',
        SHOULDERS: '#8B5CF6',
        BICEPS: '#EC4899',
        TRICEPS: '#6366F1',
        CORE: '#EF4444'
    };

    // First fetch the current user's ID
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
                if (error.response?.status === 403) {
                    localStorage.removeItem('jwt');
                    logout();
                    navigate('/auth');
                }
            }
        };

        fetchCurrentUser();
    }, [navigate, logout]);

    // Then fetch the user's workouts once we have their ID
    useEffect(() => {
        const loadWorkoutData = async () => {
            if (!userId) return;

            try {
                const response = await workoutService.getWorkoutsByUser(userId);
                const workouts = response.data;

                // Process the workout data
                const muscleGroupCounts = workouts.reduce((acc, workout) => {
                    acc[workout.muscleGroup] = (acc[workout.muscleGroup] || 0) + 1;
                    return acc;
                }, {});

                const chartData = Object.entries(muscleGroupCounts)
                    .map(([name, value]) => ({
                        name,
                        value,
                    }))
                    .filter(item => item.value > 0)
                    .sort((a, b) => b.value - a.value);

                setData(chartData);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load workouts:', error);
                setError('Failed to load workout distribution');
                setLoading(false);
            }
        };

        if (userId) {
            loadWorkoutData();
        }
    }, [userId]);

    if (loading) {
        return (
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center justify-center h-64 text-gray-400">
                    Loading workout distribution...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                <div className="text-red-400 bg-red-500/20 p-4 rounded-xl text-center">
                    {error}
                </div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                <div className="text-center text-gray-400 p-4">
                    No workout data available. Start logging your workouts to see statistics!
                </div>
            </div>
        );
    }

    const totalWorkouts = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-2">Workout Distribution</h2>
            <p className="text-gray-400 mb-6">Total Workouts: {totalWorkouts}</p>

            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[entry.name] || '#8884d8'}
                                    opacity={0.8}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1F2937',
                                border: '1px solid #374151',
                                borderRadius: '0.5rem',
                                color: '#F3F4F6'
                            }}
                            formatter={(value, name) => [`${value} workouts`, name]}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Legend with counts */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {data.map((item) => (
                    <div
                        key={item.name}
                        className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3"
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: COLORS[item.name] }}
                            />
                            <span className="text-gray-300">{item.name}</span>
                        </div>
                        <span className="text-gray-400 font-medium">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WorkoutDistribution;