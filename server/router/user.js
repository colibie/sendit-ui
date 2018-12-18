import { Router } from 'express';
import user from '../controller/user';

const router = Router();

router.post('/auth/signup', user.create);
router.get('/', user.getAll);
router.post('/auth/login', user.login);
router.get('/:placedby/parcels', user.getUserparcels);

export default router;
