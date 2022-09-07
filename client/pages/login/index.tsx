import { NextPage } from "next";
import Title from "../../components/seo/Title";
import { useForm } from "react-hook-form";
import LoginDto from "../../types/dto/Login.dto";
import styles from "../../styles/Login.module.scss";
import {
  useGoBack,
  useLoading,
  useRedirect,
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks";
import { Button, FormInput, LoadingButton } from "../../components/ui";
import { LoginThunk } from "../../store/thunks/auth";
import { resetError } from "../../store/slices/authSlice";
import React from "react";

const LoginPage: NextPage = () => {
  const { register, reset, formState, handleSubmit } = useForm<LoginDto>({
    mode: "onChange",
  });
  const { errorMessage, isError, isAuth } = useTypedSelector(
    (state) => state.auth
  );
  const [loginLoading, switchLoginLoading] = useLoading();
  const dispatch = useTypedDispatch();

  useRedirect("/posts", isAuth);

  React.useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, []);

  const loginClick = async (dto: LoginDto) => {
    switchLoginLoading();
    await dispatch(LoginThunk(dto));
    switchLoginLoading();
  };

  const goBack = useGoBack();

  return (
    <>
      <Title>Login</Title>
      <div className={[styles.Login].join(" ")}>
        <h1>Please fill out the form</h1>
        <form onSubmit={handleSubmit(loginClick)}>
          <FormInput
            registerFunc={() =>
              register("emailOrName", {
                required: "Username or email is required field",
                maxLength: {
                  value: 25,
                  message: "Maximum length 25 characters",
                },
              })
            }
            text={"Username or email:"}
            placeholder={"Enter your name or email"}
            isError={!!formState.errors.emailOrName}
            errorMessage={formState.errors.emailOrName?.message}
          />
          <FormInput
            type={"password"}
            registerFunc={() =>
              register("password", {
                required: "Password is required field",
                minLength: {
                  value: 8,
                  message: "Minimum password length 8 characters",
                },
                maxLength: {
                  value: 25,
                  message: "Maximum password length 25 characters",
                },
              })
            }
            text={"Password:"}
            placeholder={"Enter your password"}
            isError={!!formState.errors.password}
            errorMessage={formState.errors.password?.message}
          />
          <p>{isError && errorMessage}</p>
          <div className={styles.buttons}>
            <Button type={"button"} onClick={goBack}>
              Back
            </Button>
            <Button onClick={() => reset()}>Reset</Button>
            <LoadingButton isLoading={loginLoading} type="submit">
              Login
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
