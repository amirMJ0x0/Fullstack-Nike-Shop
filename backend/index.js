const mongoose = require('mongoose');
const cors = require('cors')
const Product = require('./models/Product');

const express = require('express');
const app = express();
const port = 3000;

app.use(cors()) //enable CORS for all requests
app.use(express.json());

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
