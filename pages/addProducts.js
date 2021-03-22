import { useState } from "react";
import {
  Button,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

// eslint-disable-next-line no-unused-vars
import axios from "axios";
import ImageUpload from "../components/ImageUpload";

// eslint-disable-next-line no-unused-vars
const useStylyes = makeStyles((theme) => ({
  root: {},
  addProduct: {},

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
      countInstock: 10,
      image: "",
      auxImagesQty: 0,
      variationsQty: 0,
    }),
    [error, setError] = useState(false); //error on submission if

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

  //Assing names of auxImages
  const handleAuximages = (event, auxImageIndex) => {
    const { value } = event.target;
    setProduct((prevVal) => {
      const { auxImages } = prevVal;

      return {
        ...prevVal,
        auxImages: [
          ...auxImages.slice(0, auxImageIndex),
          value,
          ...auxImages.slice(auxImageIndex + 1),
        ],
      };
    });
  };

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
    <div className={classes.root}>
      <div className={classes.product}>
        {Object.keys(product).map((prop, index) => {
          return prop !== "auxImages" &&
            prop !== "variations" &&
            prop !== "category" ? (
            <TextField
              onChange={handleChange}
              key={index}
              name={prop}
              type={
                prop === "variationsQty" ||
                prop === "auxImagesQty" ||
                prop === "price" ||
                prop === "countInStock"
                  ? "number"
                  : "text"
              }
              label={prop}
              fullWidth
              value={product[prop]}
              margin="normal"
            />
          ) : prop === "category" ? (
            <Select
              key={index}
              label={prop}
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
            </Select>
          ) : prop === "auxImages" ? (
            [...product.auxImages.keys()].map((auxImageIndex) => {
              return (
                <div key={auxImageIndex + 1}>
                  <Typography>Auxillary Image {auxImageIndex + 1}</Typography>
                  <TextField
                    onChange={(event) => handleAuximages(event, auxImageIndex)}
                    fullWidth
                    margin="normal"
                  />
                </div>
              );
            })
          ) : (
            prop === "variations" &&
            [...product.variations.keys()].map((variationIndex) => {
              return (
                <div key={variationIndex + 1}>
                  <Typography>variation {variationIndex + 1}</Typography>
                  <TextField
                    name="title"
                    fullWidth
                    margin="normal"
                    onChange={(event) =>
                      handleVariations(event, variationIndex)
                    }
                  />
                  <TextField
                    name="values"
                    type="number"
                    label="number of values"
                    fullWidth
                    margin="normal"
                    onChange={(event) =>
                      handleVariations(event, variationIndex)
                    }
                  />
                  {product.variations[variationIndex] &&
                    product.variations[variationIndex].values &&
                    [...product.variations[variationIndex].values.keys()].map(
                      (valueIndex) => {
                        return (
                          <TextField
                            key={valueIndex + 1}
                            fullWidth
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
                      }
                    )}
                </div>
              );
            })
          );
        })}
      </div>
      <div>
        <Button
          onClick={() => {
            axios
              .post("http://localhost3000/api/products", product)
              .then(() => setError(false))
              .catch(() => setError(true));
          }}
        >
          Dispatch Product
        </Button>
      </div>

      {error && <span>There was some issue please try again</span>}
      <div className={classes.upload}>
        <div className={classes.upload}>
          <Typography>Main Image</Typography>
          <ImageUpload category={product.category} />
          <Typography>AuxImages</Typography>
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
    </div>
  );
}
