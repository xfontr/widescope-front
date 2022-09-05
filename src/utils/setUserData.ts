import { IUser, UserBasicData, UserExtraData } from "../types/user";

export const setUserBasicData = (
  user: IUser,
  token: string = ""
): UserBasicData => ({
  id: user.id,
  name: user.name,
  token: token,
});

export const setUserExtraData = (user: IUser): UserExtraData => ({
  email: user.email,
  friends: user.friends,
  projects: user.projects,
});
