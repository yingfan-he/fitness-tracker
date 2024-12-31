// Importing the Axios library for making HTTP requests
import axios from "axios";

// Define the base URL for the API endpoint
// This is the URL where the API is hosted, in this case, a local server on port 8000
const BASE_URL = "http://localhost:8080/api/users";

// Define a userService object that will contain methods related to user operations
const userService = {
    // Define the 'register' method to handle user registration
    // This method is asynchronous, meaning it can pause execution until the HTTP request completes
    register: async (userData) => {
        // Send a POST request to the BASE_URL with the user data (userData) as the request body
        // 'axios.post' is used to send the POST request
        const response = await axios.post(BASE_URL, userData);

        // Return only the 'data' portion of the server's response
        // The 'data' property typically contains the meaningful information from the response
        return response.data;
    }
};

// Export the userService object so it can be imported and used in other parts of the application
export default userService;
