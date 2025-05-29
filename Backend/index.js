import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db/index.js";
import cookieParser from "cookie-parser";
import connectCloudinary from "./utils/cloudinary.js";
import adminRouter from "./routes/admin.route.js";
import userRouter from "./routes/user.route.js";
import paymentRouter from "./routes/payment.route.js";
import courseRouter from "./routes/course.route.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: 'https://pwsaksham.vercel.app/', // Frontend URL
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true // Allow cookies
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: 'https://pwsaksham.vercel.app', // Frontend URL
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true // Allow cookies
  })
);

connectCloudinary();

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚙️ Server is running at port : ${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB Connection Failed !!! ", err);
  });

app.use("/api/admin", adminRouter);
app.use("/api/user",userRouter );
app.use("/api/course", courseRouter);
app.use("/api/payment",paymentRouter);
