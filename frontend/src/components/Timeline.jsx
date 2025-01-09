import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';

const Timeline = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchWorkouts = async (page = 0) => {
        try {
            const response = await fetch(`http://localhost:8080/api/workouts/timeline?page=${page}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response data:', data);
            setWorkouts(data.content);
            setTotalPages(data.totalPages);
            setCurrentPage(data.number);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching workouts:', err);
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkouts(currentPage);
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            fetchWorkouts(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            fetchWorkouts(currentPage + 1);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8 text-blue-400">
                <Loader className="animate-spin mr-2" size={24} />
                <span>Loading workouts...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500/20 text-red-400 p-4 rounded-xl text-center">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {workouts.length > 0 ? (
                <>
                    <div className="space-y-4">
                        {workouts.map((workout) => (
                            <div
                                key={workout.workoutId}
                                className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50"
                            >
                                {/* Workout Name */}
                                <h3 className="text-blue-400 text-lg font-medium mb-3">
                                    {workout.workoutName}
                                </h3>

                                {/* Workout Details */}
                                <div className="space-y-2 text-gray-300">
                                    <p className="flex items-center">
                                        <span className="text-gray-400">Muscle Group:</span>
                                        <span className="ml-2">{workout.muscleGroup}</span>
                                    </p>

                                    <p className="flex items-center">
                                        <span className="text-gray-400">Sets:</span>
                                        <span className="ml-2">{workout.sets}</span>
                                    </p>

                                    <p className="flex items-center">
                                        <span className="text-gray-400">Reps:</span>
                                        <span className="ml-2">{workout.reps}</span>
                                    </p>

                                    {workout.weight > 0 && (
                                        <p className="flex items-center">
                                            <span className="text-gray-400">Weight:</span>
                                            <span className="ml-2">{workout.weight} lbs</span>
                                        </p>
                                    )}

                                    <p className="flex items-center text-sm text-gray-400 mt-4">
                                        {new Date(workout.date).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 0}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                currentPage === 0
                                    ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                            }`}
                        >
                            Previous
                        </button>

                        <span className="text-gray-400">
                            Page {currentPage + 1} of {totalPages}
                        </span>

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages - 1}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                currentPage === totalPages - 1
                                    ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-400 py-8">
                    No workouts found.
                </div>
            )}
        </div>
    );
};

export default Timeline;