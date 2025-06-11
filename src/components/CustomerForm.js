import React, { useState, useEffect } from 'react';

const CustomerForm = ({ selectedCustomer, onSave, onDelete, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [emailError, setEmailError] = useState('');

    // Update form when a customer is selected or deselected
    useEffect(() => {
        if (selectedCustomer) {
            setFormData({
                name: selectedCustomer.name,
                email: selectedCustomer.email,
                password: selectedCustomer.password
            });
        } else {
            setFormData({
                name: '',
                email: '',
                password: ''
            });
        }
    }, [selectedCustomer]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'email') {
            if (!value) {
                setEmailError('Email is required.');
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                setEmailError('Please enter a valid email address.');
            } else {
                setEmailError('');
            }
        }
    };

    const handleSave = () => {
        // Validate email before saving
        if (!formData.email) {
            setEmailError('Email is required.');
            return;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setEmailError('Please enter a valid email address.');
            return;
        } else {
            setEmailError('');
        }

        // Don't save if all fields are empty
        if (!formData.name.trim() && !formData.email.trim() && !formData.password.trim()) {
            return;
        }
        
        onSave(formData);
        
        // Clear form only if adding (not updating)
        if (!selectedCustomer) {
            setFormData({
                name: '',
                email: '',
                password: ''
            });
        }
    };

    const handleDelete = () => {
        if (selectedCustomer) {
            onDelete(selectedCustomer.id);
        }
    };

    const handleCancel = () => {
        onCancel();
        // Form will be cleared by useEffect when selectedCustomer becomes null
    };

    return (
        <div className="customer-form-section">
            <h2>{selectedCustomer ? 'Update' : 'Add'}</h2>
            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Customer Name"
                />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@company.com"
                />
            </div>
            {emailError && <p className="error-message">{emailError}</p>}
            <div className="form-group">
                <label>Pass:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="password"
                />
            </div>
            <div className="button-group">
                <button onClick={handleDelete} disabled={!selectedCustomer}>
                    Delete
                </button>
                <button onClick={handleSave}>
                    Save
                </button>
                <button onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default CustomerForm;