import React from "react";
import styled from "styled-components";
import { primaryColor, smallTextColor } from "../style/style";
import { CiLocationOn } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { Link } from "react-router-dom";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Content>
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <Title>multimart</Title>
            <FooterPara>
              Thank you for shopping with us! At Multimart , customer
              satisfaction is our top priority. We strive to provide you with
              the best shopping experience possible, offering a wide selection
              of high-quality products, seamless checkout, and reliable
              shipping.
            </FooterPara>
          </div>
          <div className="col-lg-3 col-md-6">
            <Title>top categories</Title>
            <List>
              <ListItem>mobile phones</ListItem>
              <ListItem>modern sofa</ListItem>
              <ListItem>arm chair</ListItem>
              <ListItem>smart watches</ListItem>
            </List>
          </div>
          <div className="col-lg-2 col-md-6">
            <Title>useful links</Title>
            <List>
              <ListItem>
                <Link to="shop">shop</Link>
              </ListItem>
              <ListItem>
                <Link to="cart">cart</Link>
              </ListItem>
              <ListItem>
                <Link to="login">login</Link>
              </ListItem>
              <ListItem>
                <Link to="sginup">sginup</Link>
              </ListItem>
            </List>
          </div>
          <div className="col-lg-3 col-md-6">
            <Title>contact</Title>
            <List>
              <ListItem>
                <span>
                  <CiLocationOn />
                </span>{" "}
                syria - latakia - jablah
              </ListItem>
              <ListItem>
                <span>
                  <FaPhoneAlt />
                </span>
                +96388514601
              </ListItem>
              <ListItem className=" text-lowercase">
                <span>
                  <MdOutlineMail />
                </span>
                multimart@gmail.com
              </ListItem>
            </List>
          </div>
        </div>
        <Copy>copy right © {year} multimart. all rights reserved.</Copy>
      </div>
    </Content>
  );
};
const Content = styled.div`
  background-color: ${primaryColor};
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  text-transform: capitalize;
  margin-bottom: 10px;
  color: #fff;
  @media (max-width: 991px) {
    text-align: center;
  }
`;
const FooterPara = styled.p`
  color: ${smallTextColor};
  font-size: 0.8rem;
  @media (max-width: 991px) {
    text-align: center;
  }
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
  @media (max-width: 991px) {
    text-align: center;
  }
`;
const ListItem = styled.li`
  * {
    text-decoration: none;
    color: ${smallTextColor};
  }
  color: ${smallTextColor};
  cursor: pointer;
  margin-bottom: 10px;
  text-transform: capitalize;
  font-size: 0.8rem;

  transition: all 0.5s;
  &:hover {
    padding-left: 10px;
  }
  span {
    color: ${smallTextColor};
    font-size: 18px;
    margin-right: 10px;
  }
`;
const Copy = styled.div`
  margin-top: 25px;
  text-transform: capitalize;
  width: 100%;
  text-align: center;
  color: ${smallTextColor};
  font-size: 0.9rem;
`;
export default Footer;
