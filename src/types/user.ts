export interface IUser {
  id: string;
  name: string;
  email: string;
  friends: string[];
}

export interface UserSignUpData {
  name: string;
  password: string;
  email: string;
}

export interface UserLogInData {
  name: string;
  password: string;
}
