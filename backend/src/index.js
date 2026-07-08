require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const priceRoutes = require('./routes/priceRoutes');
const brightGasPriceRoutes = require('./routes/brightGasPriceRoutes');
const productRoutes = require('./routes/productRoutes');
const locationRoutes = require('./routes/locationRoutes');
const contentRoutes = require('./routes/contentRoutes');
const sustainabilityRoutes = require('./routes/sustainabilityRoutes');
const faqRoutes = require('./routes/faqRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const appAuthRoutes = require('./routes/appAuthRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userDataRoutes = require('./routes/userDataRoutes');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '../public')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/prices', priceRoutes);
app.use('/api/bright-gas-prices', brightGasPriceRoutes);
app.use('/api/products', productRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/contents', contentRoutes);
app.use('/api/sustainability', sustainabilityRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);

// MyPertamina App Service Mock integration — proxied only, no shared DB.
app.use('/api/app/auth', appAuthRoutes);
app.use('/api/app', dashboardRoutes);
app.use('/api/app', userDataRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
