import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
export const getAllAdmin = async (req, res, next) => {
  let admin;
  try {
    admin = await Admin.find();
  } catch (err) {
    console.log(err);
  }
  if (!admin) {
    return res.status(404).json({ message: "no Users Found" });
  }
  return res.status(200).json({ admin });
};

export const signup = async (req, res, next) => {
  const { email, password } = req.body;

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (existingAdmin) {
    return res
      .status(400)
      .json({ message: "Admin already Exists! Login Instead" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const admin = new Admin({
    email,
    password: hashedPassword,
  });

  try {
    await admin.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ admin });
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingAdmin) {
    return res
      .status(404)
      .json({ message: "Couldn't find admin by this email" });
  }
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  return res
    .status(200)
    .json({ message: "Login successful", admin: existingAdmin });
};
