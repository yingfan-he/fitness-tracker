import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function AuthPage() {
    return (
        // Full height container with gradient
        <div className="min-h-screen bg-gradient-to-b from-[#0F1420] via-[#0F1420] to-black relative">
            {/* Content wrapper */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                {/* App Title */}
                <h1 className="text-4xl font-bold text-blue-500 mb-8">
                    GymSync
                </h1>

                {/* Auth Container */}
                <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-xl">
                    {/* Login Section */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-medium mb-6 text-white text-center">
                            Login
                        </h2>
                        <LoginForm />
                    </div>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 text-sm bg-[#0F1420] text-gray-500">
                                or
                            </span>
                        </div>
                    </div>

                    {/* Register Section */}
                    <div>
                        <h2 className="text-2xl font-medium mb-6 text-white text-center">
                            Register
                        </h2>
                        <RegisterForm />
                    </div>
                </div>

                {/* Terms and Privacy */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>
                        By continuing, you agree to our{' '}
                        <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;