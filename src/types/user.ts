import IContact from "./IContact";
import { Projects } from "./project";

export interface UserBasicData {
  id: string;
  name: string;
  token: string;
}

export interface UserExtraData {
  email: string;
  friends: IContact[];
  projects: Projects;
}

interface CompleteUser extends UserExtraData, UserBasicData {}

export type IUser = Omit<CompleteUser, "token">;

export interface UserSignUpData {
  name: string;
  password: string;
  email: string;
}

export interface UserLogInData {
  name: string;
  password: string;
}

export interface UserGetData {
  user: IUser;
}

export interface UserGetFriends {
  userFriends: IContact[];
}

export interface UserGetAllUsers {
  users: IUser[];
}
