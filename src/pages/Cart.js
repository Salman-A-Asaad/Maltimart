import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import setName from "../assets/function/function";
import { primaryColor, smallTextColor, Button } from "../style/style";
import styled from "styled-components";
import { cartActions } from "../redux/slices/cartSlice";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const Cart = () => {
  const heads = ["image", "title", "price", "qty", "delete"];
  const productCart = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  useEffect(() => {
    setName("Cart");
  });
  const deleteFromCart = (e) => {
    dispatch(cartActions.deleteItem(e));
    toast.success("Deleted");
  };
  return (
    <Container className="container py-5">
      <div className="row ">
        <div className="col-lg-8">
          <table className="table table-hover">
            <thead>
              <tr>
                {heads.map((ele, index) => {
                  return (
                    <TableHead
                      key={index}
                      className={`text-uppercase ${
                        ele === "image" ? "" : "text-center"
                      }`}
                    >
                      {ele}
                    </TableHead>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {productCart.map((ele, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Image src={ele.image} />
                    </td>
                    <TableData>{ele.productName}</TableData>
                    <TableData>{ele.price}$</TableData>
                    <TableData>{ele.quantity}</TableData>
                    <TableData>
                      <Delete onClick={() => deleteFromCart(ele.id)}>
                        <MdDeleteForever />
                      </Delete>
                    </TableData>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {productCart.length === 0 ? <NoProducts>no products</NoProducts> : ""}
        </div>
        <div className="col-lg-4 mt-4 ">
          <div className="d-flex flex-column row-gap-3">
            {" "}
            <div className="d-flex align-items-center justify-content-between">
              <span className=" text-capitalize fw-bold text-body-secondary">
                subtotal
              </span>
              <Price>{totalAmount}$</Price>{" "}
            </div>
            <p
              className="text-capitalize fw-bold"
              style={{ color: smallTextColor }}
            >
              taxes and shipping will calculate in checkout
            </p>
            {localStorage.getItem("user") === null ? (
              <p
                className="text-capitalize fw-bold"
                style={{ color: smallTextColor }}
              >
                log in to checkout
              </p>
            ) : productCart.length > 0 ? (
              <Button style={{ width: "100%" }}>
                <Link to="/checkout">checkout</Link>
              </Button>
            ) : (
              ""
            )}
            <Button style={{ width: "100%" }}>
              <Link to="/shop">continue shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  min-height: calc(100vh - 315px);
`;
const Image = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
`;
const Delete = styled.span`
  cursor: pointer;
  color: ${primaryColor};
  font-size: 25px;
`;
const TableHead = styled.th`
  @media (max-width: 767px) {
    font-size: 13px;
  }
`;
const TableData = styled.td`
  text-align: center;
  vertical-align: middle;
  color: ${primaryColor};
  font-weight: 500;
  padding: 0;

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;
const Price = styled.span`
  color: ${primaryColor};
  font-weight: bold;
  font-size: 18px;
`;
const NoProducts = styled.div`
  width: 100%;
  text-align: center;
  color: ${primaryColor};
  text-transform: capitalize;
  font-weight: bold;
  font-size: 1.1rem;
`;
export default Cart;
