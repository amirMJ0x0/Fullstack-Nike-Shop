const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const Product = require('./models/Product');
const express = require('express');
const router = express.Router()
const cartRoutes = require("./routes/cart");
const productRoutes = require("./routes/productRoutes");

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
app.use("/products", productRoutes);


mongoose.connect('mongodb://localhost:27017/Nike', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
