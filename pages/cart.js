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
import Cookie from "js-cookie";
import PropTypes from "prop-types";
import isEqual from "lodash.isequal";
import { QuantitySelector } from "./products/[category]/[title]";
import { isEmpty } from "../validation/product";

// eslint-disable-next-line no-unused-vars
const useSTyles = makeStyles((theme) => ({
  heading: {},
  remove: {},
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
    { cartItems, setCartItems } = props;

  return (
    <section>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              classes={{ root: classes.heading }}
              display="block"
              variant="h4"
            >
              Cart
            </Typography>
          </Grid>
        </Grid>
        <Grid container component={Box} display={{ xs: "hidden", sm: "block" }}>
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
          <MapCartItems cartItems={cartItems} setCartItems={setCartItems} />
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
                TOTAL:Rs.{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </Typography>
              <Typography display="block" variant="body2">
                shipping calculated at checkout
              </Typography>
              <div>
                <Button>Checkout</Button>
              </div>
              <div>
                <Button>Continue Shopping</Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      variations: PropTypes.objectOf(PropTypes.object),
      qty: PropTypes.number,
      price: PropTypes.number,
    })
  ),
  setCartItems: PropTypes.func,
};

const MapCartItems = (props) => {
  const { cartItems, setCartItems } = props,
    classes = useSTyles();

  return cartItems.map((item, index) => {
    <div>
      <Grid key={index} xs={4}>
        <Image
          key={index}
          src={localStorage[`${item.title}Image`]}
          width={100}
          height={100}
        />
      </Grid>
      <Grid xs={4}>
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
          Rs.{item.price}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <div>
          {/* Call the Quantity selector component from products page and pass it functions of handleChange and handleClick */}
          <QuantitySelector
            value={item.qty}
            handleChange={(event) => {
              const { value } = event.target;

              setCartItems([
                ...cartItems,
                {
                  ...item,
                  qty: value,
                },
              ]);

              Cookie.set("cartItems", { cartItems: cartItems });
            }}
            handleClick={(event) => {
              const { id } = event.target;
              let qty;

              if (id === "addIcon") qty = item.qty + 1;
              else if (id === "removeIcon") qty = item.qty - 1;

              const updatedCartItems = [...cartItems, { ...item, qty: qty }];
              //if qty of item has become zero,remove it
              setCartItems(
                updatedCartItems.filter((cartItem) => cartItem.qty > 0)
              );
              Cookie.set("cartItems", { cartItems: cartItems });
            }}
          />
        </div>
        <a
          className={classes.remove}
          onClick={() => {
            setCartItems(
              cartItems.filter((cartItem) => !isEqual(cartItem, item))
            );
            Cookie.set("cartItems", { cartItems: cartItems });
          }}
          href
        >
          remove
        </a>
      </Grid>
      <Grid xs={2}>
        <Typography>Rs.{item.price * item.qty}</Typography>
      </Grid>
    </div>;
  });
};

MapCartItems.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      variations: PropTypes.objectOf(PropTypes.object),
      qty: PropTypes.number,
      price: PropTypes.number,
    })
  ),
  setCartItems: PropTypes.func,
};
