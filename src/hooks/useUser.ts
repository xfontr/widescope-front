import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useAppDispatch } from "../app/hooks";
import { SignInActionCreator } from "../store/slices/userSlice";
import { IUser, UserSignUpData } from "../types/user";
import SignUpResponse from "./useUserTypes";

const apiUrl = process.env.REACT_APP_API_URL;

const useUser = () => {
  const dispatch = useAppDispatch();
  const signUp = useCallback(
    async ({ name, password, email }: UserSignUpData) => {
      const {
        data: { newUser },
      }: AxiosResponse<SignUpResponse> = await axios.post(
        `${apiUrl}/users/sign-up`,
        {
          name,
          password,
          email,
        }
      );

      dispatch(SignInActionCreator(newUser));
    },
    [dispatch]
  );

  return { signUp };
};

export default useUser;
