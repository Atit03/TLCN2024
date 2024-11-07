const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

dotenv.config({ path: './config/config.env' });
connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

// ROUTES
app.use('/api/auth', require("./routes/auth"));
app.use("/api/users", require("./routes/user"));
app.use("/api/products", require("./routes/product"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/address", require("./routes/address"));
app.use("", require("./routes/momo"));


app.listen(PORT, () => console.log(`Server chạy trên cổng ${PORT}`));
