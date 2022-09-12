import { IUser } from "../../types/user";
import mockContact from "./mockContact";
import mockProject from "./mockProject";

const friend = {
  id: mockContact.id,
  name: mockContact.name,
};

const mockUser: IUser = {
  id: "id",
  name: "username",
  email: "email@email.com",
  friends: [friend, friend],
  projects: [mockProject],
};

export default mockUser;
