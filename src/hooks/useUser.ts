import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  closeActionCreator,
  setVisibilityActionCreator,
} from "../store/slices/uiModal/uiModalSlice";
import {
  loadUserActionCreator,
  logOutActionCreator,
  toggleStatusActionCreator,
} from "../store/slices/user/userSlice";
import { loadUserDataActionCreator } from "../store/slices/userData/userDataSlice";
import {
  IUser,
  UserGetData,
  UserLogInData,
  UserSignUpData,
} from "../types/user";
import getTokenData from "../utils/auth";
import { setUserBasicData, setUserExtraData } from "../utils/setUserData";
import { UserToken } from "./useUserTypes";

const apiUrl = process.env.REACT_APP_API_URL;

const useUser = () => {
  const dispatch = useAppDispatch();

  const getUserData = useCallback(async (id: string): Promise<IUser | void> => {
    try {
      const {
        data: { user },
      }: AxiosResponse<UserGetData> = await axios.get(`${apiUrl}/users/${id}`);

      return user;
    } catch (error) {}
  }, []);

  const logIn = useCallback(
    async ({ name, password }: UserLogInData): Promise<void> => {
      dispatch(setVisibilityActionCreator(true));

      try {
        const {
          data: {
            user: { token },
          },
        }: AxiosResponse<UserToken> = await axios.post(
          `${apiUrl}/users/log-in`,
          {
            name,
            password,
          }
        );

        const tokenContent = getTokenData(token);

        localStorage.setItem("token", token);

        const user: IUser = (await getUserData(tokenContent.id)) as IUser;

        dispatch(loadUserActionCreator(setUserBasicData(user, token)));
        dispatch(loadUserDataActionCreator(setUserExtraData(user)));
        dispatch(toggleStatusActionCreator(true));

        dispatch(
          closeActionCreator({
            message: "Log in successful",
            type: "success",
          })
        );
      } catch (error) {
        dispatch(
          closeActionCreator({
            message: `Log in error: ${error}`,
            type: "error",
          })
        );
      }
    },
    [dispatch, getUserData]
  );

  const signUp = useCallback(
    async ({ name, password, email }: UserSignUpData): Promise<boolean> => {
      dispatch(setVisibilityActionCreator(true));
      try {
        await axios.post(`${apiUrl}/users/sign-up`, {
          name,
          password,
          email,
        });

        logIn({ name, password });

        return true;
      } catch (error) {
        dispatch(
          closeActionCreator({
            message: `Sign up error: ${error}`,
            type: "error",
          })
        );
        return false;
      }
    },
    [logIn, dispatch]
  );

  const logOut = () => {
    localStorage.clear();
    dispatch(logOutActionCreator());
  };

  return { signUp, logIn, getUserData, logOut };
};

export default useUser;
