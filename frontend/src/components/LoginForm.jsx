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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Login</button>
            {message && (
                <div style={{ color: message.type === 'success' ? 'green' : 'red' }}>
                    {message.text}
                </div>
            )}
        </form>
    );
}

export default LoginForm;