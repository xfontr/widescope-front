import { useCallback } from "react";
import { batch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setVisibilityActionCreator } from "../../store/slices/uiModal/uiModalSlice";
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
  const { getUserData, logOut } = useUser();
  const dispatch = useAppDispatch();
  const isValidated = useAppSelector((state) => state.userData.email);

  const verifyUser = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (isValidated || !token) {
      return;
    }

    dispatch(setVisibilityActionCreator(true));

    const decodedToken = getTokenData(token);

    try {
      const user = await getUserData(decodedToken.id);

      batch(() => {
        dispatch(loadUserActionCreator(setUserBasicData(user as IUser, token)));
        dispatch(loadUserDataActionCreator(setUserExtraData(user as IUser)));
        dispatch(toggleStatusActionCreator(true));
      });
    } catch (error) {
      logOut();
      localStorage.clear();
    }

    dispatch(setVisibilityActionCreator(false));
  }, [getUserData, dispatch, isValidated, logOut]);

  return verifyUser;
};

export default useToken;
