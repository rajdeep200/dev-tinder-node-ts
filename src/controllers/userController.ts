import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import {
  createUser,
  deleteUserById,
  getUserByEmail,
  getUsers,
  updateUserById,
} from "../services/userService";
import { ALLOWED_USER_DOC_UPDATES, ERROR_MESSAGES } from "../utils/constants";
import { ResponseBody } from "../classes/ErrorResponse";
import { validateSignUpPayload } from "../utils/validator";
import { JwtAuth } from "../utils/utils";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateSignUpPayload(req.body);
    const hashedPassword: string = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = await createUser(req.body);
    const userId: string | unknown = user._id;
    const jwtToken = await new JwtAuth().generateToken(userId);
    res.status(200).json({
      success: true,
      data: { user, token: jwtToken },
    });
  } catch (error) {
    console.error("Error creating user :: ", error);
    res.status(500).json({
      error,
    });
    next(error);
  }
};

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserByEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    console.log('email :: ', email)
    if (!email) {
      res.status(400).json({ msg: ERROR_MESSAGES.BAD_REQUEST });
      return;
    }
    const user = await getUserByEmail(email);
    console.log('user :: ', user)
    if (!user) {
      res.status(200).json({
        msg: ERROR_MESSAGES.USER_NOT_FOUND,
      });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("getUserByEmailController Error :: ", error);
    next(error);
  }
};

export const deleteUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ msg: ERROR_MESSAGES.BAD_REQUEST });
    }
    const response = await deleteUserById(id);
    if (!response)
      res.status(200).json({
        msg: ERROR_MESSAGES.USER_NOT_FOUND,
      });
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.log("deleteUserByIdController Error :: ", error);
    next(error);
  }
};

export const updateUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const updateAllowed = Object.keys(req.body).every((k) =>
      ALLOWED_USER_DOC_UPDATES.includes(k)
    );
    if (!updateAllowed) {
      res.status(400).json(new ResponseBody(false, ERROR_MESSAGES.BAD_REQUEST));
    }

    if (!id) {
      res.status(400).json(new ResponseBody(false, ERROR_MESSAGES.BAD_REQUEST));
    }
    const response = await updateUserById(id, req.body);
    if (!response)
      res
        .status(500)
        .json(new ResponseBody(false, ERROR_MESSAGES.USER_NOT_FOUND, response));
    res
      .status(200)
      .json(new ResponseBody(true, ERROR_MESSAGES.USER_UPDATED, response));
  } catch (error) {
    console.log("updateUserByIdController Error :: ", error);
    next(error);
  }
};

export const userLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).json(new ResponseBody(false, ERROR_MESSAGES.BAD_REQUEST));
    }

    // Check if user exist
    const user = await getUserByEmail(email);
    if (!user) {
      res
        .status(404)
        .json(new ResponseBody(false, ERROR_MESSAGES.USER_NOT_FOUND));
      return;
    }

    // Check Password Validation
    const isValidPassword = await bcrypt.compare(
      password,
      user?.password ?? ""
    );
    if (!isValidPassword) {
      res
        .status(401)
        .json(new ResponseBody(false, ERROR_MESSAGES.WRONG_PASSWORD));
      return;
    }
    user.password = "";

    const userId: string | unknown = user?._id || "";
    const jwtToken = await new JwtAuth().generateToken(userId);

    res
      .status(200)
      .json(
        new ResponseBody(true, ERROR_MESSAGES.LOGIN_SUCCESS, {
          user,
          token: jwtToken,
        })
      );
  } catch (error) {
    console.log("userLoginController Error :: ", error);
    next(error);
  }
};
