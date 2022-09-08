import { DecodedToken } from "../../hooks/types/useUserTypes";
import getTokenData from "../auth/auth";

let token: string | null;
let decodedToken: DecodedToken | undefined = undefined;

const setUserState = () => {
  token = localStorage.getItem("token");
  decodedToken = token ? getTokenData(token) : undefined;

  return {
    isLogged: token ? true : false,
    user: {
      id: decodedToken ? decodedToken.id : undefined,
      name: decodedToken ? decodedToken.name : undefined,
      token: token ? token : undefined,
    },
  };
};

export default setUserState;
