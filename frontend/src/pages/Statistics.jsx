import React from 'react';
import WorkoutDistribution from '../components/WorkoutDistribution';

function StatisticsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0F1420] via-[#0F1420] to-black pt-20 px-4 pb-8">
            <div className="max-w-6xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Workout Statistics</h1>
                    <p className="text-gray-400">Analyze your workout patterns and track your progress</p>
                </div>

                {/* Statistics Grid */}
                <div className="grid gap-8">
                    {/* Workout Distribution Chart */}
                    <WorkoutDistribution />

                    {/* You can add more statistical components here, such as:
                        - Weekly workout frequency
                        - Progress over time
                        - Personal records
                        - Workout duration analytics
                    */}
                </div>
            </div>
        </div>
    );
}

export default StatisticsPage;