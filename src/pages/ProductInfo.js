import React, { useEffect } from "react";
import setName from "../assets/function/function";
import { HeadTitle } from "../components/index";
import { primaryColor, Button, smallTextColor, Title } from "../style/style";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Product } from "../components/index";
import { useSelector } from "react-redux";
const ProductInfo = () => {
  const allProducts = useSelector((state) => state.products.allProducts);
  const id = useParams().id;
  const dispatch = useDispatch();
  const product = allProducts.filter((ele) => ele.id === id)[0];
  const filterProducts = allProducts.filter(
    (ele) => ele.category === product.category && ele.id !== product.id
  );
  const addToCart = (e) => {
    dispatch(cartActions.addItem(e));
    toast.success("Product Add");
  };
  useEffect(() => {
    setName(product.name);
  });
  return (
    <>
      <HeadTitle title={product.name} />
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-6">
            <ImageInfo>
              <img src={product.img_url} alt="" />
            </ImageInfo>
          </div>
          <div className="col-lg-6">
            <Info className="d-flex flex-column row-gap-3">
              <h3>{product.name}</h3>
              <div className="d-flex flex-row column-gap-5">
                <PriceInfo>{product.price}$</PriceInfo>{" "}
                <Category>category : {product.category}</Category>
              </div>
              <p>{product.short_desc}</p>
              <Button
                onClick={() => {
                  addToCart(product);
                }}
              >
                add to cart
              </Button>
            </Info>
          </div>
        </div>
        <Title className="my-4">you might also like</Title>
        <div className="row">
          <Product products={filterProducts} />
        </div>
      </div>
    </>
  );
};
const ImageInfo = styled.div`
  width: 100%;
  img {
    width: 100%;
    object-fit: contain;
  }
`;
const Info = styled.div`
  margin-top: 20px;
  h3 {
    text-transform: capitalize;
    color: ${primaryColor};
  }
  p {
    color: ${smallTextColor};
  }
`;
const PriceInfo = styled.span`
  color: ${primaryColor};
  font-size: 18px;
  font-weight: bold;
`;
const Category = styled.span`
  color: ${smallTextColor};
  font-weight: bold;
  text-transform: capitalize;
`;

export default ProductInfo;
