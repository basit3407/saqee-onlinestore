import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ErrorPage from "next/error";
import Image from "next/image";
import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  auxillaryImages: {
    textAlign: "center",
  },
}));

export default function Product(props) {
  const { error, product } = props,
    router = useRouter(),
    classes = useStyles(),
    //image to be displayed on main
    [mainImage, setMainImage] = useState(product.image),
    //quantity of product being ordered
    [qty, setQty] = useState(1),
    //variations of product being ordered
    [variations, setVariations] = useState(null);

  //Add to cart function
  const handleAddToCart = () => {
    router.push(`/cart/${router.query}?qty=${qty}?`);
  };

  if (error) {
    return <ErrorPage statusCode={error} />;
  }

  return (
    <section>
      <Container>
        <Grid container>
          <Grid item xs={12} md={6}>
            <div>
              <Image src={mainImage} width={500} height={500} />
            </div>
            {/* if auxillary images are present render them */}
            {product.auxillaryImages.length && (
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

              {/* if description is present render description */}
              {product.description && (
                <Typography variant="body2">{product.description}</Typography>
              )}

              <Typography>{product.price}</Typography>

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
                  <MapVariations variations={product.variations} />
                </div>
              )}
              {/* if in stock show quantity and add to cart button */}
              {product.countInStock > 0 && (
                <>
                  <div>
                    <Typography>Qty: </Typography>
                    <select value={qty} onBlur={(e) => setQty(e.target.value)}>
                      {/* convert count in stock to array and iterate of keys so that user cannot select more than amount in stock */}
                      {[...Array(product.countInStock).keys()].map((x) => {
                        return (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        );
                      })}
                    </select>
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
  );
}

Product.propTypes = {
  error: PropTypes.number,
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    countInStock: PropTypes.string.isRequired,
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
  const { variations } = props;

  return variations.map((item) => {
    return (
      <>
        <Typography>{item.title}</Typography>
        <select>
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
};

export async function getServerSideProps(context) {
  const { category, title } = context.params;
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/products/${category}/${title}`
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
      },
    };
  }
}
