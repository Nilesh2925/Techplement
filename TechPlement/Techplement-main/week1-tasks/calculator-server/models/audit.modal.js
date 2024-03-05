import mongoose from "mongoose";

const auditSchema = new mongoose.Schema({
  history: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Audit = mongoose.model("audit", auditSchema);

export default Audit;
