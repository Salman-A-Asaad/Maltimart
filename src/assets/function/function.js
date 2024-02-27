import toast from "react-hot-toast";
import { primaryColor } from "../../style/style";
import supabase from "../../supabase/supabase";
function setName(namePage) {
  const title = document.title.split("|")[0];
  document.title = `${title} | ${namePage.toUpperCase()}`;
}
function checkNumber(number) {
  const phoneNumberRegex = /^09\d{8}$/;
  if (!phoneNumberRegex.test(number)) {
    toast.success("EX : 0988514601", {
      style: {
        border: `1px solid ${primaryColor}`,
        padding: "16px",
        color: primaryColor,
      },
      duration: 4000,
      icon: "👉",
    });
    toast.error("Invalid phone number");
    return false;
  }
  return true;
}
function checkAddress(address) {
  const streetAddressRegex = /^[a-zA-Z]+(?:-[a-zA-Z]+)+$/;
  if (!streetAddressRegex.test(address)) {
    toast.success("EX : latakia-jablah-aldaheah", {
      style: {
        border: `1px solid ${primaryColor}`,
        padding: "16px",
        color: primaryColor,
      },
      duration: 4000,
      icon: "👉",
    });
    toast.error("Invalid street address");
    return false;
  }
  return true;
}
function checkCity(city) {
  const cityRegex = /^[A-Z][a-zA-Z\s'-]*$/;
  if (!cityRegex.test(city)) {
    toast.success("EX : New York", {
      style: {
        border: `1px solid ${primaryColor}`,
        padding: "16px",
        color: primaryColor,
      },
      duration: 4000,
      icon: "👉",
    });
    toast.error("Invalid city name");
    return false;
  }
  return true;
}
function checkPassword(password) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    toast.success(
      `✔ At least one uppercase letter.\n
✔ At least one lowercase letter.\n
✔ At least one digit.\n
✔ Allowed special characters("@$!%*?&").\n
✔ Minimum length of 8 characters.`,
      {
        style: {
          border: `1px solid ${primaryColor}`,
          padding: "16px 0",
          color: primaryColor,
        },
        duration: 4000,
        icon: "",
      }
    );
    toast.error("Invalid Password");
    return false;
  }
  return true;
}
function checkCountry(Country) {
  const countryRegex = /^[A-Z][a-zA-Z\s'-]*$/;
  if (!countryRegex.test(Country)) {
    toast.success("EX : United States of America", {
      style: {
        border: `1px solid ${primaryColor}`,
        padding: "16px",
        color: primaryColor,
      },
      duration: 4000,
      icon: "👉",
    });
    toast.error("Invalid country name");
    return false;
  }
  return true;
}
const getUserName = async () => {
  const user = localStorage.getItem("user");
  const userName = localStorage.getItem("userName");
  if (user && !userName) {
    const obj = JSON.parse(user);
    let { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", obj.email);
    if (users != null && users.length !== 0) {
      localStorage.setItem("userName", users[0].name);
      return users[0].name;
    }

    if (error) {
      console.log(error);
      return "";
    }
  }
};
export default setName;
export {
  checkNumber,
  checkAddress,
  checkCity,
  checkCountry,
  checkPassword,
  getUserName,
};
