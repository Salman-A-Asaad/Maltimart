import React, { useEffect } from "react";
import setName from "../assets/function/function";
import { HeadTitle } from "../components/index";
import { primaryColor, Button, smallTextColor } from "../style/style";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../supabase/supabase";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const ProductInfoAdmin = () => {
  const allProducts = useSelector((state) => state.products.allProducts);
  const navigate = useNavigate();
  const id = useParams().id;
  const product = allProducts.filter((ele) => ele.id === id)[0];

  useEffect(() => {
    setName(product.name);
  });
  const deleteProduct = async (ele) => {
    try {
      await toast.promise(supabase.from("products").delete().eq("id", ele.id), {
        loading: "Deleting...",
        success: <b>Products deleted!</b>,
        error: <b>Could not deleted.</b>,
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
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
              <DeleteButton
                onClick={() => {
                  deleteProduct(product);
                }}
              >
                delete
              </DeleteButton>
            </Info>
          </div>
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
const DeleteButton = styled(Button)`
  background-color: #ff1818d4;
  &:hover {
    color: #ff1818d4;
    background-color: #fff;
    font-weight: bold;
  }
`;
export default ProductInfoAdmin;
