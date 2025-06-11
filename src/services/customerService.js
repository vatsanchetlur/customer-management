// filepath: /Users/n0096336/Downloads/FullStack/capstone2/customer-management-app/src/services/customerService.js
const API_BASE_URL = 'http://localhost:3001/api'; // Assuming your server runs on port 3001

export const getCustomers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/customers`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch customers:", error);
        return []; // Return empty array or handle error as appropriate
    }
};

export const addCustomer = async (customer) => {
    try {
        const response = await fetch(`${API_BASE_URL}/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to add customer:", error);
        throw error; // Re-throw or handle error as appropriate
    }
};

export const updateCustomer = async (id, updatedData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to update customer ${id}:`, error);
        throw error; // Re-throw or handle error as appropriate
    }
};

export const deleteCustomer = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            // If the server returns a JSON error message, try to parse it
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                const errorBody = await response.json();
                errorMessage = errorBody.message || errorMessage;
            } catch (e) {
                // Ignore if response is not JSON
            }
            throw new Error(errorMessage);
        }
        // DELETE might not return a body or return a confirmation message
        // If it returns JSON: return await response.json();
        // If it returns no content (204) or text:
        return { message: 'Customer deleted successfully' }; // Or handle as appropriate
    } catch (error) {
        console.error(`Failed to delete customer ${id}:`, error);
        throw error; // Re-throw or handle error as appropriate
    }
};