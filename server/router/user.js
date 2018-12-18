import { Router } from 'express';
import user from '../controller/user';

const router = Router();

router.post('/auth/signup', user.create);
router.get('/', user.getAll);

export default router;
