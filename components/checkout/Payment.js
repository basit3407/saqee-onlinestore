import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Button,
  Grid,
  Typography,
  Box,
  Avatar,
  TextField,
} from "@material-ui/core";
import { useStyles } from "../../pages/checkout";
import { useRouter } from "next/router";
export default function Payment(props) {
  const { cartItems, shippingDetails, matches, editClicked } = props,
    classes = useStyles(),
    router = useRouter();

  //for handling error on dispatching order to server
  const [error, setError] = useState("");

  // For dispatching order to server
  const handleSubmit = () => {
    const orderNote = localStorage.getItem("orderNote"); //get orderNote
    axios
      .post("/api/orders", {
        cartItems: cartItems,
        shippingDetails: shippingDetails,
        ...(orderNote && { orderNote: orderNote }), //if orderNote is present,send to server
      })
      .then((response) => {
        if (response.status === 200) {
          cartItems.forEach(
            (item) => localStorage.removeItem(`${item.title}/${item.id}`) //remove image from localStorage of each item
          );
          orderNote && localStorage.removeItem("orderNote"); //if orderNote was present,remove from localstorage
          localStorage.removeItem("cartItems");
          error && setError(""); //remove error if present
          router.push("/thankyou");
        }
      })
      .catch((err) => err && setError("There was some issue please try again"));
  };

  return (
    <>
      <Grid item xs={4}>
        <Box display="flex" alignItems="center">
          <Avatar classes={{ root: classes.avatar }}>3</Avatar>
          <Typography
            classes={{ root: classes.stepHeader }}
            variant={matches ? "body1" : "h6"}
          >
            Payment
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        classes={{ root: editClicked ? classes.show : classes.collapse }}
      >
        <div className={classes.body}>
          <div className={classes.payment}>
            <Typography classes={{ root: classes.paymentMethod }}>
              Payment Method:
            </Typography>
            <TextField select variant="outlined" SelectProps={{ native: true }}>
              <option>Cash on Delivery</option>
            </TextField>
          </div>
          <div className={classes.buttonDiv}>
            <Button classes={{ root: classes.button }} onClick={handleSubmit}>
              Place Order
            </Button>
          </div>
          {error && <div className={classes.error}>{error}</div>}
        </div>
      </Grid>
    </>
  );
}

Payment.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      variations: PropTypes.objectOf(PropTypes.string),
      qty: PropTypes.number,
      price: PropTypes.number,
    })
  ),
  shippingDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    address2: PropTypes.string,
    city: PropTypes.string.isRequired,
    postalCode: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
  }),
  matches: PropTypes.bool.isRequired,
  editClicked: PropTypes.bool,
};
