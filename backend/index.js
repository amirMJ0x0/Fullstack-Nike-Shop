const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const Product = require('./models/Product');
const express = require('express');
// require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// تنظیمات CORS
app.use(cors({
    origin: 'http://localhost:5173', // آدرس فرانت‌اند
    credentials: true // فعال کردن ارسال کوکی‌ها
}));
app.use(cookieParser())
app.use(express.json());
app.use('/auth', authRoutes);


mongoose.connect('mongodb://localhost:27017/Nike', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// const newProduct = new Product({
//     name: "Nike Air Max",
//     price: 120,
//     description: "A comfortable and stylish running shoe.",
//     imageUrl: "/images/nike-air-max.png",
// });

// newProduct.save().then(() => console.log('Product saved!'))
//     .catch((err) => {
//         console.error('Error connecting to MongoDB:', err);
//     });

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

//* مسیر GET برای دریافت همه محصولات
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find(); // دریافت همه محصولات از MongoDB
        res.json(products); // ارسال محصولات به صورت JSON به کلاینت
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

});
