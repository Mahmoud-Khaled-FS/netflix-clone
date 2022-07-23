import { Router } from 'express';
import * as authControllers from '../controllers/auth.controller';

const router = Router();

router.post('/login', authControllers.getLoginHandler);
// Create New User In Database
router.post('/signup', authControllers.createNewAccountHandler);

export default router;
