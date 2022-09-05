import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import routes from "../../configs/routes";
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
import getTokenData from "../../utils/auth";
import { setUserBasicData, setUserExtraData } from "../../utils/setUserData";
import useUser from "../useUser/useUser";

const useToken = () => {
  const { getUserData } = useUser();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLogged = useAppSelector((state) => state.user.isLogged);

  const getToken = useCallback(async () => {
    if (isLogged) {
      return;
    }
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setVisibilityActionCreator(true));
      const decodedToken = getTokenData(token);

      try {
        const user = await getUserData(decodedToken.id);

        dispatch(loadUserActionCreator(setUserBasicData(user as IUser, token)));
        dispatch(loadUserDataActionCreator(setUserExtraData(user as IUser)));
        dispatch(toggleStatusActionCreator(true));
        dispatch(
          closeActionCreator({
            message: "Log in successful",
            type: "success",
          })
        );

        navigate(routes.home);
      } catch (error) {
        localStorage.clear();
        dispatch(
          closeActionCreator({
            message: `Log in error: ${error}`,
            type: "error",
          })
        );
        navigate(routes.logIn);
      }
    }
  }, [getUserData, dispatch, navigate, isLogged]);

  return getToken;
};

export default useToken;
