import express from 'express';
import { addTrainer, allTrainers, deleteTrainer, getTrainerById, updateTrainer } from '../../controllers/trainer/trainerController.js';
import { authChecker } from '../../middlewares/authCheckerMiddleware.js';

export const trainerRoute = express.Router();

trainerRoute.get("/",authChecker,allTrainers)

trainerRoute.post("/add",authChecker,addTrainer)

trainerRoute.put("/update/:trainerId",authChecker,updateTrainer)

trainerRoute.delete("/delete/:trainerId",authChecker,deleteTrainer)

trainerRoute.get("/:id", authChecker, getTrainerById);


