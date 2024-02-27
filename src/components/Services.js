import React from "react";
import { FaTruck } from "react-icons/fa";
import { IoIosRefreshCircle } from "react-icons/io";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdCurrencyExchange } from "react-icons/md";
import serviceData from "../assets/data/serviceData";
import { motion } from "framer-motion";
import styled from "styled-components";
import { primaryColor, smallTextColor, H5 } from "../style/style";
const icons = [
  <FaTruck />,
  <IoIosRefreshCircle />,
  <RiSecurePaymentLine />,
  <MdCurrencyExchange />,
];
const Services = () => {
  return serviceData.map((ele, index) => {
    return (
      <motion.div
        whileHover={{ scale: 1.08 }}
        key={index}
        className="col-lg-3 col-md-4 col-sm-12"
      >
        <Serve style={{ backgroundColor: ele.bg }}>
          <ServicesIcon>{icons[index]}</ServicesIcon>
          <div className="content">
            <H5>{ele.title}</H5>
            <ServiceEx>{ele.subtitle}</ServiceEx>
          </div>
        </Serve>
      </motion.div>
    );
  });
};
const Serve = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 10px;
  @media (max-width: 991px) {
    margin-bottom: 15px;
  }
`;
const ServicesIcon = styled.span`
  background-color: ${primaryColor};
  color: white;
  width: 40px;
  height: 40px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px;
  border-radius: 50%;
  margin: 15px 15px 15px 10px;
`;

const ServiceEx = styled.p`
  color: ${smallTextColor};
  @media (max-width: 991px) {
    font-size: 0.8rem;
  }
`;
export default Services;
