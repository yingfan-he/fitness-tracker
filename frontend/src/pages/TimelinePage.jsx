import Timeline from "../components/Timeline.jsx";

function TimelinePage() {
    return (
        <div className="min-h-screen bg-[#0F1420] pt-20 px-4 pb-8">
            <div className="max-w-4xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Activity Timeline</h1>
                    <p className="text-gray-400">View what everyone is logging</p>
                </div>

                {/* Timeline Container */}
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700">
                    <Timeline />
                </div>
            </div>
        </div>
    );
}

export default TimelinePage;