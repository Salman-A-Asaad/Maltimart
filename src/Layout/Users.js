import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { primaryColor } from "../style/style";
import { MdDeleteForever } from "react-icons/md";
import image from "../assets/images/user-icon.png";
import setName from "../assets/function/function";
import toast from "react-hot-toast";
import supabase from "../supabase/supabase";
import { Spinner } from "../components";
const Users = () => {
  const [users, setUsers] = useState(null);
  const getAllUsers = async () => {
    try {
      let { data: users } = await supabase.from("users").select("*");
      setUsers(users);
    } catch (error) {
      console.log(error);
      toast.error("Failled");
    }
  };
  useEffect(() => {
    setName("Users");
    getAllUsers();
  }, []);
  const handleDelete = async (e) => {
    toast.promise(supabase.from("users").delete().eq("id", e.id), {
      loading: "Deleting user...",
      success: <b>User deleted!</b>,
      error: <b>Could not delete.</b>,
    });
  };
  return (
    <div>
      <Title className="my-4">users</Title>
      <Table>
        <Thead>
          <Tr>
            <Th>image</Th>
            <Th>name</Th>
            <Th>email</Th>
            <Th>delete</Th>
          </Tr>
        </Thead>
        <tbody>
          {users &&
            users.map((ele, index) => {
              return (
                <Tr key={index}>
                  <Td data-label="">
                    <div>
                      <Image src={image} />
                    </div>
                  </Td>
                  <Td data-label="Name">{ele.name}</Td>
                  <Td data-label="Email">{ele.email}</Td>
                  <Td data-label="">
                    <div>
                      {" "}
                      <Delete
                        onClick={() => {
                          handleDelete(ele);
                        }}
                      >
                        <MdDeleteForever />
                      </Delete>
                    </div>
                  </Td>
                </Tr>
              );
            })}
        </tbody>
      </Table>
      {users === null ? (
        <div
          style={{ width: "100%" }}
          className="d-flex align-items-center justify-content-center mt-4"
        >
          <Spinner />
        </div>
      ) : (
        ""
      )}
      {users && users.length === 0 ? <NoUsers>no users</NoUsers> : ""}
    </div>
  );
};
const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  color: ${primaryColor};
  text-transform: capitalize;
  font-weight: bold;
  margin-bottom: 20px;
`;
const Image = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
  @media screen and (max-width: 600px) {
    margin: auto;
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const Thead = styled.thead`
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
const Th = styled.th`
  padding: 8px;
  text-transform: capitalize;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;
const Tr = styled.tr`
  @media screen and (max-width: 600px) {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    display: block;
    margin-bottom: 10px;
    border: 1px solid #ddd;
  }
`;
const Td = styled.td`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  color: ${primaryColor};
  font-weight: bold;
  @media screen and (max-width: 600px) {
    div {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
    }
    display: block;
    text-align: left;

    ${(props) =>
      props["data-label"] === ""
        ? css`
            &::before {
              content: "";
              display: none;
            }
          `
        : css`
            &::before {
              content: attr(data-label);
              font-weight: 500;
              color: #aaa;
              display: inline-block;
              margin-right: 20px;
            }
          `}
  }
`;
const Delete = styled.span`
  cursor: pointer;
  color: ${primaryColor};
  font-size: 25px;
`;
const NoUsers = styled.div`
  width: 100%;
  text-align: center;
  color: ${primaryColor};
  text-transform: capitalize;
  font-weight: bold;
  font-size: 1.1rem;
`;
export default Users;
