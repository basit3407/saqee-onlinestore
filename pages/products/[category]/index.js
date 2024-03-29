import { useRouter } from "next/router";
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  Link,
  Paper,
  Menu,
  MenuItem,
} from "@material-ui/core";
import PropTypes from "prop-types";
import ErrorPage from "next/error";
import { useState } from "react";
import Image from "next/image";
import { connectToDatabase } from "../../../util/mongodb";
import FadeIn from "../../../components/FadeIn";
import Top from "../../../components/layout/Top";
import Layout from "../../../components/layout";

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
    boxShadow: `3px 3px 0 ${theme.palette.secondary.dark}`,
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
}));

export default function Products(props) {
  const { error, array, cartItems } = props,
    classes = useStyles(),
    router = useRouter(),
    { category } = router.query;

  //states
  const [products, setProducts] = useState(array), //array of products
    [anchorSort, setAnchorSort] = useState(); //anchor for sort DropDown

  //for opening sort Menu
  const openSortMenu = Boolean(anchorSort);

  //This funcion handles the click on sort button
  const handleClickSort = (event) => setAnchorSort(event.currentTarget);

  // This function handles the clicks on options in sort menu
  const handleSort = (event) => {
    const { id } = event.target;
    const ascendingOrder = products.sort((a, b) => a.price - b.price); //ascending
    const sortedProducts =
      id === "ascending" ? ascendingOrder : ascendingOrder.reverse(); //descending
    setProducts(sortedProducts);
    setAnchorSort();
  };

  if (error) {
    return <ErrorPage statusCode={error} />;
  }

  return (
    <Layout cartItems={cartItems}>
      <Top heading={category} />
      <section className={classes.section}>
        <Grid container>
          <FadeIn timeout={1000}>
            <Grid item xs={12}>
              <div className={classes.toolbar}>
                <Grid container>
                  <Grid xs={false} sm={11} item></Grid>
                  <Grid classes={{ root: classes.gridButton }} item xs={12} sm>
                    <Button
                      onClick={handleClickSort}
                      classes={{ root: classes.button }}
                    >
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
          <MapProducts products={products} />
        </Grid>
      </section>
      <Menu
        anchorEl={anchorSort}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        //important for custom position of anchor origin
        getContentAnchorEl={null}
        keepMounted
        open={openSortMenu}
        onClose={() => setAnchorSort()}
        classes={{ paper: classes.sortPaper }}
        PaperProps={{ elevation: 0 }}
        //important for keeping popover to full left
        marginThreshold={0}
      >
        <MenuItem id="ascending" onClick={handleSort}>
          Price low to high
        </MenuItem>
        <MenuItem id="descending" onClick={handleSort}>
          Price high to low
        </MenuItem>
      </Menu>
    </Layout>
  );
}

Products.propTypes = {
  error: PropTypes.number,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      variations: PropTypes.objectOf(PropTypes.string),
      qty: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      price: PropTypes.number,
    })
  ),
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

const MapProducts = (props) => {
  const { products } = props,
    // eslint-disable-next-line no-unused-vars
    [isAdmin, setIsAdmin] = useState(false),
    classes = useStyles();
  return products.map((item, index) => {
    return (
      <FadeIn key={index} timeout={2000}>
        <Grid classes={{ root: classes.array }} item xs={12} sm={6} md={4}>
          <Paper className={classes.productPaper} elevation={3}>
            <Image
              width={425}
              height={425}
              className={classes.img}
              src={`/images/${item.category}/${item.category} (${item.image}).jpg`}
            />
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

MapProducts.propTypes = {
  products: PropTypes.arrayOf(
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

//get products from database on page load.
export async function getServerSideProps(context) {
  const { category } = context.params;

  //query db by category
  const dbQuery = { category: category.slice(0).toLowerCase() };
  const { db } = await connectToDatabase();
  try {
    const products = await db.collection("products").find(dbQuery).toArray();

    return {
      props: products.length
        ? { array: JSON.parse(JSON.stringify(products)) }
        : { error: 404 },
    };
  } catch (e) {
    return {
      props: {
        error: 500,
      },
    };
  }
}
