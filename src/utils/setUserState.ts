import { DecodedToken } from "../hooks/types/useUserTypes";
import getTokenData from "./auth";

const setUserState = () => {
  const token = localStorage.getItem("token");
  let decodedToken: DecodedToken | undefined = undefined;

  if (token) {
    decodedToken = getTokenData(token);
  }

  return {
    isLogged: token ? true : false,
    user: {
      id: decodedToken ? decodedToken!.id : undefined,
      name: decodedToken ? decodedToken!.name : undefined,
      token: token ? token : undefined,
    },
  };
};

export default setUserState;
