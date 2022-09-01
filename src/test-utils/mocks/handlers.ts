import { rest } from "msw";
import mockUser from "./mockUser";

const apiUrl = process.env.REACT_APP_API_URL as string;

const handlers = [
  rest.get(`${apiUrl}/users/${mockUser.id}`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        user: mockUser,
      })
    )
  ),

  rest.get(`${apiUrl}/users/falseId`, (req, res, ctx) =>
    res(
      ctx.status(400),
      ctx.json({
        error: "Invalid username or password",
      })
    )
  ),

  rest.post(`${apiUrl}/users/log-in`, async (req, res, ctx) => {
    const { password } = await req.json();
    const status = password === "" ? 400 : 200;

    return res(
      ctx.status(status),
      ctx.json({
        user: { token: "#" },
      })
    );
  }),

  rest.post(`${apiUrl}/users/sign-up`, async (req, res, ctx) => {
    const { password } = await req.json();
    const status = password === "" ? 400 : 200;

    return res(
      ctx.status(status),
      ctx.json({
        newUser: mockUser,
      })
    );
  }),
];

export default handlers;