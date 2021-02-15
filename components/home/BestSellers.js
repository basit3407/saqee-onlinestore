import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import FadeIn from "../Fadein";

const useStyles = makeStyles((theme) => ({
  section: {
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
    boxShadow: `3px 3px 0 ${theme.palette.secondary.dark}`,
    borderRadius: 0,
    background: `linear-gradient(to right,rgb(115 210 230), rgb(247 235 97) 40%) right`,
    transition: "all 0.2s ease",
    WebkitTransition: "all 0.2s ease",
    msTransition: "all 0.2s ease",
    MozTransition: "all 0.2s ease",
    backgroundSize: "200%",

    "&:hover": {
      backgroundPosition: "left",
      boxShadow: `3px 3px 0 ${theme.palette.secondary.dark}`,
    },
  },
  buttonTypo: {
    textTransform: "none",
  },
}));

export default function BestSellers() {
  const classes = useStyles(),
    theme = useTheme(),
    matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <section className={classes.section}>
      <Container>
        <Grid container>
          <FadeIn timeout={1000}>
            <Grid item xs={12}>
              <Typography
                classes={{ root: classes.heading }}
                align="center"
                variant={matches ? "h4" : "h2"}
                display="block"
              >
                Best Sellers
              </Typography>
            </Grid>
          </FadeIn>
        </Grid>
        <MapProducts />
      </Container>
    </section>
  );
}

const MapProducts = () => {
  const products1 = [
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
    <Carousel showThumbs={false}>
      {products.map((item, index) => {
        return (
          <Grid container key={index}>
            <Item array={item} />
          </Grid>
        );
      })}
    </Carousel>
  );
};

const Item = (props) => {
  const { array } = props,
    classes = useStyles();

  return array.map((item, index) => {
    return (
      <Grid item xs={12} md={4} key={index}>
        <div className={classes.imageDiv}>
          <img
            className={classes.image}
            src={`images/home/${item.image}.png`}
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
            }}
            size="large"
            variant="contained"
          >
            <Typography
              classes={{ button: classes.buttonTypo }}
              color="textSecondary"
              variant="button"
            >
              ADD TO CART Rs.{item.price}
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
