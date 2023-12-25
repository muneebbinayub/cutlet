import express from 'express';
import { signin, signup } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/signup',signin)
router.post('/signin',signup)

export default router;