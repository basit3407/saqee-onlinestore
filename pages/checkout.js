import {
  Container,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import Top from "../components/checkout/Top";
import Customer from "../components/checkout/Customer";
import Shipping from "../components/checkout/Shipping";

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
}));
export default function Checkout() {
  const theme = useTheme(),
    matches = useMediaQuery(theme.breakpoints.down("sm")),
    //For checking the state of edit button for opening dropdowns
    [editClicked, setEditClicked] = useState({
      customer: false,
      shipping: false,
      payment: false,
    }),
    //For changing state of avatar icon from number to tick and remembring user details
    [isDone, setIsDone] = useState({
      customer: false,
      shipping: false,
      payment: false,
    });

  //Set values of isdone on page load from localstorage if exists else set to false
  useEffect(() => {
    const customer = localStorage.getItem("customer"),
      shipping = localStorage.getItem("shipping"),
      payment = localStorage.getItem("payment"),
      isDone = {
        customer: customer ? JSON.parse(customer) : false,
        shipping: shipping ? JSON.parse(shipping) : false,
        payment: payment ? JSON.parse(payment) : false,
      };

    setIsDone(isDone);

    //if customer section has not been done,set edit clicked to false
    !isDone.customer && setEditClicked({ ...editClicked, customer: true });
  }, [editClicked]);

  const handleClick = (event) => {
    const name = event.currentTarget.getAttribute("name");
    setEditClicked({ ...editClicked, [name]: true });
  };

  const handleSubmit = (event) => {
    const name = event.currentTarget.getAttribute("name");

    //save isDone to local storage
    localStorage.setItem(name, JSON.stringify(true));

    //customer section done, open shipping section if it is not done.
    name === "customer" && !isDone.shipping
      ? setEditClicked({ ...editClicked, customer: false, shipping: true })
      : setEditClicked({ ...editClicked, customer: false });

    //payment section done, open payment section if it is not done
    name === "shipping" && !isDone.payment
      ? setEditClicked({ ...editClicked, shipping: false, payment: true })
      : setEditClicked({ ...editClicked, shipping: false });

    //payment done
    setEditClicked({ ...editClicked, payment: false });
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
