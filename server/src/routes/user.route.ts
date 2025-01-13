import { Router } from "express";
import { body } from "express-validator";
import { deleteById, findById, getUser, submitForm, updateUser, updateUserStatus } from "../controllers/user.control"; // Import the submitForm controller
import { validate } from "../utils/validator"; // Assuming you have a validate utility for validation

const userRouter = Router();

// Registration route
userRouter.post(
  "/register",
  validate([
    body("firstName").notEmpty().withMessage("First name is required."),
    body("lastName").notEmpty().withMessage("Last name is required."),
    body("address").notEmpty().withMessage("Address is required."),
    // body("birthday").isDate().withMessage("Valid birthday is required."),
    body("religion").notEmpty().withMessage("Religion is required."),
    body("gender")
      .isIn(["male", "female"])
      .withMessage("Gender must be either male or female."),
    body("course").notEmpty().withMessage("Course is required."),
  ]),
  submitForm // Handle form submission
);
userRouter.get("/getuser", getUser);
userRouter.get("/getuser/:id", findById);
userRouter.put("/update/:id", updateUser);
userRouter.put("/updateStatus/:id", updateUserStatus);
userRouter.delete("/deleteUser/:id", deleteById);
export default userRouter;
