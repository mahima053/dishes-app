import express, { Application } from "express";
import path from "path";
import logger from "morgan";
import i18next from "i18next";
import middleware from "i18next-http-middleware";
import dishRoutes from "@features/dishes/routes";
const cors = require("cors");

const app: Application = express();
const router = express.Router();
// Health check route
router.get("health", (req, res) => {
  res.json({
    status: "Healthy",
  });
});
// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// app.use(middleware.handle(i18next));
app.use("/api/dishes", dishRoutes);
app.use("/", router);

export default app;
