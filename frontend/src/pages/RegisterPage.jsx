import RegisterForm from '../components/RegisterForm.jsx';

function RegisterPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0F1420] to-black pt-20 px-4 pb-8">
            <div className="max-w-md mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-gray-400">Join GymSync to track your fitness journey</p>
                </div>

                {/* Form Container */}
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                    <RegisterForm />
                </div>

                {/* Footer Section */}
                <div className="text-center mt-6">
                    <p className="text-gray-400 text-sm">
                        Already have an account?{' '}
                        <a href="/auth" className="text-blue-400 hover:text-blue-300 transition-colors">
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;