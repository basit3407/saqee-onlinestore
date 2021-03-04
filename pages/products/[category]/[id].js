/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import ErrorPage from "next/error";
import Image from "next/image";
import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import isEqual from "lodash.isequal";
import Cookies from "js-cookie";
import Top from "../../../components/layout/Top";

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  auxillaryImages: {
    textAlign: "center",
  },
  quantitySelector: {
    border: "1px solid #dbdada",
  },
  icons: {
    cursor: "pointer",
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
        ? { ...orderDetails, qty: parseInt(orderDetails.qty) + 1 }
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
    };
    const updatedCartItems = checkDuplicate(cartItems, orderedItem) //check if ordered item is already present
      ? cartItems.map((item) =>
          isEqual(item.variations, orderedItem.variations) //duplicate item
            ? { ...item, qty: item.qty + orderedItem.qty } //increase the qty of duplicate item
            : item
        )
      : [...cartItems, orderedItem]; // if no duplicate item,add the ordered item
    setCartItems(updatedCartItems);
    Cookies.set(`${product.title}Image`, product.image, { expires: 1 }); //set imageUrl in cookie to be used in other pages.will expire after 1 day
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); //update localStorage
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
              <div>
                <Image src={mainImage} width={500} height={500} />
              </div>
              {/* if auxillary images are present render them */}
              {product.auxillaryImages && (
                <div className={classes.auxillaryImages}>
                  {/*hide the small image if it is set as main image */}
                  <Box
                    display={
                      mainImage === product.image ? "none" : "inline-block"
                    }
                  >
                    <Image
                      // onClick set this image to main image
                      onClick={() => setMainImage(product.image)}
                      src={product.image}
                      width={100}
                      height={100}
                    />
                  </Box>
                  <MapAuxillaryImages
                    mainImage={mainImage}
                    setMainImage={setMainImage}
                    images={product.auxillaryImages}
                  />
                </div>
              )}
            </Grid>
            <Grid item xs={12} md>
              <div>
                <Typography variant="h4">{product.title}</Typography>
                {/* if brand and description are present render description */}
                {product.brand && (
                  <Typography variant="body2">{product.brand}</Typography>
                )}
                {product.description && (
                  <Typography variant="body2">{product.description}</Typography>
                )}
                <Typography>
                  Rs{" "}
                  {product.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Typography>
                {/* if out of stock show out of stock else show available */}
                <div
                  style={{ color: product.countInStock > 0 ? "green" : "red" }}
                >
                  <Typography color="inherit">
                    status:{" "}
                    {product.countInStock > 0 ? "available" : "out of stock"}
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
                    <div>
                      <Typography display="block">Qty: </Typography>
                      <QuantitySelector
                        value={orderDetails.qty}
                        handleChange={handleChange}
                        handleClick={handleClick}
                      />
                    </div>
                    <div>
                      <Button onClick={handleAddToCart}>Add to cart</Button>
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
  const { images, mainImage, setMainImage } = props;
  return images.map((item, index) => {
    return (
      //hide the auxillary image if it is set as main image
      <Box key={index} display={item === mainImage ? "none" : "inline-block"}>
        <Image
          //onClick set this image to main image
          onClick={() => setMainImage(item)}
          src={item}
          height={100}
          width={100}
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
      <span
        className={classes.icons}
        name="remove"
        role="button"
        tabIndex={0}
        onClick={handleClick}
      >
        <RemoveIcon />
      </span>
      <input name="qty" onChange={handleChange} type="number" value={value} />
      <span
        className={classes.icons}
        name="add"
        role="button"
        tabIndex={0}
        onClick={handleClick}
      >
        <AddIcon />
      </span>
    </div>
  );
};

QuantitySelector.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

//This funtions checks if the duplicate of ordered item is present or not.
const checkDuplicate = (cartItems, orderedItem) => {
  //   check if items with this title are already present in cart
  const duplicateTitles = cartItems.filter(
    (item) => item.title === orderedItem.title
  );
  //if duplicate titles are present check if any have exact same variations
  return (
    duplicateTitles.length &&
    duplicateTitles.find((item) =>
      isEqual(item.variations, orderedItem.variations)
    )
  );
};

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
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/products/${id}?category=${category}`
    );

    return {
      props: {
        product: data.product,
      },
    };
  } catch (e) {
    return {
      props: {
        error: e.response.status,
        product: {},
      },
    };
  }
}
