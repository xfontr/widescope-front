import { IUser } from "../../types/user";
import mockProject from "./mockProject";

const mockUser: IUser = {
  id: "id",
  name: "name",
  email: "email@email.com",
  friends: ["friend_one", "friend_two"],
  projects: [mockProject],
};

export default mockUser;
