// backend/routes/plantRoutes.js
import express from 'express';

const router = express.Router();

// A simple in-memory database (will reset on server restart)
let plants = [
    {
        id: 1,
        name: 'Monstera Deliciosa',
        description: 'A popular tropical plant known for its unique split leaves.',
        image: 'https://images.unsplash.com/photo-1614850552684-255e2d1d36c4?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 55.00,
        available: true,
        categories: ['Indoor', 'Tropical']
    },
    {
        id: 2,
        name: 'Snake Plant',
        description: 'An air-purifying plant that is very easy to care for.',
        image: 'https://images.unsplash.com/photo-1596707834768-45ac7e0b57e7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 32.50,
        available: false,
        categories: ['Indoor', 'Succulent']
    },
    {
        id: 3,
        name: 'Lavender',
        description: 'A fragrant herb with beautiful purple flowers, great for gardens.',
        image: 'https://images.unsplash.com/photo-1558229792-3406f522f735?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 18.00,
        available: true,
        categories: ['Outdoor', 'Flowering', 'Herb']
    },
    {
        id: 4,
        name: 'Fiddle Leaf Fig',
        description: 'A tall, elegant indoor tree with large, violin-shaped leaves.',
        image: 'https://images.unsplash.com/photo-1614741334960-e4b7b6e92b1a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 95.00,
        available: false,
        categories: ['Indoor', 'Tree']
    },
    {
        id: 5,
        name: 'Rosemary',
        description: 'A woody, perennial herb with fragrant, evergreen, needle-like leaves.',
        image: 'https://images.unsplash.com/photo-1601614741334960-e4b7b6e92b1a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 15.50,
        available: true,
        categories: ['Outdoor', 'Herb']
    }
];

// GET all plants
router.get('/', (req, res) => {
    res.json(plants);
});

// POST a new plant
router.post('/', (req, res) => {
    const newPlant = {
        id: plants.length > 0 ? Math.max(...plants.map(p => p.id)) + 1 : 1,
        ...req.body
    };

    // Simple validation
    if (!newPlant.name || typeof newPlant.price !== 'number' || newPlant.price <= 0) {
        return res.status(400).json({ error: 'Invalid plant data.' });
    }

    plants.push(newPlant);
    res.status(201).json(newPlant);
});

export default router;
