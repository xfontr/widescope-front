import { render } from "@testing-library/react";
import { Wrapper } from "./Wrapper";

const customRender = (view: JSX.Element, ...options: any) =>
  render(view, { wrapper: Wrapper, ...options });

export * from "@testing-library/react";

export { customRender as render };
