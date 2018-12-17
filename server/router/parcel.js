import { Router } from 'express';
import parcel from '../controller/parcel';

const router = Router();

router.post('/', parcel.create);
router.get('/', parcel.getAll);
router.get('/:parcelId', parcel.getById);
router.patch('/:parcelId/destination', parcel.changeDestination);
router.patch('/:parcelId/cancel', parcel.cancel);
// router.post('/auth/login', user.login);

export default router;
