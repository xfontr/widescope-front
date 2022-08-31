export interface UserBasicData {
  id: string;
  name: string;
  token: string;
}

export interface UserExtraData {
  email: string;
  friends: string[];
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
