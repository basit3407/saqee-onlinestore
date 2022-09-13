/* eslint-disable jsx-a11y/no-onchange */
import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import ErrorPage from "next/error";
import Image from "next/image";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import isEqual from "lodash.isequal";
import { ObjectID } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";
import Top from "../../../components/layout/Top";
import Layout from "../../../components/layout";

const useStyles = makeStyles((theme) => ({
  auxillaryImages: {
    textAlign: "center",
  },
  quantitySelector: {
    border: "1px solid #dbdada",
    display: "inline-block",
    //for removing spin arrows from input
    "& input": {
      /* Firefox */
      "&[type=number]": {
        "-moz-appearance": "textfield",
      },
      /* Chrome, Safari, Edge, Opera */
      "&::-webkit-outer-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
      "&::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
    },
  },
  icons: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    "&:focus": {
      outline: "none",
    },
  },
  icon: {
    marginTop: theme.spacing(1),
  },
  productDesc: {
    margin: "5% 0",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  title: {
    margin: "3% 0",
  },
  subHeading: { marginBottom: "1%" },
  description: {
    marginBottom: "5%",
    whiteSpace: "pre-line",
  },
  status: {
    marginBottom: "5%",
  },
  qty: {
    marginBottom: "5%",
  },
  input: {
    textAlign: "center",
    width: theme.spacing(7),
  },
  addToCartBtn: {
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
  images: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
    marginBottom: theme.spacing(3),
  },
  image: {
    borderRadius: theme.spacing(1),
  },
  auxImage: {
    margin: theme.spacing(1),
    cursor: "pointer",
    display: "inline-block",
  },
  variations: {
    marginBottom: theme.spacing(3),
  },
  variation: {
    margin: theme.spacing(1, 0),
    "& select": {
      fontFamily: `'Work Sans', sans-serif`,
      border: "2px solid #ccc",
      textAlign: "center",
      padding: theme.spacing(1),
      cursor: "pointer",
      "&:focus": {
        outline: "none",
      },
    },
  },
}));

export default function Product(props) {
  const { error, product, cartItems, setCartItems } = props,
    router = useRouter(),
    classes = useStyles(),
    [mainImage, setMainImage] = useState(
      `/images/${product.category}/${product.category} (${product.image}).jpg`
    ), //image to be displayed on main
    [orderDetails, setOrderDetails] = useState({
      //Qty and variation of the product being ordered by client
      qty: 1,
      variations: null,
    });

  //on page load Assign default values of variations if present
  useEffect(() => {
    product.variations &&
      setOrderDetails({
        ...orderDetails,
        variations: Object.assign(
          {},
          ...product.variations.map((variation) => ({
            [variation.title]: variation.values[0],
          }))
        ),
      });
  }, []);

  //This functions sets the quanitity and variations of order from customer.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrderDetails((prevVal) =>
      name === "qty"
        ? {
            ...prevVal,
            [name]: parseInt(value) || value, //convert to integer if exist,if empty return empty string
          }
        : {
            ...prevVal,
            variations: { ...prevVal.variations, [name]: value },
          }
    );
  };

  //This function handles the clicks of increase or decrease icons in quantitySelector component
  const handleClick = (event) => {
    const name = event.currentTarget.getAttribute("name");
    setOrderDetails((prevVal) =>
      name === "add"
        ? { ...prevVal, qty: parseInt(prevVal.qty) + 1 || 1 } //convert to integer if exist,if empty return 1
        : {
            ...prevVal,
            qty: prevVal.qty > 1 ? prevVal.qty - 1 : 1,
          }
    );
  };

  //Handling of Add to cart Button click
  const handleAddToCart = () => {
    //check if duplicate item exist or not.
    const identicalIdItems = cartItems.filter(
        (item) => item.id === product._id
      ),
      duplicateItem =
        identicalIdItems.length &&
        identicalIdItems.find((item) =>
          isEqual(item.variations, orderDetails.variations)
        );
    //if new item,set image to local storage
    !identicalIdItems.length &&
      localStorage.setItem(`${product.title}/${product._id}`, product.image);
    //update cart Items
    const updatedCartItems = duplicateItem
      ? cartItems.map((item) =>
          isEqual(item.variations, orderDetails.variations) //duplicate item
            ? { ...item, qty: item.qty + orderDetails.qty } //increase the qty of duplicate item
            : item
        )
      : [
          // if no duplicate item,add the ordered item
          ...cartItems,
          {
            ...orderDetails,
            title: product.title,
            price: product.price,
            id: product._id,
          },
        ];
    setCartItems(updatedCartItems);

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); //update cartItems in localStorage
    router.push("/cart"); //redirect to carts page
  };

  if (error) {
    return <ErrorPage statusCode={error} />;
  }

  return (
    <Layout cartItems={cartItems}>
      <Top heading={product.title} />
      <section>
        <Container>
          <Grid container>
            <Grid item xs={12} md={6}>
              <div className={classes.images}>
                <Image
                  className={classes.image}
                  src={mainImage}
                  width={500}
                  height={500}
                />
                {/* if auxillary images are present render them */}
                {product.auxillaryImages && (
                  <div className={classes.auxillaryImages}>
                    {/*hide main image from aux section if it is set as main image */}
                    {mainImage !==
                      `/images/${product.category}/${product.category} (${product.image}).jpg` && (
                      <div className={classes.auxImage}>
                        <Image
                          onClick={() =>
                            setMainImage(
                              `/images/${product.category}/${product.category} (${product.image}).jpg`
                            )
                          } // onClick set this image to main image (in aux section)
                          className={classes.image}
                          src={`/images/${product.category}/${product.category} (${product.image}).jpg`}
                          width={50}
                          height={50}
                        />
                      </div>
                    )}

                    <MapAuxillaryImages
                      mainImage={mainImage}
                      setMainImage={setMainImage}
                      images={product.auxillaryImages}
                      category={product.category}
                    />
                  </div>
                )}
              </div>
            </Grid>
            <Grid item xs={12} md>
              <div className={classes.productDesc}>
                <div className={classes.title}>
                  <Typography
                    classes={{ root: classes.subHeading }}
                    variant="h4"
                  >
                    {product.title}
                  </Typography>
                  {/* if brand and description are present render description */}
                  {product.brand && (
                    <Typography variant="body2">{product.brand}</Typography>
                  )}
                </div>
                {product.description && (
                  <Typography
                    classes={{ root: classes.description }}
                    variant="body2"
                  >
                    {product.description}
                  </Typography>
                )}
                <Typography>
                  Rs{" "}
                  {product.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Typography>
                {/* if out of stock show out of stock else show available */}
                <div
                  className={classes.status}
                  style={{ color: product.countInStock > 0 ? "green" : "red" }}
                >
                  <Typography color="inherit">
                    Status:{" "}
                    {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                  </Typography>
                </div>
                {/* if in stock and variations are present show variations */}
                {product.countInStock > 0 && product.variations && (
                  <div className={classes.variations}>
                    <MapVariations
                      handleChange={handleChange}
                      variations={product.variations}
                      orderDetails={orderDetails}
                    />
                  </div>
                )}
                {/* if in stock show quantity and add to cart button */}
                {product.countInStock > 0 && (
                  <>
                    <div className={classes.qty}>
                      <Typography
                        classes={{ root: classes.quantity }}
                        display="block"
                      >
                        Quantity:{" "}
                      </Typography>
                      <QuantitySelector
                        value={orderDetails.qty}
                        handleChange={handleChange}
                        handleClick={handleClick}
                      />
                    </div>
                    <div>
                      <Button
                        classes={{ root: classes.addToCartBtn }}
                        onClick={handleAddToCart}
                        size="large"
                      >
                        Add to cart
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Layout>
  );
}

Product.propTypes = {
  error: PropTypes.number,
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    countInStock: PropTypes.number.isRequired,
    description: PropTypes.string,
    brand: PropTypes.string,
    auxillaryImages: PropTypes.arrayOf(PropTypes.string),
    variations: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  }),
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      variations: PropTypes.objectOf(PropTypes.string),
      qty: PropTypes.number,
      price: PropTypes.number,
    })
  ),
  setCartItems: PropTypes.func,
};

