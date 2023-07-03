import mongoose, { Schema } from 'mongoose';
import bcrypt from "bcrypt"
import IUser from '../interface/IUser';

const schema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true }
});

schema.pre('save', async function (next) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(9);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Replace the plaintext password with the hashed password
    this.password = hashedPassword;

    // Call the next middleware in the chain
    next();
  } catch (error:any) {
    return next(error);
  }
});
export default mongoose.model<IUser>("user", schema)