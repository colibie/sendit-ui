import userRouter from './user';
import parcelRouter from './parcel';
import adminRouter from './admin';

export default (app) => {
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/parcels', parcelRouter);
  app.use('/api/v1/admin', adminRouter);
};
