import { useState } from "react";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";

// eslint-disable-next-line no-unused-vars
import axios from "axios";

// eslint-disable-next-line no-unused-vars
const useStylyes = makeStyles((theme) => ({
  root: {},
  addProduct: {},

  product: {},
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
      auxImagesQty: 0,
      variationsQty: 0,
    }),
    [error, setError] = useState(false); //error on submission if

  const categories = [
    "Garments",
    "Cosmetics",
    "Handbags",
    "Other",
    "Little Ones",
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
      ...(name === "title" && { image: `image/${value}` }), //set image based on title
      ...(name === "auxImagesQty" &&
        value > 0 && {
          auxImages: [...Array(parseInt(value)).keys()].map(
            (auxImageIndex) => `auxImage/${auxImageIndex + 1}` //set auxImages in an Array if present
          ),
        }),
      ...(name === "variationsQty" &&
        value > 0 && { variations: Array(parseInt(value)) }), //create array of variations if present
    }));
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
            prop !== "category" &&
            prop !== "image" ? (
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
            <TextField
              key={index}
              SelectProps={{ native: true }}
              fullWidth
              margin="normal"
              select
            >
              {categories.map((category, index) => {
                return <option key={index}>{category}</option>;
              })}
            </TextField>
          ) : (
            prop === "variations" &&
            product.variations &&
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
      <div></div>
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
    </div>
  );
}
