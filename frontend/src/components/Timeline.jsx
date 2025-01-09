import React, { useEffect, useState } from 'react';

const Timeline = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Fetch workouts from the backend
    const fetchWorkouts = async (page = 0) => {
        try {
            const response = await fetch(`http://localhost:8080/api/workouts/timeline?page=${page}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response data:', data);

            // Update state with the fetched data
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

    // Fetch workouts when the component mounts or the page changes
    useEffect(() => {
        fetchWorkouts(currentPage);
    }, [currentPage]);

    // Handle pagination
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

    // Loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={styles.timeline}>
            <h2 style={styles.heading}>Workout Timeline</h2>
            {workouts.length > 0 ? (
                <>
                    <ul style={styles.workoutList}>
                        {workouts.map((workout) => (
                            <li key={workout.workoutId} style={styles.workoutItem}>
                                <h3 style={styles.workoutName}>{workout.workoutName}</h3>
                                <p><strong>Muscle Group:</strong> {workout.muscleGroup}</p>
                                <p><strong>Sets:</strong> {workout.sets}</p>
                                <p><strong>Reps:</strong> {workout.reps}</p>
                                <p><strong>Weight:</strong> {workout.weight} lbs</p>
                                <p><strong>Date:</strong> {new Date(workout.date).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                    <div style={styles.pagination}>
                        <button
                            style={styles.paginationButton}
                            onClick={handlePreviousPage}
                            disabled={currentPage === 0}
                        >
                            Previous
                        </button>
                        <span style={styles.pageInfo}>Page {currentPage + 1} of {totalPages}</span>
                        <button
                            style={styles.paginationButton}
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages - 1}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <p style={styles.noWorkouts}>No workouts found.</p>
            )}
        </div>
    );
};

// Inline styles
const styles = {
    timeline: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    workoutList: {
        listStyle: 'none',
        padding: '0',
    },
    workoutItem: {
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    workoutName: {
        marginTop: '0',
        color: '#007bff',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    },
    paginationButton: {
        margin: '0 10px',
        padding: '5px 10px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
    },
    paginationButtonDisabled: {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    },
    pageInfo: {
        margin: '0 10px',
    },
    noWorkouts: {
        textAlign: 'center',
        color: '#666',
    },
};

export default Timeline;