import userRouter from './user';

export default (app) => {
  app.use('/api/v1/users', userRouter);
};
