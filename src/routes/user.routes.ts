import { Router } from 'express';
import { SERVICE_URLS } from '@indoor-fish/shared-libs';
import { createServiceProxy } from '../proxy/httpProxy';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Public routes — no auth required
router.post('/register', createServiceProxy(SERVICE_URLS.USER_SERVICE_URL));
router.post('/login', createServiceProxy(SERVICE_URLS.USER_SERVICE_URL));
router.post('/refresh', createServiceProxy(SERVICE_URLS.USER_SERVICE_URL));

// Protected routes
router.use(authMiddleware);
router.use('/', createServiceProxy(SERVICE_URLS.USER_SERVICE_URL));

export default router;
