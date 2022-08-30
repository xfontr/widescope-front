import jwt_decode from "jwt-decode";
import { DecodedToken } from "../hooks/useUserTypes";

const getTokenData = (token: string): DecodedToken => jwt_decode(token);

export default getTokenData;
