import { rest } from "msw";
import endpoints from "../../configs/endpoints";
import {
  GetAllProjects,
  GetProjectById,
  NewProject,
} from "../../hooks/types/useProjectTypes";
import { SignUpResponse, UserToken } from "../../hooks/types/useUserTypes";
import mockProject from "../mocks/mockProject";
import mockUser from "../mocks/mockUser";

const apiUrl = process.env.REACT_APP_API_URL as string;

const handlers = [
  rest.get(`${apiUrl}${endpoints.usersRoot}/${mockUser.id}`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        user: mockUser,
      })
    )
  ),

  rest.get(`${apiUrl}${endpoints.usersRoot}/falseId`, (req, res, ctx) =>
    res(
      ctx.status(400),
      ctx.json({
        error: "Invalid username or password",
      })
    )
  ),

  rest.post(`${apiUrl}${endpoints.logIn}`, async (req, res, ctx) => {
    const { password } = await req.json();
    const status = password === "" ? 400 : 200;

    return res(
      ctx.status(status),
      ctx.json<UserToken>({
        user: { token: "#" },
      })
    );
  }),

  rest.post(`${apiUrl}${endpoints.signUp}`, async (req, res, ctx) => {
    const { password } = await req.json();
    const status = password === "" ? 400 : 200;

    return res(
      ctx.status(status),
      ctx.json<SignUpResponse>({
        newUser: mockUser,
      })
    );
  }),

  rest.get(`${apiUrl}${endpoints.getAll}`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<GetAllProjects>({
        projects: [mockProject],
      })
    );
  }),

  rest.get(
    `${apiUrl}${endpoints.projectsRoot}/allWithError`,
    async (req, res, ctx) => {
      return res(
        ctx.status(404),
        ctx.json<GetAllProjects>({
          projects: [],
        })
      );
    }
  ),

  rest.get(
    `${apiUrl}${endpoints.projectById}${mockProject.id}`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json<GetProjectById>({
          project: mockProject,
        })
      );
    }
  ),

  rest.get(
    `${apiUrl}${endpoints.projectsRoot}/falseId`,
    async (req, res, ctx) => {
      return res(
        ctx.status(404),
        ctx.json<GetProjectById>({
          project: "No projects found",
        })
      );
    }
  ),

  rest.post(`${apiUrl}${endpoints.createProject}`, async (req, res, ctx) => {
    const { name } = await req.json();
    const status = name === "" ? 400 : 201;

    return res(
      ctx.status(status),
      ctx.json<NewProject>({
        projectCreated: mockProject,
      })
    );
  }),
];

export default handlers;
