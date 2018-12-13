import { Router } from 'express';
import parcel from '../controller/parcel';

const router = Router();

router.post('/create', parcel.create);
router.get('/', parcel.getAll);
// router.post('/auth/login', user.login);

export default router;
