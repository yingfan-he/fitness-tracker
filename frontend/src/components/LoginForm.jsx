import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', formData);
            localStorage.setItem('jwt', response.data.token);
            login(); // Update the auth state
            setMessage({ type: 'success', text: 'Login successful!' });
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error('Login failed:', error);
            setMessage({ type: 'error', text: 'Login failed. Please check your credentials.' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
                <div>
                    <label className="text-white text-sm mb-1 block">
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label className="text-white text-sm mb-1 block">
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Enter your password"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-lg p-2 mt-4 hover:bg-blue-600 transition-colors font-medium"
            >
                Login
            </button>

            {message && (
                <div className={`mt-4 p-3 rounded-lg ${
                    message.type === 'success'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                }`}>
                    {message.text}
                </div>
            )}
        </form>
    );
}

export default LoginForm;