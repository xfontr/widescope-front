import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  closeActionCreator,
  setVisibilityActionCreator,
} from "../../store/slices/uiModal/uiModalSlice";
import {
  loadUserActionCreator,
  toggleStatusActionCreator,
} from "../../store/slices/user/userSlice";
import { loadUserDataActionCreator } from "../../store/slices/userData/userDataSlice";
import { IUser } from "../../types/user";
import getTokenData from "../../utils/auth/auth";
import {
  setUserBasicData,
  setUserExtraData,
} from "../../utils/setUserData/setUserData";
import useUser from "../useUser/useUser";

const useToken = () => {
  const { getUserData } = useUser();
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector((state) => state.user.isLogged);

  const getToken = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (isLogged || !token) {
      return;
    }

    dispatch(setVisibilityActionCreator(true));

    const decodedToken = getTokenData(token);

    try {
      const user = await getUserData(decodedToken.id);

      dispatch(loadUserActionCreator(setUserBasicData(user as IUser, token)));
      dispatch(loadUserDataActionCreator(setUserExtraData(user as IUser)));
      dispatch(toggleStatusActionCreator(true));

      dispatch(setVisibilityActionCreator(false));
    } catch (error) {
      localStorage.clear();
      dispatch(
        closeActionCreator({
          message: `Log in error: ${error}`,
          type: "error",
        })
      );
    }
  }, [getUserData, dispatch, isLogged]);

  return getToken;
};

export default useToken;
