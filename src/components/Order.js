import React from "react";
import styled from "styled-components";
import { primaryColor } from "../style/style";
import toast from "react-hot-toast";
import supabase from "../supabase/supabase";
const Order = ({ order }) => {
  let keys = [];
  let values = [];
  Object.entries(order).forEach(([key, value]) => {
    if (key === "check" || key === "id") return;
    keys.push(key);
    if (key === "created_at") {
      const time = `${value.split("T")[0]} / ${
        value.split("T")[1].split(".")[0]
      }`;
      values.push(time);
    } else values.push(value);
  });
  const handleCheck = async () => {
    try {
      toast.promise(
        supabase
          .from("orders")
          .update({ check: true })
          .eq("id", order.id)
          .select(),
        {
          loading: "Checking...",
          success: <b>Order checked!</b>,
          error: <b>Could not check.</b>,
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("Failled");
    }
  };
  return (
    <User className="d-flex flex-column gap-4">
      {keys.map((ele, index) => {
        return (
          <div key={index}>
            <span style={{ color: "#aaa" }} className=" text-capitalize">
              {ele} :{" "}
            </span>
            <span
              style={{ color: { primaryColor } }}
              className={` ${ele === "email" ? "" : "text-capitalize"} fw-bold`}
            >
              {values[index]}
            </span>
          </div>
        );
      })}
      {order.check === true ? (
        <Done>✔done</Done>
      ) : (
        <Check onClick={handleCheck}>check</Check>
      )}
    </User>
  );
};
const User = styled.div`
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  padding: 10px;
  min-height: 402px;
`;
const Done = styled.span`
  color: green;
  font-weight: bold;
  text-transform: capitalize;
  text-align: center;
`;
const Check = styled.span`
  font-weight: bold;
  margin: auto;
  text-transform: capitalize;
  width: fit-content;
  padding: 10px 20px;
  border: 1px solid #607d8b;
  transition: all 0.5s;
  font-weight: 500;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #607d8b;
    color: white;
    border-color: white;
  }
`;
export default Order;