// this function is for mapping auxillary images
const MapAuxillaryImages = (props) => {
  const { images, mainImage, setMainImage } = props,
    classes = useStyles();

  return images.map((item, index) => {
    return (
      //hide the auxillary image if it is set as main image
      `/images/${props.category}/${props.category} (${item}).jpg` !==
        mainImage && (
        <div key={index} className={classes.auxImage}>
          <Image
            onClick={() =>
              setMainImage(
                `/images/${props.category}/${props.category} (${item}).jpg`
              )
            } //onClick set this image to main image
            className={classes.image}
            src={`/images/${props.category}/${props.category} (${item}).jpg`}
            height={50}
            width={50}
          />
        </div>
      )
    );
  });
};

MapAuxillaryImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  mainImage: PropTypes.string.isRequired,
  setMainImage: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
};

// This function is for mapping variations of product
const MapVariations = (props) => {
  const { variations, handleChange, orderDetails } = props,
    classes = useStyles();
  return variations.map((variation, variationIndex) => {
    return (
      <div className={classes.variation} key={variationIndex + 1}>
        <Typography>{variation.title}:</Typography>
        <select
          value={orderDetails[variation.title]}
          onChange={handleChange}
          name={variation.title}
        >
          {variation.values.map((value, valueIndex) => {
            return <option key={valueIndex + 1}>{value}</option>;
          })}
        </select>
      </div>
    );
  });
};

MapVariations.propTypes = {
  variations: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      values: PropTypes.arrayOf(PropTypes.string.isRequired),
    })
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  orderDetails: PropTypes.shape({
    qty: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    variations: PropTypes.objectOf(PropTypes.string.isRequired),
  }),
};

//This function sets the quantity of the product being ordered.
export const QuantitySelector = (props) => {
  const classes = useStyles(),
    { handleChange, value, handleClick } = props;
  return (
    <div className={classes.quantitySelector}>
      <button className={classes.icons} name="remove" onClick={handleClick}>
        <RemoveIcon fontSize="small" classes={{ root: classes.icon }} />
      </button>
      <TextField
        name="qty"
        onChange={handleChange}
        type="number"
        value={value}
        InputProps={{ disableUnderline: true }}
        inputProps={{ className: classes.input }}
      />
      <button className={classes.icons} name="add" onClick={handleClick}>
        <AddIcon fontSize="small" classes={{ root: classes.icon }} />
      </button>
    </div>
  );
};

QuantitySelector.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

//on page load get the product from db
export async function getServerSideProps(context) {
  const { category, id } = context.params;
  // check if id is valid objectId
  if (!/^[0-9a-fA-F]{24}$/.test(id))
    return {
      props: {
        error: 404, //return error if invalid id;
        product: {},
      },
    };

  //query db by category and product id.
  const { db } = await connectToDatabase(),
    dbQuery = { category: category.slice(0).toLowerCase(), _id: ObjectID(id) };
  try {
    const product = await db.collection("products").findOne(dbQuery);
    return {
      props: product
        ? { product: JSON.parse(JSON.stringify(product)) }
        : { error: 404, product: {} },
    };
  } catch (e) {
    return {
      props: {
        product: {},
        error: 500,
      },
    };
  }
}
