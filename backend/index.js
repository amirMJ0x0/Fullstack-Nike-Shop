const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const Product = require('./models/Product');
const express = require('express');
const router = express.Router()
const cartRoutes = require("./routes/cart");

// require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// تنظیمات CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser())
app.use(express.json());
app.use('/auth', authRoutes);
app.use("/cart", cartRoutes);


mongoose.connect('mongodb://localhost:27017/Nike', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});


app.post('/products', async (req, res) => {
    const { name, price, description, imageUrl } = req.body
    try {
        const newProduct = new Product({ name, price, description, imageUrl })
        await newProduct.save()
        res.status(201).send(newProduct)
    } catch (error) {
        res.status(400).send(error)
    }
})

// GET /products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find(); // دریافت همه محصولات از MongoDB
        res.json(products); // ارسال محصولات به صورت JSON به کلاینت
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// GET /products/:id
app.get('/products/:id', async (req, res) => {

    try {
        const product = await Product.findById(req.params.id)
        if (!product)
            return res.status(404).json({ message: 'Product Not Found' })

        res.json(product)
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error })
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
