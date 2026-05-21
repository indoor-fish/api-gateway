import { Router } from 'express';
import { SERVICE_URLS } from '@indoor-fish/shared-libs';
import { createServiceProxy } from '../proxy/httpProxy';

const router = Router();
// Product browsing is public
router.use('/', createServiceProxy(SERVICE_URLS.CATALOG_SERVICE_URL));

export default router;
