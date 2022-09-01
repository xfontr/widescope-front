import { IUser } from "../../types/user";

export interface SignUpResponse {
  newUser: IUser;
}

export interface UserToken {
  user: {
    token: string;
  };
}

export interface DecodedToken {
  id: string;
  name: string;
  iat: number;
}
