import courseModel from "../models/course.model.js"; 

export const getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel
      .find({})

    res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

export const getLecturesByCourseId = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await courseModel.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course lectures fetched successfully",
      lectures: course.lectures,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch lectures",
      error: error.message,
    });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { title, description,price, category, thumbnail, lectures } = req.body;

    const existingCourse = await courseModel.findOne({ title });
    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: "Course with this title already exists",
      });
    }

    const courseData = {
      title,
      description,
      price,
      category,
    };

    if (thumbnail) {
      courseData.thumbnail = {
        public_id: thumbnail.public_id || "",
        secure_url: thumbnail.secure_url || "",
      };
    }

    if (lectures && Array.isArray(lectures)) {
      courseData.lectures = lectures;
      courseData.numberOfLectures = lectures.length;
    }

    const course = await courseModel.create(courseData);

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error("Error creating course:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: messages,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Course with this title already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};