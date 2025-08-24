// backend/server.js
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// This file acts as a simple, static database for the plants.
export const initialPlants = [
  { id: 1, name: 'Money Plant', price: 12.99, categories: ['Indoor', 'Home Decor', 'Climber'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Money+Plant', description: 'A popular indoor plant known for its air-purifying qualities and easy care.' },
  { id: 2, name: 'Snake Plant', price: 15.50, categories: ['Indoor', 'Succulent', 'Air Purifying'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Snake+Plant', description: 'Tolerant of low light and drought, making it one of the easiest houseplants to grow.' },
  { id: 3, name: 'Jade Plant', price: 10.00, categories: ['Indoor', 'Succulent'], available: false, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Jade+Plant', description: 'A classic succulent with thick, woody stems and fleshy, oval-shaped leaves.' },
  { id: 4, name: 'Aloe Vera', price: 8.75, categories: ['Indoor', 'Medicinal', 'Succulent'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Aloe+Vera', description: 'A succulent plant species that is widely grown as a medicinal plant.' },
  { id: 5, name: 'Fiddle Leaf Fig', price: 35.00, categories: ['Indoor', 'Foliage'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Fiddle+Leaf+Fig', description: 'A trendy indoor tree with large, violin-shaped leaves.' },
  { id: 6, name: 'Peace Lily', price: 18.50, categories: ['Indoor', 'Flowering'], available: false, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Peace+Lily', description: 'Known for its beautiful white flowers and ability to thrive in low light.' },
  { id: 7, name: 'ZZ Plant', price: 20.00, categories: ['Indoor', 'Low-light'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=ZZ+Plant', description: 'Incredibly resilient and tolerant of neglect, making it ideal for beginners.' },
  { id: 8, name: 'Spider Plant', price: 9.25, categories: ['Indoor', 'Hanging'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Spider+Plant', description: 'Known for its long, spindly leaves and ability to produce plantlets that resemble spiders.' },
  { id: 9, name: 'Rubber Plant', price: 25.00, categories: ['Indoor', 'Foliage'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Rubber+Plant', description: 'A hardy, low-maintenance houseplant with glossy, dark green leaves.' },
  { id: 10, name: 'Pothos', price: 11.50, categories: ['Indoor', 'Home Decor', 'Hanging'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Pothos', description: 'An easy-to-grow trailing vine that is very forgiving and thrives in various conditions.' },
  { id: 11, name: 'Boston Fern', price: 14.00, categories: ['Indoor', 'Hanging'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Boston+Fern', description: 'A classic indoor plant with arching fronds of tiny leaves.' },
  { id: 12, name: 'Orchid', price: 22.00, categories: ['Indoor', 'Flowering'], available: false, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Orchid', description: 'A delicate and beautiful flowering plant with a wide range of colors and shapes.' },
  { id: 13, name: 'Mint Plant', price: 7.50, categories: ['Outdoor', 'Herb', 'Edible'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Mint+Plant', description: 'A fast-growing perennial herb known for its refreshing aroma and taste.' },
  { id: 14, name: 'Tomato Plant', price: 5.00, categories: ['Outdoor', 'Vegetable', 'Edible'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Tomato+Plant', description: 'A popular garden plant that produces delicious, juicy fruit.' },
  { id: 15, name: 'Rose Bush', price: 28.00, categories: ['Outdoor', 'Flowering'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Rose+Bush', description: 'Known for its beautiful, fragrant flowers and thorny stems.' },
  { id: 16, name: 'Lavender', price: 16.00, categories: ['Outdoor', 'Herb', 'Flowering'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Lavender', description: 'A fragrant herb known for its calming properties and beautiful purple flowers.' },
  { id: 17, name: 'Sunflower', price: 6.50, categories: ['Outdoor', 'Flowering'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Sunflower', description: 'A large flowering plant with a cheerful, yellow head that follows the sun.' },
  { id: 18, name: 'Cactus', price: 9.00, categories: ['Indoor', 'Succulent'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Cactus', description: 'A hardy succulent that thrives in dry, arid conditions with minimal water.' },
  { id: 19, name: 'Succulent Mix', price: 14.50, categories: ['Indoor', 'Succulent', 'Home Decor'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Succulent+Mix', description: 'A collection of various small succulents, perfect for terrariums and displays.' },
  { id: 20, name: 'Monstera Deliciosa', price: 29.99, categories: ['Indoor', 'Home Decor', 'Foliage'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Monstera+Deliciosa', description: 'A tropical plant with large, fenestrated leaves that create a stunning visual effect.' },
  { id: 21, name: 'Calathea Orbifolia', price: 22.50, categories: ['Indoor', 'Foliage'], available: false, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Calathea+Orbifolia', description: 'Known for its stunning, large, round leaves with intricate patterns.' },
  { id: 22, name: 'Majesty Palm', price: 38.00, categories: ['Indoor', 'Tree', 'Foliage'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Majesty+Palm', description: 'A large, elegant indoor palm that adds a tropical feel to any room.' },
  { id: 23, name: 'Yucca Plant', price: 25.00, categories: ['Indoor', 'Succulent'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Yucca+Plant', description: 'A spiky, architectural plant that is very low maintenance.' },
  { id: 24, name: 'Umbrella Tree', price: 26.00, categories: ['Indoor', 'Foliage'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Umbrella+Tree', description: 'A fast-growing plant with a unique, umbrella-like leaf structure.' },
  { id: 25, name: 'Ponytail Palm', price: 19.00, categories: ['Indoor', 'Succulent'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Ponytail+Palm', description: 'A quirky, low-maintenance succulent with a bulbous trunk and long, hair-like leaves.' },
  { id: 26, name: 'String of Pearls', price: 13.50, categories: ['Indoor', 'Succulent', 'Hanging'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=String+of+Pearls', description: 'A unique succulent with cascading, bead-like leaves.' },
  { id: 27, name: 'Eucalyptus', price: 15.00, categories: ['Outdoor', 'Fragrant'], available: false, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Eucalyptus', description: 'A tree or shrub known for its strong, aromatic leaves.' },
  { id: 28, name: 'Japanese Maple', price: 45.00, categories: ['Outdoor', 'Tree', 'Foliage'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Japanese+Maple', description: 'A beautiful deciduous tree known for its delicate leaves and vibrant fall colors.' },
  { id: 29, name: 'Boxwood', price: 20.00, categories: ['Outdoor', 'Hedge'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Boxwood', description: 'A slow-growing evergreen shrub, commonly used for hedges and topiary.' },
  { id: 30, name: 'Hydrangea', price: 22.00, categories: ['Outdoor', 'Flowering'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Hydrangea', description: 'A popular flowering shrub with large, beautiful clusters of flowers.' },
  { id: 31, name: 'Impatiens', price: 7.00, categories: ['Outdoor', 'Flowering'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Impatiens', description: 'A versatile annual flower that thrives in shady areas.' },
  { id: 32, name: 'Marigold', price: 6.00, categories: ['Outdoor', 'Flowering'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Marigold', description: 'A bright and cheerful annual flower that is easy to grow.' },
  { id: 33, name: 'Petunia', price: 8.00, categories: ['Outdoor', 'Flowering'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Petunia', description: 'A popular flowering plant with a trumpet-shaped flower.' },
  { id: 34, name: 'Zinnia', price: 7.50, categories: ['Outdoor', 'Flowering'], available: false, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Zinnia', description: 'A colorful annual flower that is easy to grow from seed.' },
  { id: 35, name: 'Coleus', price: 9.50, categories: ['Outdoor', 'Foliage'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Coleus', description: 'A stunning foliage plant with vibrant, colorful leaves.' },
  { id: 36, name: 'Hostas', price: 12.00, categories: ['Outdoor', 'Foliage'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Hostas', description: 'A popular shade-loving plant known for its beautiful leaves.' },
  { id: 37, name: 'Daffodil', price: 5.00, categories: ['Outdoor', 'Flowering', 'Bulb'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Daffodil', description: 'A classic spring flower with bright yellow or white petals.' },
  { id: 38, name: 'Tulip', price: 6.00, categories: ['Outdoor', 'Flowering', 'Bulb'], available: false, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Tulip', description: 'A popular spring flower known for its cup-shaped blooms.' },
  { id: 39, name: 'Hyacinth', price: 7.00, categories: ['Outdoor', 'Flowering', 'Bulb'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Hyacinth', description: 'A fragrant spring-blooming bulb with dense clusters of flowers.' },
  { id: 40, name: 'Iris', price: 8.50, categories: ['Outdoor', 'Flowering', 'Perennial'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Iris', description: 'A hardy perennial flower with showy, intricate blooms.' },
  { id: 41, name: 'Daylily', price: 10.00, categories: ['Outdoor', 'Flowering', 'Perennial'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Daylily', description: 'A tough, low-maintenance perennial that blooms all summer long.' },
  { id: 42, name: 'Echinacea', price: 11.00, categories: ['Outdoor', 'Flowering', 'Medicinal'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Echinacea', description: 'Also known as purple coneflower, a popular perennial with daisy-like flowers.' },
  { id: 43, name: 'Creeping Thyme', price: 6.00, categories: ['Outdoor', 'Ground Cover', 'Herb'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Creeping+Thyme', description: 'A low-growing, fragrant ground cover that is great for walkways.' },
  { id: 44, name: 'Jasmine', price: 18.00, categories: ['Outdoor', 'Vine', 'Fragrant'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Jasmine', description: 'A fragrant vine with beautiful white flowers, perfect for trellises.' },
  { id: 45, name: 'Ivy', price: 10.00, categories: ['Outdoor', 'Indoor', 'Climber'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Ivy', description: 'A classic climbing vine that can be grown both indoors and outdoors.' },
  { id: 46, name: 'Hellebore', price: 20.00, categories: ['Outdoor', 'Flowering'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Hellebore', description: 'A perennial plant known for its beautiful, nodding flowers that bloom in winter.' },
  { id: 47, name: 'Pansy', price: 5.00, categories: ['Outdoor', 'Flowering'], available: false, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Pansy', description: 'A cheerful, cold-tolerant flower with face-like markings on its petals.' },
  { id: 48, name: 'Rhododendron', price: 30.00, categories: ['Outdoor', 'Flowering'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Rhododendron', description: 'A large flowering shrub with showy clusters of flowers.' },
  { id: 49, name: 'Azalea', price: 28.00, categories: ['Outdoor', 'Flowering'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Azalea', description: 'A beautiful flowering shrub that is a member of the rhododendron family.' },
  { id: 50, name: 'Crocus', price: 4.50, categories: ['Outdoor', 'Flowering', 'Bulb'], available: true, image: 'https://placehold.co/400x400/C1E7C4/3F6C40?text=Crocus', description: 'One of the first flowers to bloom in the spring, often pushing through snow.' },
];
let plants = [...initialPlants];

// Middleware
app.use(express.json());
app.use(cors());

// GET endpoint to fetch all plants
app.get('/api/plants', (req, res) => {
  res.json(plants);
});

// POST endpoint to add a new plant
app.post('/api/plants', (req, res) => {
  const newPlant = req.body;
  if (!newPlant.name || !newPlant.price || !newPlant.categories) {
    return res.status(400).json({ error: 'Name, price, and categories are required.' });
  }

  const id = plants.length > 0 ? Math.max(...plants.map(p => p.id)) + 1 : 1;
  const plantWithId = { ...newPlant, id };
  plants.push(plantWithId);
  console.log(`New plant added: ${plantWithId.name}`);
  res.status(201).json(plantWithId);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
