import Audit from "../models/audit.modal.js";
import auditSchema from "../validations/audit.validate.js";
export async function audit(req, res) {
  try {
    auditSchema.parse(req.body);
    let response = await Audit.create(req.body);
    res.send({
      message: "Audit data posted successfully",
      response,
    });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
}

export async function getAudit(req, res) {
  try {
    const userEmail = req.query.email;
    const latestData = await Audit.find({ email: userEmail })
      .sort({ _id: -1 })
      .limit(10);
    res.json(latestData);
  } catch (error) {
    console.error("Error fetching latest data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteAudit(req, res) {
  try {
    const userEmail = req.query.email;
    const latestData = await Audit.deleteMany({ email: userEmail });
    res.json(latestData);
  } catch (error) {
    console.error("Error while removing data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deletesingleAudit(req, res) {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: "_id parameter is required" });
    }
    const deletionResult = await Audit.deleteOne({ _id: userId });
    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error while removing data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
