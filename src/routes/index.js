import express from 'express';
import { authRoute } from './auth/authRoute.js';
import { trainerRoute } from './trainer/trainerRoute.js';
import { commanRoute } from './comman/commanRoute.js';
import { attendanceRouter } from './attendance/attendanceRoute.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "Project Start For RJ-Fitness-NodeBK" });
});

router.use('/auth',authRoute);

router.use('/trainer',trainerRoute);

router.use('/attendance',attendanceRouter);

router.use("/",commanRoute);

export default router;