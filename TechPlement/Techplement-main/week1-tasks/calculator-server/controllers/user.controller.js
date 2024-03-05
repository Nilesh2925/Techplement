import signupSchema from "../validations/signup.validate.js";
import signinSchema from "../validations/sigin.validate.js";
import "dotenv/config.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
export async function signUp(req, res) {
  try {
    await signupSchema.parse(req.body); // zod validation

    // check if the user already exists in the system or not

    const findUser = await User.findOne({
      email: req.body.email,
    });
    if (findUser) {
      return res.send({
        message: "User Already Exists",
      });
    }
    const newUser = new User(req.body);
    await newUser.save();

    // generate json web token
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    res.status("404").send(error);
    console.error("User Registration failed", error);
  }
}

export async function signIn(req, res) {
  try {
    // zod validation
    signinSchema.parse(req.body);

    const findUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    })
      .lean()
      .exec();
    if (findUser) {
      let token = jwt.sign(
        {
          userId: findUser._id,
        },
        process.env.JWT_SECRET
      );

      res.json({
        message: "Login in Successfully",
        token,
      });
      return;
    }
    res.status("404").send({
      message: "Login in failed",
    });
  } catch (error) {
    res.status(404).send(error);
  }
}
