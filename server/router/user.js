import { Router } from 'express';
import user from '../controller/user';
import { authorize } from '../middleware/accessToken';

const router = Router();

router.post('/auth/signup', user.create);
router.get('/', authorize(['admin']), user.getAll);
router.post('/auth/login', user.login);
router.get('/:placedby/parcels', authorize(['admin', 'user']), user.getUserparcels);

export default router;
