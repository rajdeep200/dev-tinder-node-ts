import { Router } from "express";
import {
  createUserController,
  deleteUserByIdController,
  getUserByEmailController,
  getUserController,
  updateUserByIdController,
  userLoginController,
} from "../controllers/userController";
import { mwJwtAuth } from "../middlewares/auth";

const router = Router();

// Get All Users
router.route("/").get(mwJwtAuth, getUserController);

// User Signup
router.route("/signup").post(createUserController);

// Get user by email
router.route('/email').get(mwJwtAuth, getUserByEmailController)

// Delete User By ID
router.route("/:id").delete(mwJwtAuth, deleteUserByIdController);

// Update User By ID
router.route("/:id").patch(mwJwtAuth, updateUserByIdController);

// Login User
router.route("/login").post(userLoginController)

export default router;