require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const priceRoutes = require('./routes/priceRoutes');
const brightGasPriceRoutes = require('./routes/brightGasPriceRoutes');
const productRoutes = require('./routes/productRoutes');
const contentRoutes = require('./routes/contentRoutes');
const faqRoutes = require('./routes/faqRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/prices', priceRoutes);
app.use('/api/bright-gas-prices', brightGasPriceRoutes);
app.use('/api/products', productRoutes);
app.use('/api/contents', contentRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
