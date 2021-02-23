import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import Image from "next/image";
import isEmpty from "is-empty";
import { useDispatch, useSelector } from "react-redux";
import { QuantitySelector } from "./products/[category]/[title]";
import { addToCart, removeFromCart } from "../actions/cartActions";

const useSTyles = makeStyles((theme) => ({
  heading: {},
}));

export default function Cart() {
  const classes = useSTyles();

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
          <MapCartItems />
        </Grid>
      </Container>
    </section>
  );
}

const MapCartItems = () => {
  const { cartItems } = useSelector((state) => state.cart),
    classes = useSTyles(),
    dispatch = useDispatch();

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
          Object.keys(item.variations).map((key, index) => {
            return (
              <Typography display="block" key={index} variant="body2">
                {key}:{item.variations[key]}
              </Typography>
            );
          })}
        <Typography display="block" variant="body2">
          {item.price}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <div>
          <QuantitySelector
            value={item.qty}
            handleChange={() =>
              dispatch(
                addToCart(item.title, item.qty, item.variations, item.price)
              )
            }
            handleClick={(event) => {
              const { id } = event.target;
              if (id === "addIcon")
                return dispatch(
                  addToCart(item.title, 1, item.variations, item.price)
                );

              if (id === "removeIcon")
                dispatch(
                  removeFromCart(item.title, 1, item.variations, item.price)
                );
            }}
          />
        </div>
      </Grid>
    </div>;
  });
};
