import { useRouter } from "next/router";
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  Link,
  Paper,
} from "@material-ui/core";
import PropTypes from "prop-types";
import FadeIn from "../../../components/FadeIn";
import axios from "axios";
import ErrorPage from "next/error";
import { useState } from "react";
import Top from "../../../components/layout/Top";

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: "5% 0",
  },
  toolbar: {
    boxShadow: "1px 1px #dbdada,-1px -1px #dbdada",
    marginBottom: "5%",
  },
  gridButton: {
    textAlign: "right",
    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
    },
  },
  button: {
    borderLeft: "1px solid #dbdada",
    borderRadius: 0,
    width: "100%",
    padding: "10% 0",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  array: {
    textAlign: "center",
    "& :hover": {
      "& $img": {
        transform: `scale3d(1.1,1.1,1)`,
      },
    },
  },
  product: {
    marginBottom: "5%",
  },
  productPaper: {
    margin: "5% 5% 7%",
    [theme.breakpoints.only("sm")]: {
      margin: "5% 5% 15%",
    },
    overflow: "hidden",
  },
  productCaption: {
    padding: "0 3% 3%",
  },
  img: {
    marginBottom: "3%",
    width: "100%",
    height: "50vh",
    cursor: "pointer",
    transition: "transform 4000ms",
    WebkitTransition: "transform 4000ms",
    MozTransition: "transform 4000ms",
    msTransition: "transform 4000ms",
  },
  productButton: {
    borderRadius: 0,
    marginTop: "5%",
    [theme.breakpoints.only("sm")]: {
      marginTop: "5%",
    },
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
  },
}));

export default function Products(props) {
  const { error, array } = props,
    classes = useStyles(),
    router = useRouter(),
    { category } = router.query;

  if (error) {
    return <ErrorPage statusCode={error} />;
  }
  return (
    <>
      <Top heading={category} />
      <section className={classes.section}>
        <Grid container>
          <FadeIn timeout={1000}>
            <Grid item xs={12}>
              <div className={classes.toolbar}>
                <Grid container>
                  <Grid xs={false} sm={11} item></Grid>
                  <Grid classes={{ root: classes.gridButton }} item xs={12} sm>
                    <Button classes={{ root: classes.button }}>
                      <Typography align="center" variant="button">
                        sort
                      </Typography>
                    </Button>
                  </Grid>
                  {/* <Grid item classes={{ root: classes.gridButton }} xs={6} sm>
                    <Button classes={{ root: classes.button }}>
                      <Typography align="center" variant="button">
                        filter
                      </Typography>
                    </Button>
                  </Grid> */}
                </Grid>
              </div>
            </Grid>
          </FadeIn>
        </Grid>
        <Grid container>
          <MapArray array={array} />
        </Grid>
      </section>
    </>
  );
}

Products.propTypes = {
  error: PropTypes.number,
  array: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      countInStock: PropTypes.number.isRequired,
      description: PropTypes.string,
      brand: PropTypes.string,
      auxillaryImages: PropTypes.arrayOf(PropTypes.string),
      variations: PropTypes.arrayOf(
        PropTypes.shape({
          variationTitle: PropTypes.string,
          variations: PropTypes.arrayOf(PropTypes.string),
        })
      ),
    })
  ),
};

const MapArray = (props) => {
  const { array } = props,
    // eslint-disable-next-line no-unused-vars
    [isAdmin, setIsAdmin] = useState(false),
    classes = useStyles();
  return array.map((item, index) => {
    return (
      <FadeIn key={index} timeout={2000}>
        <Grid classes={{ root: classes.array }} item xs={12} sm={6} md={4}>
          <Paper className={classes.productPaper} elevation={3}>
            <img className={classes.img} src={item.image} alt="" />
            <div className={classes.productCaption}>
              <Link
                display="block"
                href={`/products/${item.category}/${item._id}`}
                underline="none"
                color="textPrimary"
                variant="body1"
              >
                {item.title}
              </Link>
              <Typography variant="body2">
                {/* place thousand separator coma */}
                Rs {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Typography>
              {/* if admin show count in stock */}
              {isAdmin && (
                <Typography display="block" variant="caption">
                  count in stock:{item.countInStock}
                </Typography>
              )}
              <div>
                <Button
                  classes={{
                    root: classes.productButton,
                  }}
                  size="large"
                  variant="contained"
                  href={`/products/${item.category}/${item._id}`}
                >
                  <Typography
                    color="textSecondary"
                    variant="button"
                    underline="none"
                  >
                    view product
                  </Typography>
                </Button>
              </div>
            </div>
          </Paper>
        </Grid>
      </FadeIn>
    );
  });
};

MapArray.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      countInStock: PropTypes.number.isRequired,
      description: PropTypes.string,
      brand: PropTypes.string,
      auxillaryImages: PropTypes.arrayOf(PropTypes.string),
      variations: PropTypes.arrayOf(
        PropTypes.shape({
          variationTitle: PropTypes.string,
          variations: PropTypes.arrayOf(PropTypes.string),
        })
      ),
    })
  ),
};

export async function getServerSideProps(context) {
  const { category } = context.params;
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/products/?category=${category}`
    );
    return {
      props: {
        array: data.products,
      },
    };
  } catch (e) {
    return {
      props: {
        error: e.response.status,
      },
    };
  }
}
