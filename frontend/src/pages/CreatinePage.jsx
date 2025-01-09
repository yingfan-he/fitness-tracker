import CreatineTracker from "../components/CreatineTracker.jsx";

function CreatinePage() {
    return (
        <div className="min-h-screen bg-[#0F1420] pt-20 px-4 pb-8">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Creatine Tracker
                    </h1>
                    <p className="text-gray-400">
                        Track your daily creatine intake and maintain your streak
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-gray-800/30 rounded-2xl backdrop-blur-sm border border-gray-700/50">
                    <CreatineTracker />
                </div>
            </div>
        </div>
    );
}

export default CreatinePage;