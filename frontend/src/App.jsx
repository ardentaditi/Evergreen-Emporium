// src/App.jsx
import React, { useState, useEffect } from 'react';
import PlantCard from './components/PlantCard.jsx';
import AddPlantModal from './components/AddPlantModal.jsx';

const App = () => {
    const [allPlants, setAllPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    const BACKEND_URL = 'http://localhost:3001/api/plants';

    const fetchPlants = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(BACKEND_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch plants.');
            }
            const data = await response.json();
            setAllPlants(data);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to load plants. Please check your backend connection.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlants();
    }, []);

    const filteredPlants = allPlants.filter(plant => {
        const categoryMatch = selectedCategory === 'All' || plant.categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase());
        const searchMatch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) || plant.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
        return categoryMatch && searchMatch;
    });

    return (
        <div className="container mx-auto p-4 md:p-8 bg-green-900 min-h-screen">
            <header className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white font-serif">Evergreen Emporium</h1>
                <p className="text-lg text-gray-300 mt-2">Find the perfect green companion for your home.</p>
            </header>

            <main className="bg-white p-6 md:p-10 rounded-xl shadow-lg">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
                    <div className="w-full md:w-1/3">
                        <label htmlFor="search-input" className="block text-sm font-medium text-gray-700">Search Plants</label>
                        <input type="text" id="search-input" placeholder="Search by name or category..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                    </div>
                    <div className="w-full md:w-1/3">
                        <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700">Filter by Category</label>
                        <select id="category-filter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md shadow-sm">
                            <option value="All">All Plants</option>
                            <option value="Indoor">Indoor</option>
                            <option value="Outdoor">Outdoor</option>
                            <option value="Succulent">Succulent</option>
                            <option value="Flowering">Flowering</option>
                            <option value="Herb">Herb</option>
                            <option value="Climber">Climber</option>
                        </select>
                    </div>
                    <button onClick={() => setShowAddModal(true)} className="w-full md:w-auto px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200">
                        Add New Plant
                    </button>
                </div>
                
                <div id="plants-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading && (
                        <div className="flex justify-center items-center mt-8 col-span-full">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
                        </div>
                    )}
                    {error && (
                        <div className="text-center text-red-500 mt-8 col-span-full">
                            {error}
                        </div>
                    )}
                    {!loading && !error && filteredPlants.length === 0 && (
                        <p className="text-center text-gray-500 col-span-full">No plants found matching your criteria.</p>
                    )}
                    {!loading && filteredPlants.map(plant => (
                        <PlantCard key={plant.id} plant={plant} />
                    ))}
                </div>
            </main>

            {showAddModal && <AddPlantModal showModal={showAddModal} onClose={() => setShowAddModal(false)} onPlantAdded={fetchPlants} />}
        </div>
    );
};

export default App;
