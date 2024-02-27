import React, { useRef } from "react";
import logo from "../assets/images/eco-logo.png";
import person from "../assets/images/user-icon.png";
import styled from "styled-components";
import { FaCartShopping } from "react-icons/fa6";
import { primaryColor } from "../style/style";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../redux/slices/userSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const listRef = useRef();
  const totalQuantity = useSelector((state) => {
    return state.cart.totalQuantity;
  });
  const links = ["home", "shop", "cart"];
  const handleClick = () => {
    listRef.current.classList.toggle("show");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <div className="d-flex align-items-baseline gap-2">
            <Logo src={logo} alt="logo" />
            <span className="text-capitalize fw-bold">multimart</span>
          </div>
        </Link>
        <CartPersonDiv>
          <Link to="cart">
            <Icons>
              <FaCartShopping />
              <span>{totalQuantity}</span>
            </Icons>
          </Link>
          <Person onClick={handleClick} src={person} alt="person" />
          <List ref={listRef}>
            {!isLoggedIn ? (
              <>
                {" "}
                <span onClick={handleClick}>
                  <Link to="login">login</Link>
                </span>
                <span onClick={handleClick}>
                  <Link to="sginup">sgin up</Link>
                </span>
              </>
            ) : (
              <>
                <span>{userName}</span>
                {JSON.parse(localStorage.getItem("user")).email !==
                process.env.REACT_APP_SUPABASE_ADMIN ? (
                  ""
                ) : (
                  <span onClick={handleClick}>
                    <Link to="/dashboard">dashboard</Link>
                  </span>
                )}
                <span
                  onClick={() => {
                    localStorage.clear();
                    sessionStorage.clear();
                    listRef.current.classList.toggle("show");
                    dispatch(
                      userActions.setUserLoggedIn({
                        online: false,
                        userName: "",
                      })
                    );
                  }}
                >
                  <Link to="/">log out</Link>
                </span>
              </>
            )}
          </List>
        </CartPersonDiv>
        <NavIcon
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </NavIcon>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav gap-4">
            {links.map((ele, index) => {
              return (
                <ListItem
                  key={index}
                  className="nav-item mx-sm-auto mx-md-auto"
                >
                  <Link
                    className="nav-link text-uppercase"
                    aria-current="page"
                    to={ele === "home" ? "/" : ele}
                  >
                    {ele}
                  </Link>
                </ListItem>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};
const Logo = styled.img`
  width: 25px;
  height: 25px;
  display: inline-block;
  cursor: pointer;
`;
const Icons = styled.span`
  color: ${primaryColor};
  cursor: pointer;
  width: 30px;
  height: 30px;
  font-size: 25px;
  position: relative;
  span {
    position: absolute;
    background-color: #0a1d37c4;
    color: #fff;
    width: 22px;
    height: 22px;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    top: -7px;
    right: -15px;
  }
`;
const CartPersonDiv = styled.div`
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  @media (min-width: 992px) {
    width: 100% !important;
    justify-content: center;
    gap: 2rem;
  }
`;
const Person = styled.img`
  transform: translateY(5px);
  cursor: pointer;
  width: 30px;
  height: 30px;
  object-fit: contain;
`;
const NavIcon = styled.button`
  border: none;
  &:focus {
    box-shadow: none;
  }
`;
const ListItem = styled.li`
  border-bottom: 1px solid transparent;
  transition: all 0.5s;
  font-weight: 500;
  &:hover {
    color: ${primaryColor} !important;
    transform: scale(1.05);
    border-bottom-color: ${primaryColor};
  }
  @media (max-width: 991px) {
    width: 100%;
    text-align: start;
  }
`;
const List = styled.div`
  width: 120px;
  position: absolute;
  background: ${primaryColor};
  padding: 15px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  color: #fff;
  text-transform: capitalize;
  align-items: center;
  justify-content: center;
  gap: 20px;
  top: -900px;
  z-index: 999;
  transition: all 0.5s;
  span {
    * {
      text-decoration: none;
      color: #fff;
    }
    width: 100%;
    padding: 5px;
    text-align: center;
    cursor: pointer;
    border-bottom: 1px solid #fff;
  }
  &.show {
    top: 53px;
  }
`;
export default Navbar;
