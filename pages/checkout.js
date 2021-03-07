/* eslint-disable react-hooks/exhaustive-deps */
import {
  Container,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Top from "../components/layout/Top";
import Customer from "../components/checkout/Customer";
import Shipping from "../components/checkout/Shipping";
import Payment from "../components/checkout/Payment";
// eslint-disable-next-line no-unused-vars
import Billing from "../components/checkout/Billing";
import { useRouter } from "next/router";

export const useStyles = makeStyles((theme) => ({
  avatar: {
    "&.MuiAvatar-colorDefault": {
      backgroundColor: theme.palette.secondary.dark,
    },

    width: theme.spacing(3),
    height: theme.spacing(3),

    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(2),
      height: theme.spacing(2),
    },
    margin: "1% 0",
    fontSize: "1rem",
  },
  stepHeader: {
    marginLeft: "5%",
  },
  editButton: {
    "&.MuiButtonBase-root": {
      textTransform: "none",
    },
    marginTop: "4%",
    paddingLeft: 0,
  },
  email: {
    marginTop: "2%",
  },
  icon: {
    fontSize: "inherit",
  },

  collapse: {
    maxHeight: 0,
    overflow: "hidden",
    transition: "max-height 0.2s ease",
    transitionDuration: "0.4s",
  },

  show: {
    maxHeight: "1000px",
    transition: "max-height 0.2s ease",
    transitionDuration: "0.4s",
  },
  billing: {},
  error: {
    color: theme.palette.error.main,
  },
  wrapperDiv: {
    position: "relative",
  },
  overlap: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  body: {
    padding: theme.spacing(1, 0, 3, 7),
  },
  emailAddress: {
    margin: theme.spacing(3, 0, 1),
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "2px solid #ccc",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.dark,
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: theme.palette.secondary.dark,
    },
    //for removing spin arrows from input
    "& input": {
      /* Firefox */
      "&[type=number]": {
        "-moz-appearance": "textfield",
      },
      /* Chrome, Safari, Edge, Opera */
      "&::-webkit-outer-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
      "&::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
    },

    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        border: "2px solid #ccc",
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.secondary.dark,
      },
    },
  },
  button: {
    boxShadow: `3px 3px 0 ${theme.palette.secondary.dark}`,
    borderRadius: 0,
    background: `linear-gradient(to right,rgb(115 210 230), rgb(247 235 97) 40%) right`,
    transition: "all 0.2s ease",
    WebkitTransition: "all 0.2s ease",
    msTransition: "all 0.2s ease",
    MozTransition: "all 0.2s ease",
    backgroundSize: "200%",

    "&.MuiButton-text": {
      padding: theme.spacing(1, 7),
    },

    "&:hover": {
      backgroundPosition: "left",
      boxShadow: `3px 3px 0 ${theme.palette.secondary.dark}`,
    },
  },
  buttonDiv: {
    margin: theme.spacing(3, 0),
  },
  form: {
    margin: theme.spacing(3, 0),
  },
  shipping: {
    borderBottom: "1px solid #999",
    "&.MuiTypography-body1": {
      fontWeight: 600,
    },
  },
  textFieldDiv: {
    margin: theme.spacing(1, 0),
  },
  city: {
    margin: theme.spacing(1, 0),
  },
  cityDiv: {
    paddingRight: theme.spacing(3),
  },
  country: {},
}));
export default function Checkout(props) {
  const theme = useTheme(),
    matches = useMediaQuery(theme.breakpoints.down("sm")),
    router = useRouter(),
    { cartItems } = props;

  //For checking the state of edit button for opening dropdowns
  const [editClicked, setEditClicked] = useState();

  //Done status of customer and shipping sections
  const [isDone, setIsDone] = useState();

  //shipping details of order
  const [shippingDetails, setShippingDetails] = useState();

  //on Page Load do the following:
  useEffect(() => {
    //if cart is empty redirect to cart page
    Array.isArray(cartItems) && cartItems.length === 0 && router.push("/cart");
  }, [cartItems]);
  useEffect(() => {
    //Load customer and shipping sections isDone state from local storage if exists,else set to false
    const customer = localStorage.getItem("customer"),
      shipping = localStorage.getItem("shipping"),
      isDone = {
        customer: JSON.parse(customer) || false,
        shipping: JSON.parse(shipping) || false,
      };
    setIsDone(isDone);
    //Load shipping details from local storage if exists,else set to empty string
    const details = localStorage.getItem("shippingDetails"),
      shippingDetails = JSON.parse(details) || {
        name: "",
        number: "",
        address: "",
        address2: "",
        city: "",
        postalCode: "",
      };
    setShippingDetails(shippingDetails);
    //isDone actions
    const editClick = !isDone.customer
      ? { ...editClicked, customer: true } //if customer section has not been done,open customer section
      : !isDone.shipping
      ? { ...editClicked, shipping: true } // if customer section is done but shipping is not done open shipping
      : { ...editClicked, payment: true }; //if both customer and shipping are done open payment
    setEditClicked(editClick);
  }, []);

  //For handling change in shipping details
  const handleChange = (event) => {
    const { name, value } = event.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  //For handling click of edit button on sections
  const handleEditClick = (event) => {
    const name = event.currentTarget.getAttribute("name");
    const editClicked =
      name === "customer"
        ? { shipping: false, payment: false, customer: true } //on edit click of customer, close other sections
        : { shipping: true, payment: false, customer: false }; // on edit click of shipping,close other sections

    setEditClicked(editClicked);
  };

  // For handling submitting of customer and shipping sections
  const handleSubmit = (event) => {
    const name = event.currentTarget.getAttribute("name");
    setIsDone({ ...isDone, [name]: true }); //set isDone to true
    localStorage.setItem(name, JSON.stringify(true)); //save to local storage for future
    const editClick =
      name === "customer" //customer section done,
        ? !isDone.shipping
          ? { ...editClicked, customer: false, shipping: true } //open shipping section if it is not done
          : { ...editClicked, customer: false, payment: true } //if shipping already done,open payment
        : { ...editClicked, shipping: false, payment: true }; //shipping section done,open payment section
    setEditClicked(editClick);
  };

  return (
    <>
      <Top matches={matches} heading="checkout" />
      {Array.isArray(cartItems) && cartItems.length === 0 ? (
        <h1>Empty Cart</h1>
      ) : (
        shippingDetails &&
        editClicked && (
          <section>
            <Container>
              <Grid container>
                <Grid
                  component={Box}
                  display={{ xs: "block", md: "none" }}
                  container
                  item
                  xs={12}
                >
                  {/* <Billing cartItems={cartItems} city={shippingDetails.city} /> */}
                </Grid>
              </Grid>
              <Customer
                editClicked={editClicked.customer}
                isDone={isDone.customer}
                handleClick={handleEditClick}
                handleSubmit={handleSubmit}
                matches={matches}
              />
              <Shipping
                editClicked={{
                  customer: editClicked.customer,
                  shipping: editClicked.shipping,
                }}
                isDone={isDone.shipping}
                handleClick={handleEditClick}
                handleSubmit={handleSubmit}
                matches={matches}
                shippingDetails={shippingDetails}
                handleChange={handleChange}
              />
              <Payment
                matches={matches}
                shippingDetails={shippingDetails}
                cartItems={cartItems}
                editClicked={editClicked.payment}
              />
              <Grid
                component={Box}
                display={{ xs: "none", md: "block" }}
                container
                item
                xs={12}
                md={3}
              ></Grid>
            </Container>
          </section>
        )
      )}
    </>
  );
}

Checkout.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      variations: PropTypes.objectOf(PropTypes.object),
      qty: PropTypes.number,
      price: PropTypes.number,
    })
  ),
};
