import mongoose, { Schema, Document } from "mongoose";

// Define the interface for a User document (for TypeScript type safety)
interface IUser extends Document {
  firstName: string;
  lastName: string;
  address: string;
  birthday: Date;
  religion: string;
  gender: string;
  extracurricular: string[]; // Array of extracurricular activities
  course: string;
  image?: string; // Optional image field
  document?: string; // Optional document field
  status?:string;
}

// Define the user schema based on the form data
const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  birthday: { type: Date, required: true },
  religion: { type: String, required: true },
  gender: { type: String, required: true },
  extracurricular: { type: [String], default: [] }, // Array for extracurricular activities
  course: { type: String, required: true },
  image: { type: String }, // Optional: Image URL or file path
  document: { type: String }, // Optional: Document URL or file path
  status : { type: String },
});

// Create the model using the schema
const User = mongoose.model<IUser>("User", userSchema);

// Export the User model
export default User;
