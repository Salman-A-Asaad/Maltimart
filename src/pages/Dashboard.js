import React, { useEffect, useState } from "react";
import { ButtonDash, Container } from "../style/style";
import { AddProduct, AllProducts, Orders, Users } from "../Layout/index";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const layout = [<AddProduct />, <AllProducts />, <Orders />, <Users />];
  const layoutName = ["add product", "all product", "orders", "users"];
  const [layoutNumber, setLayoutNunber] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("user") === null) navigate("/");
    if (localStorage.getItem("user") !== null)
      if (
        JSON.parse(localStorage.getItem("user")).email !== "admin@multimart.com"
      )
        navigate("/");
  });
  return (
    <Container className="container py-5">
      <div className="row row-gap-3">
        {layoutName.map((ele, index) => {
          return (
            <div key={index} className="col-sm-6 col-md-6 col-lg-3">
              <div className="d-flex align-items-center justify-content-center">
                <ButtonDash onClick={() => setLayoutNunber(index)}>
                  {ele}
                </ButtonDash>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pt-4">{layout[layoutNumber]}</div>
    </Container>
  );
};

export default Dashboard;
