import express from "express";
import { addAttendance, deleteAttendance, getAttendanceByDate, updateAttendance } from "../../controllers/attendanceController/attendanceController.js";
import { authChecker } from "../../middlewares/authCheckerMiddleware.js";

export const attendanceRouter = express.Router();

attendanceRouter.get("/",authChecker,getAttendanceByDate)

attendanceRouter.post("/",authChecker,addAttendance)

attendanceRouter.patch("/",authChecker,updateAttendance);

attendanceRouter.delete("/",authChecker,deleteAttendance)
