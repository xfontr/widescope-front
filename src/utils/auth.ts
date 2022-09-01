import jwt_decode from "jwt-decode";
import { DecodedToken } from "../hooks/types/useUserTypes";

const getTokenData = (token: string): DecodedToken => jwt_decode(token);

export default getTokenData;
