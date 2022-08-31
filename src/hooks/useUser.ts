import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  closeActionCreator,
  setMessageActionCreator,
  setTypeActionCreator,
  setVisibilityActionCreator,
} from "../store/slices/uiModal/uiModalSlice";
import {
  loadUserActionCreator,
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
      } catch (error) {}
    },
    [dispatch, getUserData]
  );

  const signUp = useCallback(
    async ({ name, password, email }: UserSignUpData): Promise<boolean> => {
      dispatch(setVisibilityActionCreator(true));
      dispatch(setMessageActionCreator("Loading"));
      dispatch(setTypeActionCreator("loading"));

      try {
        await axios.post(`${apiUrl}/users/sign-up`, {
          name,
          password,
          email,
        });

        logIn({ name, password });

        dispatch(setMessageActionCreator("You have been registered"));
        dispatch(setTypeActionCreator("success"));
        dispatch(closeActionCreator(true));
        return true;
      } catch (error) {
        dispatch(setMessageActionCreator("Error with the register process"));
        dispatch(setTypeActionCreator("error"));
        dispatch(closeActionCreator(true));
        return false;
      }
    },
    [logIn, dispatch]
  );

  return { signUp, logIn, getUserData };
};

export default useUser;
