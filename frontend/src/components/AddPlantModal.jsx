// src/components/AddPlantModal.jsx
import React, { useState } from 'react';

const AddPlantModal = ({ showModal, onClose, onPlantAdded }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [categories, setCategories] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const BACKEND_URL = 'http://localhost:3001/api/plants';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const newPlant = {
            name,
            price: parseFloat(price),
            categories: categories.split(',').map(cat => cat.trim()).filter(cat => cat),
            image,
            description,
            available: true
        };

        if (!name || isNaN(newPlant.price) || !categories || !image || !description) {
            setErrorMessage('All fields are required.');
            return;
        }

        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPlant),
            });

            if (!response.ok) {
                throw new Error('Failed to add plant.');
            }

            console.log('Plant added successfully:', await response.json());

            setName('');
            setPrice('');
            setCategories('');
            setImage('');
            setDescription('');
            onClose();
            onPlantAdded();

        } catch (error) {
            console.error('Failed to add plant:', error);
            setErrorMessage('Failed to add plant. Please try again.');
        }
    };

    if (!showModal) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg w-full max-w-lg relative">
                <span className="absolute top-2 right-4 text-gray-400 text-3xl font-bold cursor-pointer hover:text-gray-800" onClick={onClose}>&times;</span>
                <h2 className="text-2xl font-bold mb-4 text-green-800">Add a New Plant</h2>
                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Plant Name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input type="number" step="0.01" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="categories" className="block text-sm font-medium text-gray-700">Categories (comma separated)</label>
                        <input type="text" id="categories" value={categories} onChange={(e) => setCategories(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input type="url" id="image" value={image} onChange={(e) => setImage(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200">
                        Submit Plant
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPlantModal;
