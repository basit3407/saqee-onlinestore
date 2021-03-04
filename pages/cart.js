import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Box,
  TextField,
  Button,
} from "@material-ui/core";
import Image from "next/image";
import PropTypes from "prop-types";
import isEqual from "lodash.isequal";
import { QuantitySelector } from "./products/[category]/[id]";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";
import { isEmpty } from "../validation/product";
import Top from "../components/layout/Top";

// eslint-disable-next-line no-unused-vars
const useSTyles = makeStyles((theme) => ({
  heading: {},
  remove: {},
  error: { color: theme.palette.error.main },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
      border: "1px solid #dbdada",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #dbdada",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #dbdada",
    },
  },
}));

export default function Cart(props) {
  const classes = useSTyles(),
    router = useRouter(),
    { cartItems, setCartItems } = props;
  const [errors, setErrors] = useState({});

  const handleCheckoutRequest = () => {
    //check for 0 qty of items and give error if any
    let error;
    cartItems.forEach(
      (cartItem) =>
        (error = {
          ...error,
          ...(cartItem.qty < 1 && {
            [cartItem.title]:
              "Please enter valid value,else click remove if you want to remove the item form cart",
          }),
        })
    );
    isEmpty(error) ? router.push("/checkout") : setErrors(error);
  };

  return (
    <>
      <Top heading="Cart" />
      {cartItems.length ? (
        <section>
          <Container>
            <Grid
              container
              component={Box}
              display={{ xs: "hidden", sm: "block" }}
            >
              <Grid item xs={4}>
                <Typography>Product</Typography>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={2}>
                <Typography>Quantity</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Total</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <MapCartItems
                errors={errors}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={4}>
                <Typography display="block">Add Order Note</Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  placeholder="How can we help you?"
                  multiline
                  size="small"
                  classes={{ root: classes.textField }}
                  rows="10"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm>
                <div>
                  <Typography display="block">
                    {/* calculate the total amout of money and render */}
                    TOTAL:Rs{" "}
                    {cartItems
                      .reduce((a, c) => a + c.price * c.qty, 0)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Typography>
                  <Typography display="block" variant="body2">
                    shipping calculated at checkout
                  </Typography>
                  <div>
                    <Button onClick={handleCheckoutRequest}>Checkout</Button>
                  </div>
                  <div>
                    <Button>Continue Shopping</Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </section>
      ) : (
        <Grid container>
          <Grid item xs={12}>
            <div>
              <Typography>Your cart is empty,do some shopping</Typography>
              <div>
                <Button href="/" variant="contained">
                  Shop
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      variations: PropTypes.objectOf(PropTypes.object),
      qty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      price: PropTypes.number,
    })
  ),
  setCartItems: PropTypes.func,
};

const MapCartItems = (props) => {
  const { cartItems, setCartItems, errors } = props,
    classes = useSTyles();

  //This function handles the change in qty of ordered items
  const handleChange = (item, event) => {
    const { value } = event.target;
    const updatedCartItems = cartItems.map((cartItem) =>
      isEqual(cartItem, item)
        ? { ...cartItem, qty: parseInt(value) || value } //convert to integer if exist,if empty return empty string
        : cartItem
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  //This functions handles the click on "+" or "-" icons
  const handleClickIcons = (item, event) => {
    const name = event.currentTarget.getAttribute("name");
    const qty =
      name === "add"
        ? parseInt(item.qty) + 1 || 1 //convert to integer if exist,if empty return 1
        : item.qty > 1
        ? item.qty - 1
        : 1; //if qty is 1 dont subtract further
    const updatedCartItems = cartItems.map((cartItem) =>
      isEqual(cartItem, item) ? { ...cartItem, qty: qty } : cartItem
    );

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  //This functions handles the click on remove Button
  const handleClickRemove = (item) => {
    const remainingItems = cartItems.filter(
      (cartItem) => !isEqual(cartItem, item)
    );
    setCartItems(remainingItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  return cartItems.map((item, index) => {
    return (
      <div key={index}>
        <Grid item key={index} xs={4}>
          <Image
            src={Cookies.get(`${item.title}Image`)}
            width={100}
            height={100}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography display="block" variant="h4">
            {item.title}
          </Typography>
          {/* if variations exist map variations */}
          {!isEmpty(item.variations) &&
            Object.keys(item.variations).map((property, index) => {
              return (
                <Typography display="block" key={index} variant="body2">
                  {property}:{item.variations[property]}
                </Typography>
              );
            })}
          <Typography display="block" variant="body2">
            Rs {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <div>
            {/* Call the Quantity selector component from products page and pass it functions of handleChange and handleClick */}
            <QuantitySelector
              value={item.qty}
              handleChange={(event) => handleChange(item, event)}
              handleClick={(event) => handleClickIcons(item, event)}
            />
          </div>
          <Button
            className={classes.remove}
            onClick={() => handleClickRemove(item)}
          >
            remove
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Typography>
            Rs{" "}
            {(item.price * item.qty)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Typography>
        </Grid>
        {errors[item.title] && (
          <span className={classes.error}>{errors[item.title]}</span>
        )}
      </div>
    );
  });
};

MapCartItems.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      variations: PropTypes.objectOf(PropTypes.object),
      qty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      price: PropTypes.number,
    })
  ),
  setCartItems: PropTypes.func,
  errors: PropTypes.object.isRequired,
};
