import express from "express";
import { addRole, profileUpdate, sendLink } from "../../controllers/comman/commanController.js";

export const commanRoute = express.Router();

commanRoute.post("/send/link",sendLink)

commanRoute.post("/profile/update",profileUpdate)

commanRoute.post("/role/add",addRole)


// module.exports = sendLinkRoute; 