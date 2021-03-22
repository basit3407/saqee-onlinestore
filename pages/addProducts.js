import { useState } from "react";
import {
  Button,
  Container,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import ImageUpload from "../components/ImageUpload";
import Top from "../components/layout/Top";

const useStylyes = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "2px solid #ccc",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.dark,
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: theme.palette.secondary.dark,
    },
  },
  addProduct: {},
  error: {
    color: theme.palette.error.main,
  },
  product: {},
  upload: {
    margin: theme.spacing(1),
  },
}));

export default function AddProducts() {
  const classes = useStylyes();
  //states

  const [product, setProduct] = useState({
      title: "",
      brand: "",
      description: "",
      category: "",
      price: 1000,
      countInStock: 10,
      image: "",
      auxImagesQty: 0,
      variationsQty: 0,
    }),
    [error, setError] = useState({}); //error on submission if

  const categories = [
    "garments",
    "cosmetics",
    "handbags",
    "other",
    "little Ones",
  ];

  //For handling change in textFields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevValue) => ({
      ...prevValue,
      [name]:
        name === "variationsQty" ||
        name === "auxImagesQty" ||
        name === "price" ||
        name === "countInStock"
          ? parseInt(value) || value //convert to integer for number type inputs,guard for Nan on empty space
          : value,
      ...(name === "auxImagesQty" &&
        value > 0 && {
          auxImages: Array(parseInt(value)), //create an array of aux images if present
        }),
      ...(name === "variationsQty" &&
        value > 0 && { variations: Array(parseInt(value)) }), //create array of variations if present
    }));
  };

  // //Assing names of auxImages
  // const handleAuximages = (event, auxImageIndex) => {
  //   const { value } = event.target;
  //   setProduct((prevVal) => {
  //     const { auxImages } = prevVal;
  //     return {
  //       ...prevVal,
  //       auxImages: [
  //         ...auxImages.slice(0, auxImageIndex),
  //         value,
  //         ...auxImages.slice(auxImageIndex + 1),
  //       ],
  //     };
  //   });
  // };

  //Assign titles of variations and define the number of values for each variation
  const handleVariations = (event, variationIndex) => {
    const { name, value } = event.target;
    setProduct((prevValue) => {
      const { variations } = prevValue,
        variation = variations[variationIndex];
      return {
        ...prevValue,
        variations: [
          ...variations.slice(0, variationIndex),
          {
            ...variation,
            [name]:
              name === "title" ? value : value > 0 && Array(parseInt(value)),
          },
          ...variations.slice(variationIndex + 1),
        ],
      };
    });
  };

  //   Assign values of variations
  const handleVariationValues = (event, variationIndex, valueIndex) => {
    const { value } = event.target;
    setProduct((prevValue) => {
      const { variations } = prevValue,
        variation = variations[variationIndex],
        { values } = variation;
      return {
        ...prevValue,
        variations: [
          ...variations.slice(0, variationIndex),
          {
            ...variation,
            values: [
              ...values.slice(0, valueIndex),
              value,
              ...values.slice(valueIndex + 1),
            ],
          },
          ...variations.slice(variationIndex + 1),
        ],
      };
    });
  };

  return (
    <>
      <Top heading="Add Product" />
      <div className={classes.root}>
        <Container>
          <div className={classes.product}>
            {Object.keys(product).map((prop, index) => {
              return prop !== "auxImages" &&
                prop !== "variations" &&
                prop !== "category" &&
                prop !== "image" ? (
                <div key={index}>
                  <TextField
                    onChange={handleChange}
                    variant="outlined"
                    name={prop}
                    type={
                      prop === "variationsQty" ||
                      prop === "auxImagesQty" ||
                      prop === "price" ||
                      prop === "countInStock"
                        ? "number"
                        : "text"
                    }
                    label={
                      prop === "brand" || prop === "description"
                        ? prop.charAt(0).toUpperCase() +
                          prop.slice(1).toLowerCase() +
                          " (optional)"
                        : prop.charAt(0).toUpperCase() +
                          prop.slice(1).toLowerCase()
                    }
                    fullWidth
                    value={product[prop]}
                    multiline={prop === "description" ? true : false}
                    rows={3}
                    rowsMax={20}
                    margin="normal"
                  />
                  {error[prop] && (
                    <div className={classes.error}>{error[prop]}</div>
                  )}
                </div>
              ) : prop === "category" ? (
                <div key={index}>
                  <TextField
                    variant="outlined"
                    label={
                      prop.charAt(0).toUpperCase() + prop.slice(1).toLowerCase()
                    }
                    select
                    fullWidth
                    onChange={handleChange}
                    value={product[prop]}
                    name={prop}
                  >
                    {categories.map((category, index) => {
                      return (
                        <MenuItem key={index} value={category}>
                          {category}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                  {error[prop] && (
                    <div className={classes.error}>{error[prop]}</div>
                  )}
                </div>
              ) : prop === "auxImages" ? (
                [...product.auxImages.keys()].map((auxImageIndex) => {
                  return (
                    <div key={auxImageIndex + 1}>
                      <Typography>
                        Auxillary Image {auxImageIndex + 1}
                      </Typography>
                      <TextField
                        onChange={(event) =>
                          handleAuximages(event, auxImageIndex)
                        }
                        fullWidth
                        margin="normal"
                        variant="outlined"
                      />
                    </div>
                  );
                })
              ) : (
                prop === "variations" &&
                [...product.variations.keys()].map((variationIndex) => {
                  return (
                    <div key={variationIndex + 1}>
                      <Typography>Variation {variationIndex + 1}</Typography>
                      <TextField
                        name="title"
                        fullWidth
                        label="Title"
                        margin="normal"
                        variant="outlined"
                        onChange={(event) =>
                          handleVariations(event, variationIndex)
                        }
                      />
                      <TextField
                        name="values"
                        type="number"
                        label="Number of values"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={(event) =>
                          handleVariations(event, variationIndex)
                        }
                      />
                      {product.variations[variationIndex] &&
                        product.variations[variationIndex].values &&
                        [
                          ...product.variations[variationIndex].values.keys(),
                        ].map((valueIndex) => {
                          return (
                            <TextField
                              key={valueIndex + 1}
                              fullWidth
                              variant="outlined"
                              value={
                                product.variations[variationIndex].values[
                                  valueIndex
                                ]
                              }
                              margin="normal"
                              onChange={(event) =>
                                handleVariationValues(
                                  event,
                                  variationIndex,
                                  valueIndex
                                )
                              }
                            />
                          );
                        })}
                    </div>
                  );
                })
              );
            })}
          </div>

          <div className={classes.upload}>
            <div className={classes.upload}>
              <Typography>Main Image</Typography>
              <ImageUpload category={product.category} />

              {product.auxImages &&
                product.auxImages.length > 0 &&
                product.auxImages.map((auxImage, index) => {
                  return (
                    <div key={index}>
                      {auxImage && (
                        <div>
                          <Typography>Auxillary Image {index + 1}</Typography>
                          <ImageUpload category={product.category} />
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <Button
              onClick={() => {
                axios
                  .post("http://localhost:3000/api/products", {
                    ...product,
                    //save image url for main and aux images
                    image: product.image
                      ? `/images/${product.category}/${product.image}`
                      : "",
                    ...(product.auxImages &&
                      product.auxImages.length > 0 && {
                        auxImages: product.auxImages.map(
                          (auxImage) => `images/${product.category}/${auxImage}`
                        ),
                      }),
                  })
                  .then(() => setError({}))
                  .catch((e) => setError(e.response.data));
              }}
            >
              Dispatch Product
            </Button>
          </div>

          {error.server && (
            <span className={classes.error}>{error.server}</span>
          )}
        </Container>
      </div>
    </>
  );
}
