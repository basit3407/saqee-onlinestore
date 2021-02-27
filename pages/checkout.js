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
import Top from "../components/checkout/Top";
import Customer from "../components/checkout/Customer";
import Shipping from "../components/checkout/Shipping";
import Payment from "../components/checkout/Payment";

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
  shipping: {
    margin: "0 5%",
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
  error: {
    color: theme.palette.error.main,
  },
}));
export default function Checkout(props) {
  const theme = useTheme(),
    matches = useMediaQuery(theme.breakpoints.down("sm")),
    { cartItems } = props;

  //For checking the state of edit button for opening dropdowns
  const [editClicked, setEditClicked] = useState({
    customer: false,
    shipping: false,
    payment: false,
  });

  //Load customer and shipping sections isDone state from local storage if exists,else set to false
  const customer = localStorage.getItem("customer"),
    shipping = localStorage.getItem("shipping"),
    Done = {
      customer: customer ? JSON.parse(customer) : false,
      shipping: shipping ? JSON.parse(shipping) : false,
    },
    [isDone, setIsDone] = useState(Done);

  //Load shipping details from local storage if exists,else set to empty string
  const details = localStorage.getItem("shippingDetails"),
    detailsExist =
      details == null
        ? {
            name: "",
            number: "",
            address: "",
            address2: "",
            city: "",
            postalCode: "",
            country: "",
          }
        : JSON.parse(details),
    [shippingDetails, setShippingDetails] = useState(detailsExist);

  //on page load do following
  useEffect(() => {
    !isDone.customer
      ? setEditClicked({ ...editClicked, customer: true }) //if customer section has not been done,open customer section
      : !isDone.shipping
      ? setEditClicked({ ...editClicked, shipping: true }) // if customer section is done but shipping is not done open shipping
      : setEditClicked({ ...editClicked, payment: true }); //if both customer and shipping are done open payment
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //For handling change in shipping details
  const handleChange = (event) => {
    const { name, value } = event.target;

    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  //For handling click of edit button on sections
  const handleClick = (event) => {
    const name = event.currentTarget.getAttribute("name");
    setEditClicked({ ...editClicked, [name]: true });
  };

  // For handling submitting of customer and shipping sections
  const handleSubmit = (event) => {
    const name = event.currentTarget.getAttribute("name");

    //set isDone to true and save to local storage for future
    setIsDone({ ...isDone, [name]: true });
    localStorage.setItem(name, JSON.stringify(true));

    //customer section done,
    if (name === "customer")
      return !isDone.shipping
        ? setEditClicked({
            ...editClicked,
            customer: false,
            shipping: true, //open shipping section if it is not done
          })
        : setEditClicked({ ...editClicked, customer: false, payment: true }); //if shipping already done,open payment

    //shipping section done,
    //save shipping details to localStorage for future
    localStorage.setItem("shippingDetails", JSON.stringify(shippingDetails));
    setEditClicked({
      ...editClicked,
      shipping: false,
      payment: true, //open payment section
    });
  };
  return (
    <>
      <Top matches={matches} />
      <section>
        <Container>
          <Grid container>
            <Grid
              component={Box}
              display={{ xs: "block", md: "none" }}
              container
              item
              xs={12}
            ></Grid>
          </Grid>
          <Customer
            editClicked={editClicked.customer}
            isDone={isDone.customer}
            handleClick={handleClick}
            handleSubmit={handleSubmit}
            matches={matches}
          />
          <Shipping
            editClicked={editClicked.shipping}
            isDone={isDone.shipping}
            handleClick={handleClick}
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
