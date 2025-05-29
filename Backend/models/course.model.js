import { model, Schema } from "mongoose";
import { type } from "os";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Title is required"],
      minLength: [8, "Title must be at least 8 character"],
      maxLength: [59, "Title should be less than 60 character"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minLength: [8, "Description must be at least 8 character"],
      maxLength: [500, "Description should be less than 500 character"],
    },
    price:{
      type:String,
      default:"Free"
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    lectures: [
      {
        title: String,
        description: String,
        lecture: {
          public_id: {
            type: String,
          },
          secure_url: {
            type: String,
          },
        },
      },
    ],
    numberOfLectures: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const courseModel = model("Course", courseSchema);

export default courseModel;
