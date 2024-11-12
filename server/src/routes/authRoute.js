import express from 'express';
import { signup, signin } from '../controllers/auth/authcontroller.js';
import { logoutController } from '../controllers/auth/logoutController.js';
import { fetchUser } from '../controllers/auth/fetchUserController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', logoutController);
router.post('/fetchUser', fetchUser);
// router.post('/google-login', googleAuth);   

export default router;