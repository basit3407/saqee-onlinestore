import {
  Button,
  Card,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const useStyles = makeStyles((theme) => ({
  card: {
    paddingTop: "5%",
  },
  heading: {
    marginBottom: "5%",
  },
  imageDiv: {
    textAlign: "center",
    margin: "5%",
  },

  buttonDiv: {
    textAlign: "center",
    margin: "10% 0",
  },
  button: {
    boxShadow: "10px -10px 10px #f7eb61",
  },
  buttonColor: {
    backgroundColor: theme.palette.secondary.dark,
  },
  buttonTypo: {
    textTransform: "none",
  },
}));

export default function BestSellers() {
  const classes = useStyles(),
    products1 = [
      {
        product: "Lipstick",
        price: "10",
        image: "lipstick",
      },
      {
        product: "Perfumes",
        price: "15",
        image: "perfumes",
      },
      {
        product: "Nail Polish",
        price: "20",
        image: "nailPolish",
      },
    ],
    products2 = [
      {
        product: "Lipstick",
        price: "10",
        image: "lipstick",
      },
      {
        product: "Perfumes",
        price: "15",
        image: "perfumes",
      },
      {
        product: "Nail Polish",
        price: "20",
        image: "nailPolish",
      },
    ],
    products3 = [
      {
        product: "Lipstick",
        price: "10",
        image: "lipstick",
      },
      {
        product: "Perfumes",
        price: "15",
        image: "perfumes",
      },
      {
        product: "Nail Polish",
        price: "20",
        image: "nailPolish",
      },
    ],
    products = [products1, products2, products3];
  return (
    <Card className={classes.card} component="section">
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              classes={{ root: classes.heading }}
              align="center"
              variant="h2"
              display="block"
            >
              Best Sellers
            </Typography>
          </Grid>

          <MapProducts array={products} />
        </Grid>
      </Container>
    </Card>
  );
}

export const MapProducts = (props) => {
  const { array } = props;

  return (
    <Carousel showThumbs={false}>
      {array.map((item, index) => {
        return (
          <Grid container key={index}>
            <Item array={item} key={index} />
          </Grid>
        );
      })}
    </Carousel>
  );
};

MapProducts.propTypes = {
  array: PropTypes.array.isRequired,
};

export const Item = (props) => {
  const { array } = props,
    classes = useStyles();

  return array.map((item, index) => {
    return (
      <Grid item xs={12} md={4} key={index}>
        <div className={classes.imageDiv}>
          <img
            className={classes.image}
            src={`images/${item.image}.png`}
            alt=""
          />
        </div>
        <Typography
          color="primary"
          display="block"
          align="center"
          variant="body1"
        >
          {item.product}
        </Typography>

        <div className={classes.buttonDiv}>
          <Button
            classes={{
              root: classes.button,
              containedSecondary: classes.buttonColor,
            }}
            color="secondary"
            size="large"
            variant="contained"
          >
            <Typography
              classes={{ button: classes.buttonTypo }}
              color="primary"
              variant="button"
            >
              ADD TO CART Rs{item.price}
            </Typography>
          </Button>
        </div>
      </Grid>
    );
  });
};

Item.propTypes = {
  array: PropTypes.array.isRequired,
};
