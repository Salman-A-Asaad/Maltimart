import React, { useEffect, useState } from "react";
import { Order, Spinner } from "../components/index";
import { Title, primaryColor } from "../style/style";
import setName from "../assets/function/function";
import supabase from "../supabase/supabase";
import toast from "react-hot-toast";
import styled from "styled-components";
const Orders = () => {
  const [allOrders, setAllOrders] = useState(null);
  const getAllOrders = async () => {
    try {
      let { data: orders } = await supabase.from("orders").select("*");
      setAllOrders(orders);
    } catch (error) {
      toast.error("Failled");
      console.log(error);
    }
  };
  useEffect(() => {
    setName("Orders");
    getAllOrders();
  }, []);
  return (
    <div>
      {" "}
      <Title className="my-4">orders</Title>
      <div className="row row-gap-3">
        {allOrders !== null ? (
          allOrders.map((ele, index) => {
            return (
              <div key={index} className="col-md-6 col-lg-4">
                <Order order={ele} />
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
      {allOrders && allOrders.length === 0 ? (
        <NoOrders>no orders</NoOrders>
      ) : (
        ""
      )}
    </div>
  );
};
const NoOrders = styled.div`
  width: 100%;
  text-align: center;
  color: ${primaryColor};
  text-transform: capitalize;
  font-weight: bold;
  font-size: 1.1rem;
`;

export default Orders;
