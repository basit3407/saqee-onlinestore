import {
  Box,
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
import { useState } from "react";
import { useRouter } from "next/router";
import isEqual from "lodash.isequal";
import { ObjectID } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";
import Top from "../../../components/layout/Top";

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
  },
  image: {
    borderRadius: theme.spacing(1),
  },
  auxImage: {
    margin: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
}));

export default function Product(props) {
  const { error, product, cartItems, setCartItems } = props,
    router = useRouter(),
    classes = useStyles(),
    //image to be displayed on main
    [mainImage, setMainImage] = useState(product.image),
    //Qty and variation of the product being ordered by client
    [orderDetails, setOrderDetails] = useState({
      qty: 1,
      variations: {},
    });

  //This functions sets the quanitity and variations of order from customer.
  const handleChange = (event) => {
    const { name, value } = event.target;
    const order =
      name === "qty"
        ? { ...orderDetails, [name]: parseInt(value) || value } //convert to integer if exist,if empty return empty string
        : {
            ...orderDetails,
            variations: { ...orderDetails.variations, [name]: value },
          };
    setOrderDetails(order);
  };

  //This function handles the clicks of increase or decrease icons in quantitySelector component
  const handleClick = (event) => {
    const name = event.currentTarget.getAttribute("name");
    const order =
      name === "add"
        ? { ...orderDetails, qty: parseInt(orderDetails.qty) + 1 || 1 } //convert to integer if exist,if empty return 1
        : {
            ...orderDetails,
            qty: orderDetails.qty > 1 ? orderDetails.qty - 1 : 1,
          };
    setOrderDetails(order);
  };

  //Add to cart function
  const handleAddToCart = () => {
    const orderedItem = {
      title: product.title,
      qty: orderDetails.qty < 1 ? 1 : orderDetails.qty, //if qty is less than 1,set it to 1
      variations: orderDetails.variations,
      price: product.price,
      id: product._id,
    };
    //check if items with this id are already present in cart
    const duplicateId = cartItems.filter((item) => item.id === orderedItem.id);
    // if new Id set imageUrl to localStorage to be used in other pages.
    !duplicateId.length &&
      localStorage.setItem(
        `${orderedItem.title}/${orderedItem.id}`,
        product.image
      );
    //update the cartItems
    const updatedCartItems = duplicateId.length
      ? cartItems.map((item) =>
          isEqual(item.variations, orderedItem.variations) //duplicate item
            ? { ...item, qty: item.qty + orderedItem.qty } //increase the qty of duplicate item
            : item
        )
      : [...cartItems, orderedItem]; // if no duplicate item,add the ordered item
    setCartItems(updatedCartItems);
    //update cartItems in localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    router.push("/cart");
  };

  if (error) {
    return <ErrorPage statusCode={error} />;
  }

  return (
    <>
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
                    <Box
                      display={
                        mainImage === product.image ? "none" : "inline-block"
                      }
                    >
                      <Image
                        // onClick set this image to main image (in aux section)
                        onClick={() => setMainImage(product.image)}
                        src={product.image}
                        width={50}
                        height={50}
                      />
                    </Box>
                    <MapAuxillaryImages
                      mainImage={mainImage}
                      setMainImage={setMainImage}
                      images={product.auxillaryImages}
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
                  <div>
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
    </>
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
        variationTitle: PropTypes.string,
        variations: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  }),
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

// this function is for mapping auxillary images
const MapAuxillaryImages = (props) => {
  const { images, mainImage, setMainImage } = props,
    classes = useStyles();

  return images.map((item, index) => {
    return (
      //hide the auxillary image if it is set as main image
      <Box
        key={index}
        className={classes.auxImage}
        display={item === mainImage ? "none" : "inline-block"}
      >
        <Image
          //onClick set this image to main image
          onClick={() => setMainImage(item)}
          className={classes.image}
          src={item}
          height={50}
          width={50}
        />
      </Box>
    );
  });
};

MapAuxillaryImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  mainImage: PropTypes.string.isRequired,
  setMainImage: PropTypes.func.isRequired,
};

// This function is for mapping variations of product
const MapVariations = (props) => {
  const { variations, handleChange, orderDetails } = props;
  return variations.map((item) => {
    return (
      <>
        <Typography>{item.title}</Typography>
        <select
          value={orderDetails.variations.item.title}
          onBlur={handleChange}
          name={item.title}
        >
          {item.variations.map((variation, index) => {
            return <option key={index}>{variation}</option>;
          })}
        </select>
      </>
    );
  });
};

MapVariations.propTypes = {
  variations: PropTypes.arrayOf(
    PropTypes.shape({
      variationTitle: PropTypes.string.isRequired,
      variations: PropTypes.arrayOf(PropTypes.string.isRequired),
    })
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  orderDetails: PropTypes.shape({
    qty: PropTypes.number.isRequired,
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
    console.log(e);
    return {
      props: {
        product: {},
        error: 500,
      },
    };
  }
}
