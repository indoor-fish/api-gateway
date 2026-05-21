import { Router } from 'express';
import { SERVICE_URLS } from '@indoor-fish/shared-libs';
import { createServiceProxy } from '../proxy/httpProxy';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
router.use(authMiddleware);
router.use('/', createServiceProxy(SERVICE_URLS.ORDER_SERVICE_URL));

export default router;
