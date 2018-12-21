import { Router } from 'express';
import user from '../controller/user';
import { authorize } from '../middleware/accessToken';

const router = Router();

router.post('/auth/signup', user.create);
<<<<<<< HEAD
router.get('/', user.getAll);
=======
router.get('/', authorize(['admin']), user.getAll);
router.post('/auth/login', user.login);
router.get('/:placedby/parcels', authorize(['admin', 'user']), user.getUserparcels);
>>>>>>> 97964f66e9688d976c0d70ef564b78b1f5a59a77

export default router;
