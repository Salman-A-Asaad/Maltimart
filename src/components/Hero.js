import React from "react";
import image from "../assets/images/hero-img.png";
import styled from "styled-components";
import { heroBg, primaryColor, smallTextColor, Button } from "../style/style";
import { Link } from "react-router-dom";
const Hero = () => {
  const year = new Date().getFullYear();
  return (
    <Head>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6 d-flex flex-column align-content-center py-5">
            <TrendSpan>trending product in {year}</TrendSpan>
            <H1>make your interior more minimalistic & modern</H1>
            <Phero>
              Welcome to our online marketplace, where convenience meets
              variety. Dive into a world of endless possibilities as you explore
              our curated selection of products tailored to your needs. Whether
              you're searching for the latest fashion trends, cutting-edge
              gadgets, or everyday essentials, we've got you covered.
            </Phero>
            <Button style={{ marginTop: "15px" }}>
              <Link to="shop">shop now</Link>
            </Button>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div>
              <HeroImg src={image} alt="hero-image" />
            </div>
          </div>
        </div>
      </div>
    </Head>
  );
};
const Head = styled.div`
  background-color: ${heroBg};
`;
const TrendSpan = styled.span`
  text-transform: capitalize;
  font-weight: bold;
  color: ${primaryColor};
  font-size: 0.8rem;
`;
const H1 = styled.h1`
  margin-top: 15px;
  color: ${primaryColor};
  text-transform: capitalize;
`;
const Phero = styled.p`
  margin-top: 10px;
  font-size: 0.9rem;
  color: ${smallTextColor};
`;
const HeroImg = styled.img`
  object-fit: contain;
  width: 100%;
`;

export default Hero;
