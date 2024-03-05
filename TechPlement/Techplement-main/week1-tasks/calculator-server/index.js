import express from "express";
import "dotenv/config";
import connect from "./connect.js";
import cors from "cors";
import userRouter from "./routes/user.router.js";
import auditRouter from "./routes/audit.route.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/audit", auditRouter);
const PORT = process.env.PORT || 8000;

app.listen(PORT, callback);

function callback(err) {
  if (err) throw err;
  console.log(`App is listening to the port ${PORT}`);
  connect();
}

app.listen();
