process.env["NODE_CONFIG_DIR"] = "./settings";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import bodyparser from "body-parser";

// Internal Imports


const app = express();
const PORT = process.env.PORT || 5000;


// Router Imports
import { router as adminRouter } from "./src/routers/admin/base.js";
import { router as companyRouter } from "./src/routers/company/base.js";
import { router as studentRouter } from "./src/routers/student/student.js";


// Server Imports
import "./config/database/mongo.js";
import "./config/listeners/base.js";

// Server Middlewares and config
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression(1));
app.use(morgan("dev"));
app.set("trust proxy", true);
app.set("Cache-Control", "no-cache");

// Loading Routers
app.use("/admin", adminRouter);
app.use("/company", companyRouter);
app.use("/",studentRouter);

app.use(bodyparser.urlencoded({ extended: true }));

/**
 * Test Request
 */
app.get("/ping", async (req, res) => {
  try {
    res.status(200).send("pong");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});


app.listen(PORT, () => {
  console.log(`Server is up and running at PORT: ${PORT}`);
});

export default app;
