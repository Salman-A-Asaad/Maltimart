import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { primaryColor, Title } from "../style/style";
import setName from "../assets/function/function";
import { ProductDash, Spinner } from "../components/index";
import supabase from "../supabase/supabase";
const AllProducts = () => {
  const [allProducts, setAllProducts] = useState(null);
  const getAllProduct = async () => {
    let { data: products } = await supabase.from("products").select("*");
    setAllProducts(products);
    return products;
  };
  useEffect(() => {
    setName("All Produt");
    getAllProduct();
  }, []);
  return (
    <div>
      <Title className="my-4">all product</Title>
      <div className="row row-gap-3">
        {allProducts !== null ? (
          allProducts.map((product, index) => {
            return (
              <div key={index} className="col-md-6 col-lg-4">
                <ProductDash product={product} />
              </div>
            );
          })
        ) : (
          <div
            style={{ width: "100%" }}
            className="d-flex align-items-center justify-content-center"
          >
            <Spinner />
          </div>
        )}
      </div>
      {allProducts && allProducts.length === 0 ? (
        <NoProducts>no products</NoProducts>
      ) : (
        ""
      )}
    </div>
  );
};

const NoProducts = styled.div`
  width: 100%;
  text-align: center;
  color: ${primaryColor};
  text-transform: capitalize;
  font-weight: bold;
  font-size: 1.1rem;
`;

export default AllProducts;
