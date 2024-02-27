import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import setName from "../assets/function/function";
import { primaryColor, Button } from "../style/style";
import { HeadTitle } from "../components/index";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import supabase from "../supabase/supabase";
import {
  checkNumber,
  checkAddress,
  checkCity,
  checkCountry,
} from "../assets/function/function";
import { useNavigate } from "react-router-dom";
const CheckOut = () => {
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  useEffect(() => {
    setName("Check Out");
  });
  const handleOrder = () => {
    if (isOrderProcessing) {
      return;
    }
    setIsOrderProcessing(true);
    try {
      const userName = nameRef.current.value;
      const email = emailRef.current.value;
      const phone = phoneRef.current.value;
      const street = streetRef.current.value;
      const city = cityRef.current.value;
      const country = countryRef.current.value;
      if (!userName || !email || !phone || !street || !city || !country) {
        toast.error("Fill All Inputs");
        setIsOrderProcessing(false);
      } else {
        if (
          !checkNumber(phone) ||
          !checkAddress(street) ||
          !checkCity(city) ||
          !checkCountry(country)
        ) {
          setIsOrderProcessing(false);
          return;
        }
        const order = {
          name: userName.toLowerCase(),
          email: email.toLowerCase(),
          phone: phone.toString(),
          street: street.toLowerCase(),
          city: city.toLowerCase(),
          country: country.toLowerCase(),
        };
        toast.promise(supabase.from("orders").insert(order), {
          loading: "Adding order...",
          success: <b>Order Added!</b>,
          error: <b>Could not add order.</b>,
        });

        nameRef.current.value = "";
        emailRef.current.value = "";
        phoneRef.current.value = "";
        streetRef.current.value = "";
        cityRef.current.value = "";
        countryRef.current.value = "";
        navigate("/");
      }
    } catch (error) {
      console.error("Error adding order:", error);
      toast.error("An error occurred while adding the order.");
    } finally {
      setIsOrderProcessing(false);
    }
  };
  return (
    <>
      <HeadTitle title="check out" />
      <div className="container py-5">
        <div className="row row-gap-4">
          <div className="col-lg-8">
            <div className=" d-flex flex-column gap-4">
              <div className="input-group">
                <Input
                  ref={nameRef}
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="input-group">
                <Input
                  ref={emailRef}
                  type="email"
                  className="form-control"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="input-group">
                <Input
                  ref={phoneRef}
                  type="tel"
                  className="form-control"
                  placeholder="Phone Number"
                />
              </div>
              <div className="input-group">
                <Input
                  ref={streetRef}
                  type="text"
                  className="form-control"
                  placeholder="Street Address"
                />
              </div>
              <div className="input-group">
                <Input
                  ref={cityRef}
                  type="text"
                  className="form-control"
                  placeholder="City"
                />
              </div>

              <div className="input-group">
                <Input
                  ref={countryRef}
                  type="text"
                  className="form-control"
                  placeholder="Country"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <Info>
              <div>
                <span>total qty</span>
                <span>{totalQuantity}</span>
              </div>
              <div>
                <span>subtotal</span>
                <span>{totalAmount}$</span>
              </div>
              <div>
                <span>shapping</span>
                <span>0</span>
              </div>
              <div>free shipping</div>
              <Total>
                <span>total</span>
                <span>{totalAmount}$</span>
              </Total>
              <Button style={{ width: "100%" }} onClick={() => handleOrder()}>
                place order now
              </Button>
            </Info>
          </div>
        </div>
      </div>
    </>
  );
};

const Input = styled.input`
  &:focus {
    border-color: ${primaryColor};
    box-shadow: 0 0 0 0.25rem #0a1d3799;
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${primaryColor};
  color: #fff;
  padding: 15px;
  border-radius: 5px;
  div {
    display: flex;
    justify-content: space-between;
    text-transform: capitalize;
    font-weight: 500;
  }
`;
const Total = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 15px;
  font-size: 1.2rem;
  font-weight: bold !important;
`;
export default CheckOut;
