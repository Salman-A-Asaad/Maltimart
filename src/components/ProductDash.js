import React from "react";
import styled from "styled-components";
import { primaryColor } from "../style/style";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase/supabase";
import toast from "react-hot-toast";
const ProductDash = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/productinfoadmin/${product.id}`);
  };
  const handleDelete = async (ele) => {
    try {
      toast.promise(supabase.from("products").delete().eq("id", ele.id), {
        loading: "Deleting...",
        success: <b>Products deleted!</b>,
        error: <b>Could not deleted.</b>,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };
  return (
    <Product className="d-flex column-gap-3">
      <Image src={product.img_url} />
      <div className="d-flex flex-column row-gap-2">
        <Info>
          <span className=" text-capitalize" style={{ color: "#aaa" }}>
            name :{" "}
          </span>
          <span
            onClick={handleClick}
            className="text-capitalize fw-bold"
            style={{ color: { primaryColor } }}
          >
            {product.name}
          </span>
        </Info>
        <Info>
          <span className=" text-capitalize" style={{ color: "#aaa" }}>
            category :{" "}
          </span>
          <span
            className="text-capitalize fw-bold"
            style={{ color: { primaryColor } }}
          >
            {product.category}
          </span>
        </Info>
        <Info>
          <span className=" text-capitalize" style={{ color: "#aaa" }}>
            price :{" "}
          </span>
          <span
            className="text-capitalize fw-bold"
            style={{ color: { primaryColor } }}
          >
            {product.price}$
          </span>
        </Info>
      </div>
      <Delete
        onClick={() => {
          handleDelete(product);
        }}
      >
        <MdDeleteForever />
      </Delete>
    </Product>
  );
};
const Image = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
  @media (max-width: 424px) {
    width: 60px;
    height: 60px;
  }
`;
const Delete = styled.span`
  cursor: pointer;
  color: ${primaryColor};
  font-size: 25px;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const Info = styled.div`
  @media (max-width: 424px) {
    font-size: 10px;
  }
`;
const Product = styled.div`
  width: 100%;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.05);
  }
`;
export default ProductDash;
