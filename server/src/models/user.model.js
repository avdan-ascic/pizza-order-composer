import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxLength: [16, "Name must have less than 17 characters!"],
    required: "Name is required!",
  },
  email: {
    type: String,
    trim: true,
    required: "Email is required!",
    match: [/.+\@.+\../, "Please enter a valid email address!"],
  },
  password: {
    type: String,
    required: "Password is required!",
  },
});

UserSchema.pre("save", async function (next) {
  // Check for same name or email
  const userModel = mongoose.model("User", UserSchema);

  const checkName = await userModel.findOne({ name: this.name });
  if (checkName) next(new Error("Name is already in use!"));

  const checkEmail = await userModel.findOne({ email: this.email });
  if (checkEmail) next(new Error("Email is already in use!"));

  // Validate password and hash
  const pwRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
  if (!pwRegex.test(this.password))
    next(
      new Error(
        "Password can contains at least one uppercase letter, at least one special character, and must be at least 6 characters long."
      )
    );

  try {
    (this.password = await bcrypt.hash(this.password, 10)), next();
  } catch (err) {
    next(new Error(err));
  }
});

export default mongoose.model("User", UserSchema);
