import TimelinePage from "../pages/TimelinePage.jsx";
import { Activity, Calendar, Pill } from 'lucide-react';

function HomePage() {
    return (
        <div className="min-h-screen bg-[#0F1420]">
            {/* Hero Section */}
            <div className="pt-20 px-4 pb-12 bg-gradient-to-b from-blue-500/10 to-transparent">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            GymSync
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Track your workouts and creatine intake
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {/* Workouts Card */}
                        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                            <div className="bg-blue-500/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                <Activity className="text-blue-400" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Track Workouts
                            </h3>
                            <p className="text-gray-400">
                                Log and monitor your exercise progress with detailed workout tracking
                            </p>
                        </div>

                        {/* Creatine Card */}
                        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                            <div className="bg-green-500/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                <Pill className="text-green-400" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Creatine Tracking
                            </h3>
                            <p className="text-gray-400">
                                Never miss a dose with our daily creatine intake tracker
                            </p>
                        </div>

                        {/* Timeline Card */}
                        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                            <div className="bg-purple-500/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                <Calendar className="text-purple-400" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Activity Timeline
                            </h3>
                            <p className="text-gray-400">
                                View your fitness journey with our interactive timeline
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline Section */}
            <div className="px-4 pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gray-800/30 rounded-2xl backdrop-blur-sm border border-gray-700/50 p-6">
                        <TimelinePage />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;