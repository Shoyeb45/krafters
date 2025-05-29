import express from "express";
import { getAllCourses, getLecturesByCourseId, createCourse } from "../controllers/course.controller.js";
import { authAdmin, authUser } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.js";

const courseRouter = express.Router();

courseRouter.get('/get-all', getAllCourses);
courseRouter.get('/lectures/:id', getLecturesByCourseId);
courseRouter.post('/create', authAdmin, upload.single("thumbnail"), createCourse);

export default courseRouter;