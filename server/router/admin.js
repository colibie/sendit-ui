import { Router } from 'express';
import admin from '../controller/admin';

const router = Router();

router.post('/auth/login', admin.login);

export default router;
