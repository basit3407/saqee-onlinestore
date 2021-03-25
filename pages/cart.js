import {
  Container,
  Grid,
  Typography,
  makeStyles,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import Image from "next/image";
import PropTypes from "prop-types";
import isEqual from "lodash.isequal";
import { useRouter } from "next/router";
import { useState } from "react";
import { QuantitySelector } from "./products/[category]/[id]";
import { isEmpty } from "../validation/product";
import Top from "../components/layout/Top";

const useSTyles = makeStyles((theme) => ({
  heading: {},
  remove: {
    textTransform: "none",
    fontSize: "0.75rem",

    "&:hover": {
      background: "none",
    },
  },

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
  titleGrid: {
    marginBottom: theme.spacing(7),
    paddingBottom: theme.spacing(1),
    borderBottom: "1px solid #dbdada",
  },

  description: {
    paddingLeft: theme.spacing(3),
  },
  qty: {
    textAlign: "center",
  },
  gridCartItems: {
    marginBottom: theme.spacing(3),
  },
  bottomGrid: {
    borderTop: "1px solid #dbdada",
    paddingTop: theme.spacing(7),
    marginBottom: theme.spacing(7),
  },
  finalBill: {
    textAlign: "right",
  },
  checkoutDiv: {
    margin: theme.spacing(3, 0),
  },
  checkoutButton: {
    boxShadow: `3px 3px 0 ${theme.palette.secondary.dark}`,
    borderRadius: 0,
    background: `linear-gradient(to right,rgb(115 210 230), rgb(247 235 97) 40%) right`,
    transition: "all 0.2s ease",
    WebkitTransition: "all 0.2s ease",
    msTransition: "all 0.2s ease",
    MozTransition: "all 0.2s ease",
    backgroundSize: "200%",

    "&.MuiButton-textSizeLarge": {
      padding: theme.spacing(1, 7),
    },
    "&:hover": {
      backgroundPosition: "left",
      boxShadow: `3px 3px 0 ${theme.palette.secondary.dark}`,
    },
  },

  continueButton: {
    borderRadius: 0,
    boxShadow: `3px 3px 0 ${theme.palette.secondary.main} `,
    background:
      "linear-gradient(to right, rgb(140, 208, 227) 50%, rgb(240, 140, 205) 100%) left",
    backgroundSize: "200%",
    transition: "all 0.2s",
    WebkitTransition: "all 0.2s",
    MozTransition: "all 0.2s",
    msTransition: "all 0.2s",
    "&:hover": {
      boxShadow: `3px 3px 0 ${theme.palette.secondary.main} `,
      backgroundPosition: "right",
    },
    "&.MuiButton-textSizeLarge": {
      padding: theme.spacing(1, 7),
    },
  },
  shopDiv: {
    margin: "3% 0",
  },
  image: {
    borderRadius: theme.spacing(1),
  },
}));

export default function Cart(props) {
  const classes = useSTyles(),
    router = useRouter(),
    { cartItems, setCartItems } = props;
  const [errors, setErrors] = useState({});
  const [orderNote, setOrderNote] = useState("");

  const handleCheckoutRequest = () => {
    //check for 0 qty of items, give error if any
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
    //if no error execute the following:
    if (isEmpty(error)) {
      orderNote && localStorage.setItem("orderNote", orderNote); //if note is present save note
      router.push("/checkout"); //direct to checkout
    } else setErrors(error); //if error is present show error
  };

  return (
    <>
      <Top heading="Cart" />
      {Array.isArray(cartItems) && cartItems.length > 0 ? (
        <section>
          <Container>
            <Grid
              container
              display={{ xs: "none", sm: "block" }}
              classes={{ root: classes.titleGrid }}
            >
              <Grid classes={{ root: classes.titleGridItem }} item xs={1}>
                <Typography>Product</Typography>
              </Grid>
              <Grid
                classes={{ root: classes.titleGridItem }}
                item
                xs={5}
              ></Grid>
              <Grid classes={{ root: classes.titleGridItem }} item xs={4}>
                <Typography align="center">Quantity</Typography>
              </Grid>
              <Grid classes={{ root: classes.titleGridItem }} item xs={2}>
                <Typography align="right">Total</Typography>
              </Grid>
            </Grid>

            <MapCartItems
              errors={errors}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
            <Grid container classes={{ root: classes.bottomGrid }}>
              <Grid item xs={12} sm={4}>
                <Typography display="block">Add Order Note</Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  placeholder="How can we help you?"
                  onChange={(event) => setOrderNote(event.target.value)}
                  value={orderNote}
                  multiline
                  size="small"
                  classes={{ root: classes.textField }}
                  rows="7"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm>
                <div className={classes.finalBill}>
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
                  <div className={classes.checkoutDiv}>
                    <Button
                      classes={{ root: classes.checkoutButton }}
                      onClick={handleCheckoutRequest}
                      size="large"
                    >
                      Checkout
                    </Button>
                  </div>
                  <Button
                    size="large"
                    href="/"
                    classes={{ root: classes.continueButton }}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Container>
        </section>
      ) : (
        <Grid container>
          <Grid item xs={12}>
            <Box flexDirection="column" display="flex" alignItems="center">
              <Typography variant="h6">
                Your cart is empty,do some shopping
              </Typography>
              <div className={classes.shopDiv}>
                <Button
                  size="large"
                  href="/"
                  classes={{ root: classes.checkoutButton }}
                >
                  Shop
                </Button>
              </div>
            </Box>
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
      variations: PropTypes.object,
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
    //remove item
    const remainingItems = cartItems.filter(
      (cartItem) => !isEqual(cartItem, item)
    );
    setCartItems(remainingItems);
    //remove image if no other identicalId item is present
    const identicalIdItem = remainingItems.find(
      (cartItem) => cartItem.id === item.id
    );
    !identicalIdItem && localStorage.removeItem(`${item.title}/${item.id}`);
    //update cartItems in localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  return cartItems.map((item, index) => {
    return (
      <Grid container classes={{ root: classes.gridCartItems }} key={index}>
        <Grid key={index} item xs={1}>
          <Image
            className={classes.image}
            src={localStorage.getItem(`${item.title}/${item.id}`)}
            width={100}
            height={100}
          />
        </Grid>
        <Grid item xs={5}>
          <div className={classes.description}>
            <Typography display="block">{item.title}</Typography>
            {/* if variations exist map variations */}
            {!isEmpty(item.variations) &&
              Object.keys(item.variations).map(
                (variationTitle, variationIndex) => {
                  return (
                    <Typography
                      display="block"
                      key={variationIndex + 1}
                      variant="body2"
                    >
                      {variationTitle}: {item.variations[variationTitle]}
                    </Typography>
                  );
                }
              )}
            <Typography display="block" variant="body2">
              Rs {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.qty}>
            <div>
              {/* Call the Quantity selector component from products page and pass it functions of handleChange and handleClick */}
              <QuantitySelector
                value={item.qty}
                handleChange={(event) => handleChange(item, event)}
                handleClick={(event) => handleClickIcons(item, event)}
              />
            </div>
            <Button
              classes={{ root: classes.remove }}
              onClick={() => handleClickRemove(item)}
            >
              Remove
            </Button>
            {errors[item.title] && (
              <Typography
                display="block"
                variant="caption"
                className={classes.error}
              >
                {errors[item.title]}
              </Typography>
            )}
          </div>
        </Grid>
        <Grid item xs={2}>
          <Typography align="right">
            Rs{" "}
            {(item.price * item.qty)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Typography>
        </Grid>
      </Grid>
    );
  });
};

MapCartItems.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      variations: PropTypes.objectOf(PropTypes.string),
      qty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      price: PropTypes.number,
    })
  ),
  setCartItems: PropTypes.func,
  errors: PropTypes.object.isRequired,
};
