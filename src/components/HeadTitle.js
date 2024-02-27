import React from "react";
import bgImage from "../assets/images/bedroom.jpg";
import styled from "styled-components";
const HeadTitle = ({ title }) => {
  return (
    <Section>
      <div className="container text-center">
        <H1>{title}</H1>
      </div>
    </Section>
  );
};
const Section = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.562), rgba(0, 0, 0, 0.562)),
    url(${bgImage}) no-repeat center center;
  background-size: cover;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const H1 = styled.h1`
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
`;
export default HeadTitle;
