import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import setName, { getUserName } from "../assets/function/function";
import { primaryColor, Title, ButtonRegister, Container } from "../style/style";
import toast from "react-hot-toast";
import supabase from "../supabase/supabase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../redux/slices/userSlice";
const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    setName("Login");
  });
  const loginFun = async (email, password) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (data.user === null) throw error;
    else {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("session", JSON.stringify(data.session));
      const userName = await getUserName();
      dispatch(
        userActions.setUserLoggedIn({
          online: true,
          userName: userName,
        })
      );
    }
  };
  const handleLogIn = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!email || !password) toast.error("Fill All Inputs");
    else {
      toast
        .promise(loginFun(email, password), {
          loading: "Waitting...",
          success: <b>Login</b>,
          error: <b>Could not login.</b>,
        })
        .then(() => {
          emailRef.current.value = "";
          passwordRef.current.value = "";
          getUserName();
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <Container className="container py-5">
      <Title>log in</Title>
      <LogIn className="d-flex flex-column align-items-center justify-content-center row-gap-4">
        <div className="input-group">
          <input
            ref={emailRef}
            type="email"
            className="form-control"
            placeholder="Email"
          />
        </div>
        <form style={{ width: "100%" }}>
          <div className="input-group">
            <input
              ref={passwordRef}
              type="password"
              className="form-control"
              placeholder="Password"
              autoComplete="true"
            />
          </div>
        </form>
        <ButtonRegister onClick={handleLogIn}>log in</ButtonRegister>
      </LogIn>
    </Container>
  );
};
const LogIn = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 400px;
  height: 250px;
  margin: 20px auto;
  padding: 20px;
  background-color: ${primaryColor};
  border-radius: 5px;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
export default Login;
