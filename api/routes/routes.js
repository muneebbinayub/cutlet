import express from 'express';
import { signin } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/signup',signin)
// router.post('/signup',sign)

export default router;