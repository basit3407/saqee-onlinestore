import { Fragment, useState } from "react";
import { Button, makeStyles, TextField } from "@material-ui/core";
// eslint-disable-next-line no-unused-vars
import axios from "axios";

// eslint-disable-next-line no-unused-vars
const useStylyes = makeStyles((theme) => ({
  root: {},
  quantity: {},
  products: {},
  product: {},
  values: {},
}));

export default function AddProducts() {
  const classes = useStylyes();
  //states
  const [qty, setQty] = useState(1), //qty of products to be added
    [products, setProducts] = useState([]), //products after details are entered
    // eslint-disable-next-line no-unused-vars
    [error, setError] = useState(false); //error on submission if any

  const productDetails = [
    "title",
    "price",
    "category",
    "countInStock",
    "description",
    "brand",
    "image",
    "auxImagesQty",
    "auxImages",
    "variationsQty",
    "variations",
  ];

  //For handling change in textFields
  const handleChange = (event, productIndex) => {
    const { name, value } = event.target;

    let items = products;
    items[productIndex][name] = value;
    setProducts(items);
  };

  const handleSubmit = (event, productIndex, variationIndex) => {
    const { id } = event.target;
    if (id === "quantity") return setQty(event.target[0].value);
    //else
    const data = new FormData(event.target);
    event.preventDefault();

    if (id === `product${productIndex}title${variationIndex}`) {
      let title, number;
      for (const [key, value] of data.entries())
        if (key === "title") title = value;
        else number = value;
      let items = products;
      items[productIndex].variation[variationIndex] = {
        title: title,
        values: Array(number),
      };
      return setProducts(items);
    }
    //else
    for (const [key, value] of data.entries()) {
      let items = products;
      items[productIndex].variation[variationIndex].values[key] = value;
      setProducts(items);
    }
  };

  // axios
  //   .post("http://localhost3000/api/products", productDetails)
  //   .catch(() => setError(true));

  return (
    <div className={classes.root}>
      <div className={classes.quantity}>
        <form id="quantity" onSubmit={handleSubmit}>
          <TextField
            type="number"
            name="productsQty"
            label="Products Quantity"
            fullWidth
            margin="normal"
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
      <div className={classes.products}>
        {qty > 0 &&
          [...Array(qty).keys()].map((productIndex) => {
            return (
              <div className={classes.product} key={productIndex + 1}>
                {productDetails.map((detail, index) => {
                  return detail !== "auxImages" &&
                    detail !== "variations" &&
                    detail !== "image" ? (
                    <TextField
                      key={index}
                      name={detail}
                      onChange={(event) => handleChange(event, productIndex)}
                      fullWidth
                      margin="normal"
                    />
                  ) : (
                    detail === "variations" &&
                      products[productIndex].variationQty > 0 &&
                      [
                        ...Array(products[productIndex].variationQty).keys(),
                      ].map((variationIndex) => {
                        return (
                          <Fragment key={variationIndex + 1}>
                            <form
                              onSubmit={(event) =>
                                handleSubmit(
                                  event,
                                  productIndex,
                                  variationIndex
                                )
                              }
                              id={`product${productIndex}title${variationIndex}`}
                            >
                              <TextField name={`title`} />
                              <TextField name={`values`} />
                              <Button type="submit">submit</Button>
                            </form>
                            <form
                              id={`product${productIndex}values${variationIndex}`}
                              onSubmit={(event) =>
                                handleSubmit(
                                  event,
                                  productIndex,
                                  variationIndex
                                )
                              }
                            >
                              {products[productIndex].variation[
                                variationIndex
                              ].values.map((value, index) => {
                                return <TextField name={index} key={index} />;
                              })}
                              <Button type="submit">submit</Button>
                            </form>
                          </Fragment>
                        );
                      })
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
}
