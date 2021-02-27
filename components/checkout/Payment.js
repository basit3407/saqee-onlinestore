import { useState } from "react";
import PropTypes from "prop-types";
import Cookie from "js-cookie";
import axios from "axios";
import useRouter from "next/router";
import { Button, Grid, Typography, Box, Avatar } from "@material-ui/core";
import { useStyles } from "../../pages/checkout";
export default function Payment(props) {
  const { cartItems, shippingDetails, matches, editClicked } = props,
    classes = useStyles(),
    router = useRouter();

  //for handling error on dispatching order to server
  const [error, setError] = useState(false);

  // For dispatching order to server
  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/order", {
        cartItems: cartItems,
        shippingDetails: shippingDetails,
      })
      .then((response) => {
        if (response.status === 200) {
          Cookie.remove("cartItems", { path: "" });
          router.push("/thankyou");
        }
      })
      .catch((error) => error && setError(true));
  };

  return (
    <Grid container item xs={12} md={9}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center">
          <Avatar classes={{ root: classes.avatar }}>3</Avatar>
          <Typography
            classes={{ root: classes.stepHeader }}
            variant={matches ? "body1" : "h6"}
          >
            Customer
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        classes={{ root: editClicked ? classes.show : classes.collapse }}
      >
        <Typography>items will be deliverd to following adress:</Typography>
        <Typography>{shippingDetails.address}</Typography>
        <Typography>Payment Method</Typography>
        <select>
          <option>cash on delivery</option>
        </select>
        <Button variant="contained" onClick={handleSubmit}></Button>
        {error && (
          <span className={classes.error}>
            there was some issue,please try again
          </span>
        )}
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
    postalCode: PropTypes.string.isRequired,
  }),
  matches: PropTypes.bool.isRequired,
  editClicked: PropTypes.bool.isRequired,
};
