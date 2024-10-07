import User, { IUserDocument } from "../models/UserModel";
import { IUser } from "../interfaces/IUser";
import { UpdateUserPayload } from "../interfaces/PayloadObj";

export const createUser = async (user: IUser): Promise<IUserDocument> => {
  return await User.create(user);
};

export const getUsers = async (): Promise<IUserDocument[]> => {
  return await User.find();
};

export const getUserByEmail = async (
  email: string
): Promise<IUserDocument | null> => {
  return await User.findOne({ email });
};

export const getUserById = async (
  id: string
): Promise<IUserDocument | null> => {
  return await User.findById(id);
};

export const deleteUserById = async (
  id: string
): Promise<IUserDocument | null> => {
  return await User.findByIdAndDelete(id);
};

export const updateUserById = async (
  id: string,
  updateObj: UpdateUserPayload
): Promise<IUserDocument | null> => {
  return await User.findByIdAndUpdate(id, updateObj, {
    returnDocument: "after",
    runValidators: true
  });
};
