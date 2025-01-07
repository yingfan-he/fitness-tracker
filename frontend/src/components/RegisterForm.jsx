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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
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
            <button type="submit">Register</button>
            {message && (
                <div style={{ color: message.type === 'success' ? 'green' : 'red' }}>
                    {message.text}
                </div>
            )}
        </form>
    );
}

export default RegisterForm;