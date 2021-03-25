import PropTypes from "prop-types";
import Image from "next/image";
import { Typography, Grid } from "@material-ui/core";
import { totalAmount, useStyles } from "../../pages/checkout";
import { isEmpty } from "../../validation/product";

export default function Billing(props) {
  const classes = useStyles(),
    { cartItems, city } = props;

  return (
    <>
      {cartItems.map((item, index) => {
        return (
          <Grid
            container
            classes={{ root: classes.billingGridContainer }}
            key={index}
          >
            <Grid item xs={3}>
              <Image
                className={classes.image}
                src={localStorage.getItem(`${item.title}/${item.id}`)}
                width={75}
                height={75}
              />
            </Grid>
            <Grid item xs={6}>
              <div className={classes.billingTitle}>
                <Typography
                  classes={{ root: classes.billingTypo }}
                  display="inline"
                  variant="body1"
                >
                  {item.qty} x{" "}
                </Typography>
                <Typography
                  classes={{ root: classes.billingTypo }}
                  display="inline"
                  variant="body1"
                >
                  {item.title}
                </Typography>
                {!isEmpty(item.variations) && //if variations are present render them
                  Object.keys(item.variations).map((variation, index) => {
                    return (
                      <Typography key={index + 1}>
                        {variation}: {item.variations[variation]}
                      </Typography>
                    );
                  })}
              </div>
            </Grid>
            <Grid item xs={3}>
              <Typography
                classes={{ root: classes.billingTypo }}
                variant="body1"
              >
                Rs{" "}
                {(item.qty * item.price)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
      <Grid classes={{ root: classes.subtotal }} container item xs={12}>
        <Grid item xs={3}>
          <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={3}>
          <Typography variant="body1" classes={{ root: classes.billingTypo }}>
            Rs{" "}
            {cartItems
              .reduce((a, c) => a + c.price * c.qty, 0)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Typography>
        </Grid>
      </Grid>
      <Grid classes={{ root: classes.shippingAmount }} container item xs={12}>
        <Grid item xs={3}>
          <Typography>Shipping</Typography>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={3}>
          <Typography classes={{ root: classes.billingTypo }}>
            Rs {city === "Karachi" || city === "karachi" ? 200 : 250}
          </Typography>
        </Grid>
      </Grid>
      <Grid classes={{ root: classes.total }} container item xs={12}>
        <Grid item xs={3}>
          <Typography>Total (PKR)</Typography>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={3}>
          <Typography classes={{ root: classes.totalAmount }} variant="h6">
            Rs {totalAmount(cartItems, city)}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

Billing.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      variations: PropTypes.objectOf(PropTypes.string),
      qty: PropTypes.number,
      price: PropTypes.number,
    })
  ),
  city: PropTypes.string,
};
