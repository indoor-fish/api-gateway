import express from 'express';
import { rateLimitMiddleware } from './middleware/rateLimit.middleware';
import { loggerMiddleware } from './middleware/logger.middleware';
import userRoutes from './routes/user.routes';
import orderRoutes from './routes/order.routes';
import productRoutes from './routes/product.routes';
import paymentRoutes from './routes/payment.routes';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(loggerMiddleware);
app.use(rateLimitMiddleware);

app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'api-gateway' }));

app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
