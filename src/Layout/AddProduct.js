import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { primaryColor, Button, Title, Input } from "../style/style";
import toast from "react-hot-toast";
import setName from "../assets/function/function";
import supabase from "../supabase/supabase";
const AddProduct = () => {
  const [file, setFile] = useState("");
  const uploadImage = async (name) => {
    await supabase.storage.from("products").upload(name, file);
  };
  const insertRow = async (product) => {
    await supabase.from("products").insert(product).select();
  };
  useEffect(() => {
    setName("Add Produt");
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const titleRef = useRef();
  const desRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const photeRef = useRef();
  const handleImageChange = (event) => {
    setFile(event.target.files[0]);
    setSelectedImage(event.target.files[0]);
  };
  const handleAddProduct = async () => {
    const title = titleRef.current.value;
    const description = desRef.current.value;
    const price = priceRef.current.value;
    const photo = photeRef.current.value;
    const category = categoryRef.current.value;
    if (!title || !description || !price || !photo || !category || !file)
      toast.error("Fill All Inputs");
    else {
      const nameImage = `${category}_${new Date().getTime()}.png`;
      try {
        await toast.promise(uploadImage(nameImage), {
          loading: "Uploading image...",
          success: <b>Image uploaded!</b>,
          error: <b>Could not upload.</b>,
        });
        const product = {
          name: title.toLowerCase(),
          img_url: `https://wiroeigxbuvjvztxtxsw.supabase.co/storage/v1/object/public/products/${nameImage}`,
          img_name: nameImage,
          category: category.toLowerCase(),
          price: Number(price),
          short_desc: description.toLowerCase(),
        };
        toast.promise(insertRow(product), {
          loading: "Saving product...",
          success: <b>Product Added!</b>,
          error: <b>Could not add.</b>,
        });
        titleRef.current.value = "";
        desRef.current.value = "";
        priceRef.current.value = "";
        photeRef.current.value = "";
        categoryRef.current.value = "";
        setSelectedImage("");
      } catch (error) {
        toast.error("Faild");
        console.log(error);
      }
    }
  };
  return (
    <div>
      <Title className="my-4">add product</Title>
      <div className=" d-flex flex-column gap-4 mb-4">
        <div className="input-group">
          <Input
            ref={titleRef}
            type="text"
            className="form-control"
            placeholder="Product Title"
          />
        </div>
        <div className="input-group">
          <Input
            ref={desRef}
            type="text"
            className="form-control"
            placeholder="Short Description"
          />
        </div>
        <div className="row row-gap-4">
          <div className="col-lg-6">
            {" "}
            <div className="input-group">
              <Input
                ref={priceRef}
                type="number"
                className="form-control"
                placeholder="price"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <Select ref={categoryRef} name="category" id="category">
              <option value="">set category</option>
              <option value="sofa">sofa</option>
              <option value="mobile">mobile</option>
              <option value="chair">chair</option>
              <option value="watch">watch</option>
              <option value="wireless">wireless</option>
            </Select>
          </div>
        </div>
        <div className="input-group ">
          <Input
            accept="image/*"
            onChange={handleImageChange}
            ref={photeRef}
            type="file"
            className="form-control"
            id="inputGroupFile02"
          />
        </div>
      </div>
      {selectedImage && (
        <div className="my-4">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            width="300"
          />
        </div>
      )}
      <Button onClick={handleAddProduct}>add product</Button>
    </div>
  );
};

const Select = styled.select`
  width: 100%;
  background-color: ${primaryColor};
  color: #fff;
  padding: 10px;
  text-transform: capitalize;
  outline: none;
  border: none;
  border-radius: 5px;
`;
export default AddProduct;
