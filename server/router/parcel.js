import { Router } from 'express';
import parcel from '../controller/parcel';

const router = Router();

router.post('/', parcel.create);
router.get('/', parcel.getAll);
router.get('/:parcelId', parcel.getById);
router.patch('/:parcelId/destination', parcel.changeDestination);
router.patch('/:parcelId/cancel', parcel.cancel);
router.patch('/:parcelId/status', parcel.changeStatus);
router.patch('/:parcelId/currentlocation', parcel.changeLocation);

export default router;
