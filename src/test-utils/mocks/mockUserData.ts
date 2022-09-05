import { UserBasicData, UserExtraData } from "../../types/user";
import mockProject from "./mockProject";
import mockUser from "./mockUser";

export const mockUserBasicData: UserBasicData = {
  id: mockUser.id,
  name: mockUser.name,
  token: "userToken",
};

export const mockUserExtraData: UserExtraData = {
  email: mockUser.email,
  friends: mockUser.friends,
  projects: [mockProject],
};
