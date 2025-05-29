import express from "express";
import {
  loginAdmin,
} from "../controllers/admin.controller.js";
import upload from "../middleware/multer.js";
import {authAdmin} from ".././middleware/auth.middleware.js";
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);

export default adminRouter;
