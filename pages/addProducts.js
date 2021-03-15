import { useState, useEffect } from "react";
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
  const [isClicked, setisClicked] = useState(false), //click state of add product button
    [product, setProduct] = useState({
      title: "",
      brand: "",
      description: "",
      category: "",
      price: "",
      countInstock: "",
      auxImagesQty: 0,
      variationsQty: 0,
    }), //product after details are entered
    // eslint-disable-next-line no-unused-vars
    [error, setError] = useState(false); //error on submission if any

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
    console.log("handle change test");
    setProduct(
      name === "variationsQty" ||
        name === "auxImagesQty" ||
        name === "price" ||
        name === "countInStock"
        ? { ...product, [name]: parseInt(value) || value }
        : { ...product, [name]: value }
    );
  };

  // //add image based on title
  // useEffect(() =>
  //   setProduct({
  //     ...product,
  //     image: `image/${product.title}`,
  //   })
  // ),
  //     [product.title];

  //   //add auxillary images if present based on title
  //   useEffect(
  //     () =>
  //       product.title &&
  //       product.auxImagesQty > 0 &&
  //       setProduct({
  //         ...product,
  //         auxImages: [...Array(product.auxImagesQty).keys()].map(
  //           (auxImageIndex) => `${product.title}auxImage${auxImageIndex}`
  //         ),
  //       })
  //   ),
  //     [product.auxImagesQty, product.title];

  //   create array of variations when variation qty is greater than 0
  useEffect(
    () =>
      product.variationsQty > 0 &&
      !product.variations &&
      product.variations.length !== product.variationsQty &&
      setProduct({
        ...product,
        variations: Array(parseInt(product.variationsQty)),
      })
  ),
    [product.variationsQty];

  //Assign variations
  const handleVariations = (event, variationIndex) => {
    console.log("handle variations test");
    const { name, value } = event.target,
      { variations } = product,
      variation = variations[variationIndex];
    setProduct({
      ...product,
      variations: [
        ...variations.slice(0, variationIndex),
        {
          ...variation,
          [name]:
            name === "title"
              ? value
              : value
              ? Array(parseInt(value))
              : undefined,
        },
        ...variations.slice(variationIndex + 1),
      ],
    });
  };

  //   Assign values of variations
  const handleVariationValues = (event, variationIndex, valueIndex) => {
    const { value } = event.target,
      { variations } = product,
      variation = variations[variationIndex],
      { values } = variation;
    setProduct({
      ...product,
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
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.addProduct}>
        <Button onClick={() => setisClicked(true)}>Add Product</Button>{" "}
      </div>
      {isClicked && (
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
      )}
    </div>
  );
}

// axios
//   .post("http://localhost3000/api/products", productDetails)
//   .catch(() => setError(true));
