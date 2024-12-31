// Import the useState hook from React to manage state (memory for the form)
import { useState } from 'react';
// Import a service to handle sending data to the server
import userService from '../services/userService';

function RegisterForm() {
    // Create a memory box (state) to store the form data (name and email)
    const [formData, setFormData] = useState({
        name: '',  // Start with an empty name
        email: ''  // Start with an empty email
    });

    // This function runs when the user types in the input fields
    const handleChange = (e) => {
        // Get the name of the input field (e.g., "name" or "email") and the value the user typed
        const {name, value} = e.target; // name is the name attribute of input field (can either be name or email)
        // Update the memory box (state) with the new value
        setFormData(prevState => ({
            ...prevState,  // Keep the other fields (e.g., email) unchanged
            [name]: value  // Update only the field that changed
        }));
    };

    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        try {
            await userService.register(formData);
            setMessage('Registration successful!');
            setFormData({ name: '', email: '' }); // Clear form
        } catch (error) {
            setMessage('Registration failed. Please try again.');
        }
    };

    // The form that the user sees and interacts with
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>User Name:</label>
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
            <button type="submit">Register</button>
            {message && <div>{message}</div>}
        </form>
    );
}

export default RegisterForm;
