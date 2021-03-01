import PropTypes from "prop-types";
import Image from "next/image";
import { Typography, Grid, Avatar } from "@material-ui/core";
import useStyles from "../../pages/checkout";

export default function Billing(props) {
  const { cartItems, city } = props,
    classes = useStyles();

  return (
    <div className={classes.billing}>
      <Typography display="block" variant="h6">
        Billing
      </Typography>
      {cartItems.map((item) => {
        <>
          <Grid item xs={3}>
            <div className={classes.wrapperDiv}>
              <Image width={100} height={100} />
              <Avatar classes={{ root: classes.overlap }}>{item.qty}</Avatar>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Typography display="block">{item.title}</Typography>
            {Object.keys(item.variations).map((variation, index) => {
              <Typography key={index}>
                {variation}:{item.variations[variation]}
              </Typography>;
            })}
          </Grid>
          <Grid item xs={3}>
            <Typography>Rs.{item.qty * item.price}</Typography>
          </Grid>
        </>;
      })}
      <Grid item xs={3}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6}></Grid>
      <Grid item xs={3}>
        <Typography display="block">
          {/* calculate the total amout of money and render */}
          TOTAL:Rs.
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>Shipping</Typography>
      </Grid>
      <Grid item xs={6}></Grid>
      <Grid item xs={3}>
        <Typography display="block">
          Rs.
          {city.charAt[0].toUpperCase() + city.slice(1).toLowerCase() ===
          "Karachi"
            ? 200
            : 250}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>Total</Typography>
      </Grid>
      <Grid item xs={6}></Grid>
      <Grid item xs={3}>
        <Typography display="block" variant="h6">
          Rs: Total Price
        </Typography>
      </Grid>
    </div>
  );
}

Billing.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      variations: PropTypes.objectOf(PropTypes.object),
      qty: PropTypes.string,
      price: PropTypes.string,
    })
  ),
  city: PropTypes.string,
};
