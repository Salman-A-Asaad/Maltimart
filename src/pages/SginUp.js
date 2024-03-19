import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import setName from "../assets/function/function";
import { primaryColor, ButtonRegister, Title, Container } from "../style/style";
import { checkPassword } from "../assets/function/function";
import toast from "react-hot-toast";
import supabase from "../supabase/supabase";
import { useNavigate } from "react-router-dom";
const Sginup = () => {
  const navigate = useNavigate();
  const passwordRef = useRef();
  const emailRef = useRef();
  const userNameRef = useRef();
  useEffect(() => {
    setName("Sgin Up");
  });
  const sginupFun = async (email, password) => {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (data.user === null) throw error;
  };
  const addUser = async (name, email) => {
    let { data, error } = await supabase
      .from("users")
      .insert({ name: name, email: email });
    if (data !== null) throw error;
  };
  const handleSginUp = () => {
    const userName = userNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!userName || !email || !password) toast.error("Fill All Inputs");
    else {
      if (checkPassword(password)) {
        try {
          toast
            .promise(sginupFun(email, password), {
              loading: "Waitting...",
              success: <b>Sgin up , go to email to vervication.</b>,
              error: <b>Could not Sgin up.</b>,
            })
            .then(() => {
              toast.promise(addUser(userName, email), {
                loading: "Adding user...",
                success: <b>User Added!</b>,
                error: <b>Could not add user.</b>,
              });
              userNameRef.current.value = "";
              emailRef.current.value = "";
              passwordRef.current.value = "";
              navigate("/");
            })
            .catch((error) => {
              toast(error.message + `, try later.`, {
                icon: "⚠",
              });
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return (
    <Container className="container pb-2">
      <Title>sgin up</Title>
      <SginUp className="d-flex flex-column align-items-center justify-content-center row-gap-4">
        <div className="input-group">
          <input
            ref={userNameRef}
            type="text"
            className="form-control"
            placeholder="Username"
          />
        </div>
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
        <div className="input-group ">
          <input type="file" className="form-control" id="inputGroupFile02" />
        </div>
        <ButtonRegister onClick={handleSginUp}>sgin up</ButtonRegister>
      </SginUp>
    </Container>
  );
};

const SginUp = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 450px;
  margin: 20px auto;
  padding: 25px;
  background-color: ${primaryColor};
  border-radius: 5px;
  @media (max-width: 767px) {
    width: 100%;
    padding: 12px;
  }
`;
export default Sginup;
