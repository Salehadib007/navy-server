import express from "express";
import cors from "cors";
import loadEnv from "./config/env.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import setupRoutes from "./routes/setup.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import registrationRoutes from "./routes/registrationRoutes.js";

loadEnv();
connectDB();

const app = express();

const allowedOrigins = [
  "https://navy-ruddy.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow server-to-server requests
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
// app.options("*", cors());
app.use("/api/auth", authRoutes);
app.use("/api/setup", setupRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/enrollment", enrollmentRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/registrations", registrationRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

export default app;
