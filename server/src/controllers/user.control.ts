import { Request, Response } from "express";
import User from "../models/user.models"; // Assuming the User model is defined elsewhere

export const submitForm = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      address,
      birthday,
      religion,
      gender,
      extracurricular,
      course,
      image,
      document,
      status,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !address ||
      !birthday ||
      !religion ||
      !gender ||
      !course
    ) {
      return res
        .status(400)
        .json({ err: "All required fields must be filled in" });
    }

    const newUser = new User({
      firstName,
      lastName,
      address,
      birthday,
      religion,
      gender,
      extracurricular,
      course,
      image: image || null,
      document: document || null,
      status,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .json({ err: "Failed to submit form", details: err.message });
  }
};
export const getUser = async (req: Request, res: Response) => {
  try {
    const userDoc = await await User.find();

    res.status(200).json(userDoc);
  } catch (err) {
    res.status(400).send({ err: err });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Get the user ID from the request parameters
    const {
      firstName,
      lastName,
      address,
      birthday,
      religion,
      gender,
      extracurricular,
      course,
      image,
      document,
      status,
    } = req.body; // Get the updated data from the request body

    // Check if the user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user fields
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        address,
        birthday,
        religion,
        gender,
        extracurricular,
        course,
        image: image || existingUser.image,
        document: document || existingUser.document,
        status,
      },
      { new: true } // Return the updated document
    );

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: "Failed to update user",
      details: err.message,
    });
  }
};

export const findById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id)
    const userDoc = await User.findById(id);

    res.status(200).json(userDoc);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Get the user ID from the request parameters
    const { status } = req.body; // Get the updated status from the request body

    // Check if the user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's status field
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status }, // Only update the status
      { new: true } // Return the updated document
    );

    res.status(200).json({
      message: "User status updated successfully",
      user: updatedUser,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: "Failed to update user status",
      details: err.message,
    });
  }
};
export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Extract the id from request parameters
    console.log("Deleting user with ID:", id);

    // Delete the document from the database
    const deletedUser = await User.findByIdAndDelete(id);

    // Check if a user was deleted
    if (!deletedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send({ message: "User deleted successfully", deletedUser });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
