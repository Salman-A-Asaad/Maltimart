import React, { useState, useEffect } from "react";
import { Product } from "../components/index";
import { HeadTitle, Spinner } from "../components/index";
import { primaryColor, Container } from "../style/style";
import styled from "styled-components";
import setName from "../assets/function/function";
import { useSelector } from "react-redux";
const Shop = () => {
  const allProducts = useSelector((state) => state.products.allProducts);
  useEffect(() => {
    setName("Shop");
  }, []);
  const [product, setProduct] = useState(allProducts);
  useEffect(() => {
    setProduct(allProducts);
  }, [allProducts]);
  const handleChange = (e) => {
    const filter = e.target.value;
    if (filter !== "") {
      const filteredProducts = allProducts.filter((ele) => {
        return ele.category === filter;
      });
      setProduct(filteredProducts);
    } else setProduct(allProducts);
  };
  const handleSearch = (e) => {
    const filter = e.target.value;
    if (filter !== "") {
      const filteredProducts = allProducts.filter((ele) => {
        return ele.name.toLowerCase().includes(filter.toLowerCase());
      });
      setProduct(filteredProducts);
    } else setProduct(allProducts);
  };
  return (
    <>
      <HeadTitle title={"shop"} />
      <div className="container py-5">
        <div className="d-flex flex-column flex-md-row gap-5">
          <Select onChange={handleChange} name="category" id="category">
            <option value="">filter by category</option>
            <option value="sofa">sofa</option>
            <option value="mobile">mobile</option>
            <option value="chair">chair</option>
            <option value="watch">watch</option>
            <option value="wireless">wireless</option>
          </Select>
          <Search className="search">
            <Input onChange={handleSearch} type="text" placeholder="Search" />
          </Search>
        </div>
      </div>
      <div className=" my-3">
        <Container className="container">
          <div className="row row-gap-3">
            {allProducts.length === 0 ? (
              <div
                style={{ width: "100%" }}
                className="d-flex align-items-center justify-content-center"
              >
                <Spinner />
              </div>
            ) : product.length === 0 ? (
              <NoProducts>no products like that</NoProducts>
            ) : (
              <Product products={product} />
            )}
          </div>
        </Container>
      </div>
    </>
  );
};
const Select = styled.select`
  width: fit-content;
  background-color: ${primaryColor};
  color: #fff;
  padding: 10px;
  text-transform: capitalize;
  outline: none;
  border: none;
  border-radius: 5px;
`;
const Input = styled.input`
  padding: 10px;
  width: 320px;
  border: none;
  outline: none;
  border: 1px solid #ddd;
  border-radius: 5px;
  @media (max-width: 575px) {
    width: 100%;
  }
`;
const Search = styled.div`
  width: 100%;
  position: relative;
`;
const NoProducts = styled.div`
  width: 100%;
  font-size: 1rem;
  text-align: center;
  text-transform: capitalize;
  color: ${primaryColor};
  font-weight: bold;
  margin-top: 20px;
`;
export default Shop;
