import express from "express";
import {
  audit,
  deleteAudit,
  getAudit,
  deletesingleAudit,
} from "../controllers/audit.controller.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Audit router is working");
});

router.post("/", audit);
router.get("/", getAudit);
router.delete("/", deleteAudit);
router.delete("/:id", deletesingleAudit);
export default router;
