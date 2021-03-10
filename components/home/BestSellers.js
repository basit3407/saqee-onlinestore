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
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FadeIn from "../FadeIn";

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
}));

export default function BestSellers() {
  const classes = useStyles(),
    theme = useTheme(),
    matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <section id="bestSellers" className={classes.section}>
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
        category: "garments",
        id: "60403b8c69c3fa2e3c01670e",
        title: "Shirt & Trousers (2 piece)",
        brand: "Aiman Zaman",
        price: 2250,
        image: 4,
      },
      {
        category: "garments",
        title: "Shirt, Duppatta & Lehenga (3 piece)",
        id: "60403b8c69c3fa2e3c016710",
        brand: "Aisha Imran",
        price: 3450,
        image: 5,
      },
      {
        category: "garments",
        title: "Shirt, Duppatta & Trousers (3 piece)",
        id: "60403b8c69c3fa2e3c016711",
        brand: "Gul Warin",
        price: 3550,
        image: 2,
      },
    ],
    products2 = [
      {
        category: "other",
        price: 350,
        id: "60403b8c69c3fa2e3c01671d",
        image: 9,
      },
      {
        category: "other",
        price: 950,
        id: "60403b8c69c3fa2e3c01671e",
        image: 10,
      },
      {
        category: "other",
        price: 750,
        id: "60403b8c69c3fa2e3c01671f",
        image: 11,
      },
    ],
    products3 = [
      {
        category: "other",
        price: 1350,
        id: "60403b8c69c3fa2e3c016725",
        image: 12,
      },
      {
        category: "other",
        price: 1250,
        id: "60403b8c69c3fa2e3c01672c",
        image: 13,
      },
      {
        category: "other",
        price: 950,
        id: "60403b8c69c3fa2e3c01672e",
        image: 14,
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
          <Image
            src={`/images/bestsellers/bestsellers (${item.image}).jpeg`}
            alt=""
            width={500}
            height={500}
          />
        </div>
        <Typography color="primary">{item.title}</Typography>
        <Typography variant="caption" color="primary">
          {item.brand}
        </Typography>
        <Typography
          color="primary"
          display="block"
          align="center"
          variant="body1"
        >
          Rs {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Typography>

        <div className={classes.buttonDiv}>
          <Button
            classes={{
              root: classes.button,
            }}
            size="large"
            variant="contained"
            href={`/products/${item.category}/${item.id}`}
          >
            <Typography color="textSecondary" variant="button">
              View Product
            </Typography>
          </Button>
        </div>
      </Grid>
    );
  });
};

Item.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      title: PropTypes.string,
      brand: PropTypes.string,
      image: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ),
};
