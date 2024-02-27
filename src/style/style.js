import styled from "styled-components";
const cardBg01 = "#fdefe6";
const cardBg02 = "#d6e5fb";
const cardBg03 = "#ceebe9";
const cardBg04 = "#e2f2b2";
const primaryColor = "#0a1d37";
const heroBg = "#d6e5fb";
const smallTextColor = "#999";
const headingTextColor = "#0a1d37";
const Button = styled.button`
  * {
    text-decoration: none;
    color: #fff;
  }
  border: none;
  width: fit-content;
  padding: 10px 15px;
  text-transform: capitalize;
  font-weight: 500;
  background-color: ${primaryColor};
  color: #fff;
  border-radius: 5px;
  transition: all 0.5s;
  &:hover {
    background-color: #fff;
    color: ${primaryColor};
    transform: scale(1.03);
    * {
      color: ${primaryColor};
      transform: scale(1.03);
    }
  }
`;
const ButtonDash = styled(Button)`
  width: 122px;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const ButtonRegister = styled.button`
  border: none;
  width: fit-content;
  padding: 10px 15px;
  text-transform: capitalize;
  font-weight: 500;
  background-color: #fff;
  color: ${primaryColor};
  border-radius: 5px;
  transition: all 0.5s;
  &:hover {
    background-color: ${primaryColor};
    color: #fff;
    transform: scale(1.03);
  }
  width: 100%;
`;
const H5 = styled.h5`
  * {
    color: ${primaryColor};
    text-decoration: none;
  }
  cursor: pointer;
  font-size: 17px;
  color: ${primaryColor};
  margin-top: 10px;
  text-transform: capitalize;
  @media (max-width: 991px) {
    font-size: 1rem;
  }
`;
const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  color: ${primaryColor};
  text-transform: capitalize;
  font-weight: bold;
`;
const Container = styled.div`
  min-height: calc(100vh - 315px);
`;
const Input = styled.input`
  &:focus {
    border-color: ${primaryColor};
    box-shadow: 0 0 0 0.25rem #0a1d3799;
  }
`;
export {
  cardBg01,
  cardBg02,
  cardBg03,
  cardBg04,
  primaryColor,
  heroBg,
  smallTextColor,
  headingTextColor,
  Button,
  ButtonRegister,
  H5,
  Title,
  Container,
  ButtonDash,
  Input,
};
