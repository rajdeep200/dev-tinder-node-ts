import validator from "validator";
import { IUserDocument } from "../models/UserModel";

export const validateSignUpPayload = (payload: IUserDocument) => {
  console.log("INSIDE validateSignUpPayload");
  const { firstName, lastName, email, password } = payload;

  if (!validator.isAlpha(firstName) || !validator.isAlpha(lastName)) {
    throw new Error("First name must contain only alphabetic characters.");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email address.");
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    throw new Error(
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
  }
};
