import React, { useEffect } from "react";
import { Title, Container } from "../style/style";
import { Services, Product, Hero, Spinner } from "../components/index";
import setName from "../assets/function/function";
import { useSelector } from "react-redux";
const Home = () => {
  const allProducts = useSelector((state) => state.products.allProducts);
  useEffect(() => {
    setName("Home");
  });
  const trendinProducts = allProducts.filter((ele) => {
    return ele.category === "chair";
  });
  const bestSales =
    allProducts &&
    allProducts.filter((ele) => {
      return ele.category === "sofa";
    });
  const newArrivals = allProducts.filter((ele) => {
    return ele.category === "mobile";
  });
  const popularCategory = allProducts.filter((ele) => {
    return ele.category === "watch";
  });
  return (
    <>
      <Hero />
      <div className="container mt-5">
        <div className="row">
          <Services />
        </div>
      </div>
      <Container className="container my-5">
        {allProducts.length === 0 ? (
          <div
            style={{ width: "100%" }}
            className="d-flex align-items-center justify-content-center"
          >
            <Spinner />
          </div>
        ) : (
          <>
            {" "}
            <Title>trending products</Title>
            <div className="row">
              <Product products={trendinProducts} />
            </div>
            <Title className="mt-5">best sales</Title>
            <div className="row">
              <Product products={bestSales} />
            </div>
            <Title className="mt-5">new arrivals</Title>
            <div className="row">
              <Product products={newArrivals} />
            </div>
            <Title className="mt-5">popular in category</Title>
            <div className="row">
              <Product products={popularCategory} />
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
