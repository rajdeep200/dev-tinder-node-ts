import mongoose, { Document, Schema } from "mongoose";
import validator from 'validator'
import { IUser } from "../interfaces/IUser";
import { ERROR_MESSAGES } from "../utils/constants";

export interface IUserDocument extends IUser, Document {}
const userSchema: Schema = new Schema<IUserDocument>(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 40
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 40
    },
    email: {
      type: String,
      required: [true, ERROR_MESSAGES.EMAIL_REQUIRED],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => {
          return validator.isEmail(value);
        },
        message: props => `${props.value} :: ${ERROR_MESSAGES.INVALID_EMAIL}`
      }
    },
    password: {
      type: String,
      required: [true, ERROR_MESSAGES.PASSWORD_REQUIRED],
      minlength: 8,
      validate: {
        validator: (value: string) => {
          return validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          });
        },
        message: props => `${props.value} :: ${ERROR_MESSAGES.PASSWORD_INCORRECT}`
      }
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      required: [true, ERROR_MESSAGES.GENDER_REQUIRED],
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} not supported`
      }
    },
  },
  { validateBeforeSave: true, timestamps: true }
);

export default mongoose.model<IUserDocument>("User", userSchema);
