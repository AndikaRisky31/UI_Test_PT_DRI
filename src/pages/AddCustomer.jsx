import React, { useState } from "react";
import AxiosInstance from "../api/AxiosInstance";

const AddCustomer = ({onUpdate}) => {
    const [username, setUsername] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await AxiosInstance.post('/customers', { name : username });
            setUsername('');
            onUpdate();
        } catch (err) {
            console.error("Error adding customer:", err);
            setError('Failed to add customer. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full lg:w-1/6 mx-auto flex flex-col">
                <h3 className="text-xl font-bold font-quicksand leading-loose text-gray-900 mb-4">
                    Add Customer
                </h3>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                <div className="flex mb-4">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                    </span>
                    <input 
                        type="text" 
                        id="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" 
                        placeholder="Bonnie Green" 
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <div className="flex justify-end">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`py-2.5 px-5 text-sm font-medium ${isSubmitting ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'} focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100`}
                    >
                        {isSubmitting ? 'Adding...' : 'Add'}
                    </button>
                </div>
            </form>
        </>
    );
};

export default AddCustomer;