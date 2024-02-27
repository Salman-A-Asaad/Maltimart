import React from "react";
import { motion } from "framer-motion";
import { primaryColor, H5 } from "../style/style";
import styled from "styled-components";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";
const Product = ({ products }) => {
  const dispatch = useDispatch();
  const addToCart = (e) => {
    dispatch(cartActions.addItem(e));
    toast.success("Produt Add");
  };
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return products.map((ele, index) => {
    return (
      <div key={index} className="col-sm-12 col-md-4 col-lg-3">
        <Card>
          <motion.div
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 0.8 }}
          >
            <Image src={ele.img_url} alt={ele.name} />
          </motion.div>
          <motion.div whileHover={{ marginLeft: "10px" }}>
            <H5 onClick={handleClick} style={{ marginBottom: 0 }}>
              <Link to={`/shop/${ele.id}`}>{ele.name}</Link>
            </H5>
          </motion.div>
          <Type>{ele.category}</Type>
          <div className="d-flex align-content-center justify-content-between">
            <Price>{ele.price}$</Price>
            <motion.div
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.1 }}
            >
              <Add onClick={() => addToCart(ele)}>
                <FaCartPlus />
              </Add>
            </motion.div>
          </div>
        </Card>
      </div>
    );
  });
};
const Card = styled.div`
  padding: 10px;
  cursor: pointer;
  min-height: 378px;
`;
const Image = styled.img`
  width: 100%;
  object-fit: contain;
  height: 241px;
`;
const Type = styled.span`
  display: block;
  color: #9f9f9f;
`;
const Price = styled.span`
  color: ${primaryColor};
  font-weight: bold;
  font-size: 1.2rem;
`;
const Add = styled.span`
  background-color: ${primaryColor};
  cursor: pointer;
  color: #fff;
  width: 40px;
  height: 40px;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 50%;
`;
export default Product;
