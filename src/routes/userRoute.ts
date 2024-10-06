import { Router } from "express";
import {
  createUserController,
  deleteUserByIdController,
  getUserByEmailController,
  getUserController,
  updateUserByIdController,
} from "../controllers/userController";

const router = Router();

// Get All Users
router.route("/").get(getUserController);

// User Signup
router.route("/signup").post(createUserController);

// Get user by email
router.route('/email').get(getUserByEmailController)

// Delete User By ID
router.route("/:id").delete(deleteUserByIdController);

// Update User By ID
router.route("/:id").patch(updateUserByIdController);

export default router;