import { Router } from 'express';
import parcel from '../controller/parcel';
import { authorize } from '../middleware/accessToken';

const router = Router();
const admin = 'admin';
const user = 'user';

router.post('/', authorize([admin, user]), parcel.create);

router.get('/', authorize([admin]), parcel.getAll);

router.get('/:parcelId', authorize([admin, user]), parcel.getById);

router.patch('/:parcelId/destination', authorize([admin, user]), parcel.changeDestination);

router.patch('/:parcelId/cancel', authorize([admin, user]), parcel.cancel);

router.patch('/:parcelId/status', parcel.changeStatus);

router.patch('/:parcelId/currentlocation', authorize([admin]), parcel.changeLocation);

export default router;
