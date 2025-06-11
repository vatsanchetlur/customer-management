import React from 'react';

const CustomerList = ({ customers, onSelect, selectedCustomer }) => {
    return (
        <div className="customer-list-section">
            <h2>Customer List</h2>
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Pass</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr 
                            key={customer.id} 
                            onClick={() => onSelect(customer)}
                            className={selectedCustomer && selectedCustomer.id === customer.id ? 'selected' : ''}
                        >
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;