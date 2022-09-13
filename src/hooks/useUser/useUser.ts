import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
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
import {
  addFriendActionCreator,
  loadFriendsActionCreator,
  loadUserDataActionCreator,
} from "../../store/slices/userData/userDataSlice";
import {
  IUser,
  UserGetAllUsers,
  UserGetData,
  UserGetFriends,
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
  const { token, id } = useAppSelector(({ user }) => user.user);

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

  const addFriend = useCallback(
    async (friendName: string) => {
      dispatch(setVisibilityActionCreator(true));

      try {
        const {
          data: { users },
        } = await axios.get<UserGetAllUsers>(
          `${apiUrl}${endpoints.getAllUsers}?username=${friendName}`
        );

        if (users[0].id === id) {
          throw new Error();
        }

        await axios.patch(`${apiUrl}${endpoints.addFriend}${users[0].id}`, "", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(addFriendActionCreator({ id: users[0].id, name: friendName }));

        dispatch(
          closeActionCreator({
            message: "Friend added",
            type: "success",
          })
        );
      } catch (error) {
        dispatch(
          closeActionCreator({
            message: "Couldn't add friend",
            type: "error",
          })
        );
      }
    },
    [dispatch, token, id]
  );

  const loadFriends = useCallback(async () => {
    dispatch(setVisibilityActionCreator(true));

    try {
      const {
        data: { userFriends },
      }: AxiosResponse<UserGetFriends> = await axios.get(
        `${apiUrl}${endpoints.usersRoot}/${id}?friends=all`
      );

      dispatch(loadFriendsActionCreator(userFriends));

      dispatch(
        closeActionCreator({
          message: "",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        closeActionCreator({
          message: "Couldn't load any friend",
          type: "error",
        })
      );
    }
  }, [id, dispatch]);

  return { signUp, logIn, getUserData, logOut, addFriend, loadFriends };
};

export default useUser;
