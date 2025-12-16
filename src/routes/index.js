import express from 'express';
import { authRoute } from './auth/authRoute.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "Project Start For RJ-Fitness-NodeBK" });
});

router.use('/auth',authRoute);

export default router;