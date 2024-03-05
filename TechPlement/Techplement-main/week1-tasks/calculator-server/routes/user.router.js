import express from "express";
import { signIn, signUp } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/test", async (req, res) => {
  res.send("This user router is working");
});

router.post("/signup", signUp);

router.post("/signin", signIn);

export default router;
