export interface IUser {
  id: string;
  name: string;
  email: string;
  friends: string[];
}

export type protoUser = Omit<IUser, "id">;

export interface UserSignUpData {
  name: string;
  password: string;
  email: string;
}
