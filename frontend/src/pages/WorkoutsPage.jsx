import WorkoutForm from "../components/WorkoutForm.jsx";
import { useNavigate } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';

function WorkoutsPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0F1420] via-[#0F1420] to-black pt-20 px-4 pb-8">
            <div className="max-w-4xl mx-auto">
                {/* Header with Stats Button */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">My Workouts</h1>
                        <p className="text-gray-400">Log and track your exercise progress</p>
                    </div>

                    <button
                        onClick={() => navigate('/statistics')}
                        className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400
                                 px-4 py-2 rounded-xl transition-colors border border-blue-500/30"
                    >
                        <BarChart2 size={20} />
                        <span>View Statistics</span>
                    </button>
                </div>

                {/* Workout Form */}
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700">
                    <WorkoutForm />
                </div>
            </div>
        </div>
    );
}

export default WorkoutsPage;