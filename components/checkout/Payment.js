import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Button, Grid, Typography, Box, Avatar } from "@material-ui/core";
import { useStyles } from "../../pages/checkout";
import { useRouter } from "next/router";
export default function Payment(props) {
  const { cartItems, shippingDetails, matches, editClicked } = props,
    classes = useStyles(),
    router = useRouter();

  //for handling error on dispatching order to server
  const [error, setError] = useState("");

  // For dispatching order to server
  const handleSubmit = () =>
    axios
      .post("http://localhost:3000/order", {
        cartItems: cartItems,
        shippingDetails: shippingDetails,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("cartItems");
          error && setError(""); //remove error if present
          router.push("/thankyou");
        }
      })
      .catch((err) => err && setError("There was some issue please try again"));

  return (
    <Grid container item xs={12} md={9}>
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
        <Typography variant="h6">Shipping Details</Typography>
        <Typography>Address</Typography>
        <Typography>{shippingDetails.address}</Typography>
        <Typography>City</Typography>
        <Typography>{shippingDetails.city}</Typography>
        <Typography>Phone Number</Typography>
        <Typography>{shippingDetails.number}</Typography>
        <Typography>Payment Method</Typography>
        <select>
          <option>cash on delivery</option>
        </select>
        <Button variant="contained" onClick={handleSubmit}>
          Place Order
        </Button>
        {error && <span className={classes.error}>{error}</span>}
      </Grid>
    </Grid>
  );
}

Payment.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      variations: PropTypes.objectOf(PropTypes.object),
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
  editClicked: PropTypes.bool.isRequired,
};
