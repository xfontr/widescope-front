import { IUser, UserBasicData, UserExtraData } from "../types/user";

export const setUserBasicData = (user: IUser): UserBasicData => ({
  id: user.id,
  name: user.name,
  token: "",
});

export const setUserExtraData = (user: IUser): UserExtraData => ({
  email: user.email,
  friends: user.friends,
});
