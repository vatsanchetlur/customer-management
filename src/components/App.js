import React, { useState, useEffect } from 'react';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from '../services/customerService';
import '../styles/styles.css';

const App = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            const data = await getCustomers();
            setCustomers(data);
        };
        fetchCustomers();
    }, []);

    const handleAddCustomer = async (customer) => {
        const newCustomer = await addCustomer(customer);
        setCustomers([...customers, newCustomer]);
    };

    const handleUpdateCustomer = async (customer) => {
        // Use the customer's id to update the correct customer
        const updatedCustomer = await updateCustomer(customer.id, customer);
        setCustomers(customers.map(c => (c.id === customer.id ? updatedCustomer : c)));
        setSelectedCustomer(null);
    };

    const handleDeleteCustomer = async (id) => {
        await deleteCustomer(id);
        setCustomers(customers.filter(c => c.id !== id));
        setSelectedCustomer(null);
    };

    const handleSelectCustomer = (customer) => {
        // Toggle selection when clicking on already selected customer
        if (selectedCustomer && selectedCustomer.id === customer.id) {
            setSelectedCustomer(null);
        } else {
            setSelectedCustomer(customer);
        }
    };

    const handleCancel = () => {
        setSelectedCustomer(null);
    };

    return (
        <div className="app">
            <h1>Customer Management</h1>
            <div className="container">
                <CustomerList 
                    customers={customers} 
                    onSelect={handleSelectCustomer} 
                    selectedCustomer={selectedCustomer} 
                />
                <CustomerForm 
                    selectedCustomer={selectedCustomer} 
                    onSave={(customer) => {
                        if (selectedCustomer) {
                            handleUpdateCustomer({...selectedCustomer, ...customer});
                        } else {
                            handleAddCustomer(customer);
                        }
                    }}
                    onDelete={handleDeleteCustomer} 
                    onCancel={handleCancel} 
                />
            </div>
        </div>
    );
};

export default App;