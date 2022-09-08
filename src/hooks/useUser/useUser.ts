import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import endpoints from "../../configs/endpoints";
import { navRoutes } from "../../configs/routes";
import {
  closeActionCreator,
  setVisibilityActionCreator,
} from "../../store/slices/uiModal/uiModalSlice";
import {
  loadUserActionCreator,
  logOutActionCreator,
  toggleStatusActionCreator,
} from "../../store/slices/user/userSlice";
import { loadUserDataActionCreator } from "../../store/slices/userData/userDataSlice";
import {
  IUser,
  UserGetData,
  UserLogInData,
  UserSignUpData,
} from "../../types/user";
import getTokenData from "../../utils/auth/auth";
import {
  setUserBasicData,
  setUserExtraData,
} from "../../utils/setUserData/setUserData";
import { UserToken } from "../types/useUserTypes";

const apiUrl = process.env.REACT_APP_API_URL;

const useUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getUserData = useCallback(async (id: string): Promise<IUser | void> => {
    try {
      const {
        data: { user },
      }: AxiosResponse<UserGetData> = await axios.get(
        `${apiUrl}${endpoints.usersRoot}/${id}`
      );

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
          `${apiUrl}${endpoints.logIn}`,
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
        navigate(navRoutes.explore.path);
      } catch (error) {
        dispatch(
          closeActionCreator({
            message: "Log in error",
            type: "error",
          })
        );
      }
    },
    [dispatch, getUserData, navigate]
  );

  const signUp = useCallback(
    async ({ name, password, email }: UserSignUpData): Promise<boolean> => {
      dispatch(setVisibilityActionCreator(true));

      try {
        await axios.post(`${apiUrl}${endpoints.signUp}`, {
          name,
          password,
          email,
        });

        logIn({ name, password });

        return true;
      } catch (error) {
        dispatch(
          closeActionCreator({
            message: "Sign up error",
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

    navigate(navRoutes.logIn.path);
  };

  return { signUp, logIn, getUserData, logOut };
};

export default useUser;
