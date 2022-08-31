import { rest } from "msw";

const apiUrl = process.env.REACT_APP_API_URL as string;

const handlers = [
  rest.get(apiUrl, (req, res, ctx) =>
    res(
      ctx.status(403),
      ctx.json({
        count: "36",
      })
    )
  ),

  rest.post(apiUrl, (req, res, ctx) =>
    res(
      ctx.status(403),
      ctx.json({
        count: "36",
      })
    )
  ),
];

export default handlers;
