import express from "express";
import { createNotice, getNotice, updateNotice, deleteNotice } from "../../controllers/notice/noticeController.js";
import { authChecker } from "../../middlewares/authCheckerMiddleware.js";

export const noticeRouter = express.Router();


noticeRouter.get("/", authChecker, getNotice);

noticeRouter.post("/add", authChecker, createNotice);

noticeRouter.patch("/update/:id", authChecker,updateNotice);

noticeRouter.delete("/delete",authChecker,deleteNotice);

