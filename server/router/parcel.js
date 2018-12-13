import { Router } from 'express';
import user from '../controller/parcel';

const router = Router();

router.post('/create', user.create);
// router.get('/', user.getAll);
// router.post('/auth/login', user.login);

export default router;
