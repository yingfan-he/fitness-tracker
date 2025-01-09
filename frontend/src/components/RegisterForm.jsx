import { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
    const [formData, setFormData] = useState({
        name: '',
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
            const response = await axios.post('http://localhost:8080/api/auth/register', formData);
            console.log('Registration successful:', response.data);
            setMessage({ type: 'success', text: 'Registration successful!' });
            setFormData({ name: '', email: '', password: '' }); // Clear form
        } catch (error) {
            console.error('Registration failed:', error);
            setMessage({ type: 'error', text: 'Registration failed. Please try again.' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
                <div>
                    <label className="text-white text-sm mb-1 block">
                        Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Enter your name"
                    />
                </div>

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
                Register
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

export default RegisterForm;