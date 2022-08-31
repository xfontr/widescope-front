import { UserBasicData, UserExtraData } from "../../types/user";

export const mockUserBasicData: UserBasicData = {
  id: "id",
  name: "username",
  token: "userToken",
};

export const mockUserExtraData: UserExtraData = {
  email: "email@email.com",
  friends: ["friend_one", "friend_two"],
};
