import { rest } from "msw";
import endpoints from "../../configs/endpoints";
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
      ctx.json({
        user: { token: "#" },
      })
    );
  }),

  rest.post(`${apiUrl}${endpoints.signUp}`, async (req, res, ctx) => {
    const { password } = await req.json();
    const status = password === "" ? 400 : 200;

    return res(
      ctx.status(status),
      ctx.json({
        newUser: mockUser,
      })
    );
  }),

  rest.get(`${apiUrl}${endpoints.getAll}`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        projects: [mockProject],
      })
    );
  }),
];

export default handlers;
