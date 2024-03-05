import mongoose from "mongoose";

export default function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI + "/techplament");
    console.log(`Connected to the DB`);
  } catch (error) {
    console.log(`Error while connecting to the database ${error}`);
  }
}
