import { useEffect, useState } from "react";
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
import Layout from "../components/layout";
import { useUser } from "../lib/hooks";
import { useRouter } from "next/router";
import { validateEmail } from "../validation/email";

const useStylyes = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,

      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.secondary.dark,
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "2px solid #ccc",
      },
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
    "& .MuiFormLabel-root.Mui-focused": {
      color: theme.palette.secondary.dark,
    },

    "& .MuiButton-root": {
      boxShadow: `3px 3px 0 ${theme.palette.secondary.dark}`,
      borderRadius: 0,
      background: `linear-gradient(to right,rgb(115 210 230), rgb(247 235 97) 40%) right`,
      transition: "all 0.2s ease",
      WebkitTransition: "all 0.2s ease",
      msTransition: "all 0.2s ease",
      MozTransition: "all 0.2s ease",
      backgroundSize: "200%",

      "&.MuiButton-text": {
        padding: theme.spacing(1, 7),
      },

      "&:hover": {
        backgroundPosition: "left",
        boxShadow: `3px 3px 0 ${theme.palette.secondary.dark}`,
      },
      margin: theme.spacing(1, 0),
    },
    "& .MuiTypography-root": {
      margin: theme.spacing(1, 0),
    },
    marginBottom: theme.spacing(3),
  },
  productDisplay: {
    margin: theme.spacing(2, 0),
  },
  productProp: {
    margin: theme.spacing(1, 0),
    "& .MuiTypography-h6": {
      fontSize: "1rem",
    },
    // "& .MuiTypography-root": {
    //   margin: 0,
    // },
  },

  error: {
    color: theme.palette.error.main,
  },
  product: {
    marginBottom: theme.spacing(1),
  },
  upload: {
    margin: theme.spacing(3, 0),
  },
  image: {
    margin: theme.spacing(3, 0),
  },
  textField: {
    margin: theme.spacing(1, 0),
  },
  admin: {
    margin: theme.spacing(1, 0),
  },
}));

export default function Admin() {
  const classes = useStylyes();
  const initialState = {
    title: "Lawn",
    brand: "",
    description: "",
    category: "garments",
    price: 2999,
    countInStock: 10,
    image: "",
    auxImagesQty: 0,
    variationsQty: 0,
  };
  //states

  const [product, setProduct] = useState(initialState),
    [error, setError] = useState({}), //error on submission of product if any
    [uploadError, setUploadError] = useState({}), //image upload error
    [isClicked, setIsClicked] = useState({
      addProduct: false,
      addAdmin: false,
      deleteUser: false,
    }), //click state of add product button
    [email, setEmail] = useState({
      admin: "",
      delete: "",
    });

  const [user, { loading }] = useUser(); //authentication
  const router = useRouter();

  const categories = ["garments", "cosmetics", "handbags", "other", "kids"];

  const handleAdminClick = (event) => {
    const { id } = event.currentTarget;
    console.log(id);

    if (!validateEmail(email[id]))
      return setError({
        ...error,
        [`email${id}`]: "Please enter valid email address",
      });
    id === "admin"
      ? axios
          .put(`/api/user`, {
            email: email.admin,
            update: { isAdmin: true },
          })
          .then(() => {
            setIsClicked({ ...isClicked, addAdmin: false });
            setError({ ...error, [`email${id}`]: "" });
            setEmail({ ...email, admin: "" });
          })
          .catch((e) =>
            setError({ ...error, emailadmin: e.response.data.error })
          )
      : axios
          .delete(`/api/user`, {
            data: {
              email: email.delete,
            },
          })
          .then(() => {
            setError({ ...error, [`email${id}`]: "" });
            setEmail({ ...email, delete: "" });
            setIsClicked({ ...isClicked, deleteUser: false });
          });
  };

  // redirect user to login if not admin
  useEffect(
    () => !loading && (!user || (user && !user.isAdmin)) && router.replace("/"),
    [user, loading]
  );

  // Server-render loading state
  if (loading || !user || !user.isAdmin) return <Layout>Loading...</Layout>;

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

  //This function handles click on dispatch button
  const handleClick = () =>
    axios
      .post(`/api/products`, product)
      .then(() => {
        setError({});
        setIsClicked({ ...isClicked, addProduct: false });
        setProduct(initialState);
      })
      .catch((e) => setError(e.response.data));

  return (
    <Layout>
      <Top heading="Admin Panel" />
      <div className={classes.root}>
        <Container>
          {isClicked.addProduct ? (
            <>
              <div className={classes.product}>
                {Object.keys(product).map((prop, index) => {
                  return prop !== "auxImages" &&
                    prop !== "variations" &&
                    prop !== "category" &&
                    prop !== "image" ? (
                    <div className={classes.textField} key={index}>
                      <TextField
                        onChange={handleChange}
                        variant="outlined"
                        required={
                          prop === "brand" || prop === "description"
                            ? false
                            : true
                        }
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
                    <div className={classes.textField} key={index}>
                      <TextField
                        variant="outlined"
                        label={
                          prop.charAt(0).toUpperCase() +
                          prop.slice(1).toLowerCase()
                        }
                        select
                        fullWidth
                        required
                        onChange={handleChange}
                        value={product[prop]}
                        margin="normal"
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
                  ) : (
                    prop === "variations" &&
                    [...product.variations.keys()].map((variationIndex) => {
                      return (
                        <div
                          className={classes.variations}
                          key={variationIndex + 1}
                        >
                          <Typography>
                            Variation {variationIndex + 1}
                          </Typography>
                          <TextField
                            name="title"
                            fullWidth
                            label="Title"
                            required
                            margin="normal"
                            variant="outlined"
                            onChange={(event) =>
                              handleVariations(event, variationIndex)
                            }
                          />
                          {error.variations &&
                            error.variations[variationIndex] && (
                              <div className={classes.error}>
                                {error.variations[variationIndex].title}
                              </div>
                            )}
                          <TextField
                            name="values"
                            type="number"
                            label="Number of values"
                            required
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            onChange={(event) =>
                              handleVariations(event, variationIndex)
                            }
                          />
                          {error.variations &&
                            error.variations[variationIndex] &&
                            !Array.isArray(
                              error.variations[variationIndex].values
                            ) && (
                              <div className={classes.error}>
                                {error.variations[variationIndex].values}
                              </div>
                            )}
                          {product.variations[variationIndex] &&
                            product.variations[variationIndex].values &&
                            [
                              ...product.variations[
                                variationIndex
                              ].values.keys(),
                            ].map((valueIndex) => {
                              return (
                                <div key={valueIndex + 1}>
                                  <TextField
                                    fullWidth
                                    label={`Value ${valueIndex + 1}`}
                                    required
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
                                  {error.variations &&
                                    error.variations[variationIndex] &&
                                    Array.isArray(
                                      error.variations[variationIndex].values
                                    ) && (
                                      <div className={classes.error}>
                                        {
                                          error.variations[variationIndex]
                                            .values[valueIndex]
                                        }
                                      </div>
                                    )}
                                </div>
                              );
                            })}
                          {error.variations &&
                            typeof error.variations[variationIndex] !==
                              "object" && (
                              <div className={classes.error}>
                                {error.variations[variationIndex]}
                              </div>
                            )}
                        </div>
                      );
                    })
                  );
                })}
              </div>
              <div className={classes.upload}>
                <div className={classes.image}>
                  <Typography>Main Image</Typography>
                  <ImageUpload
                    id="image"
                    setProduct={setProduct}
                    setUploadError={setUploadError}
                    uploadError={uploadError}
                    category={product.category}
                  />
                  <Typography>Uploaded Image: {product.image}</Typography>
                  {error.image && (
                    <div className={classes.error}>{error.image}</div>
                  )}
                  {uploadError.image && (
                    <div className={classes.error}>{uploadError.image}</div>
                  )}
                </div>
                {product.auxImages &&
                  [...product.auxImages.keys()].map((auxImageIndex) => {
                    return (
                      <div className={classes.image} key={auxImageIndex + 1}>
                        <Typography>
                          Auxillary Image {auxImageIndex + 1}
                        </Typography>
                        <ImageUpload
                          category={product.category}
                          auxImageIndex={auxImageIndex}
                          setProduct={setProduct}
                          setUploadError={setUploadError}
                          uploadError={uploadError}
                          id="auxImages"
                        />
                        <Typography>
                          Uploaded Image: {product.auxImages[auxImageIndex]}
                        </Typography>
                        {error.auxImages && (
                          <div className={classes.error}>
                            {error.auxImages[auxImageIndex]}
                          </div>
                        )}
                        {uploadError[`auxImages${auxImageIndex}`] && (
                          <div className={classes.error}>
                            {uploadError[`auxImages${auxImageIndex}`]}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
              <div className={classes.productDisplay}>
                {Object.keys(product).map((prop, index) => {
                  return (
                    <div className={classes.productProp} key={index + 1}>
                      <Typography
                        variant="h6"
                        display={
                          prop === "auxImages" ||
                          prop === "variations" ||
                          prop === "description"
                            ? "block"
                            : "inline"
                        }
                      >
                        {prop}:
                      </Typography>{" "}
                      {prop === "auxImages" ? (
                        <div>
                          {product.auxImages.map((auxImage, auxImageIndex) => {
                            return (
                              <div key={auxImageIndex + 1}>
                                <Typography display="inline">
                                  {`auxillary Image ${auxImageIndex + 1}`}:{" "}
                                </Typography>
                                <Typography display="inline">
                                  {auxImage}
                                </Typography>
                              </div>
                            );
                          })}
                        </div>
                      ) : prop === "variations" ? (
                        <div>
                          {product.variations.map(
                            (variation, variationIndex) => {
                              return (
                                <div key={variationIndex + 1}>
                                  <Typography>
                                    Variation {variationIndex + 1}:
                                  </Typography>
                                  <Typography>{variation.title}</Typography>
                                  <Typography display="inline">
                                    values:{" "}
                                  </Typography>
                                  {variation.values &&
                                    variation.values.map(
                                      (value, valueIndex) => {
                                        return (
                                          <Typography
                                            display="inline"
                                            key={valueIndex + 1}
                                          >
                                            {value},{" "}
                                          </Typography>
                                        );
                                      }
                                    )}
                                </div>
                              );
                            }
                          )}
                        </div>
                      ) : (
                        <Typography
                          classes={{ root: classes.productDisplayTypo }}
                          style={{ whiteSpace: "pre-line" }}
                          display="inline"
                        >
                          {product[prop]}
                        </Typography>
                      )}
                    </div>
                  );
                })}
              </div>
              <Button onClick={handleClick}>Dispatch Product</Button>
              {error.server && (
                <div className={classes.error}>{error.server}</div>
              )}
            </>
          ) : (
            <>
              <Button
                onClick={() => setIsClicked({ ...isClicked, addProduct: true })}
              >
                Add Product
              </Button>
            </>
          )}
          {!isClicked.addAdmin ? (
            <div>
              <Button
                onClick={() => setIsClicked({ ...isClicked, addAdmin: true })}
              >
                Add Admin
              </Button>
            </div>
          ) : (
            <div className={classes.admin}>
              <TextField
                placeholder="Email"
                variant="outlined"
                type="email"
                value={email.admin}
                onChange={(e) =>
                  setEmail((prevVal) => ({
                    ...prevVal,
                    admin: e.target.value,
                  }))
                }
              />

              <div className={classes.buttonDiv}>
                <Button
                  name="customer"
                  classes={{ root: classes.button }}
                  onClick={handleAdminClick}
                  id="admin"
                >
                  Make Admin
                </Button>
                {error.emailadmin && (
                  <div className={classes.error}>{error.emailadmin}</div>
                )}
              </div>
            </div>
          )}
          {!isClicked.deleteUser ? (
            <div>
              <Button
                onClick={() => setIsClicked({ ...isClicked, deleteUser: true })}
              >
                Delete User
              </Button>
            </div>
          ) : (
            <div className={classes.admin}>
              <TextField
                placeholder="Email"
                variant="outlined"
                type="email"
                value={email.delete}
                onChange={(e) =>
                  setEmail((prevVal) => ({
                    ...prevVal,
                    delete: e.target.value,
                  }))
                }
              />

              <div className={classes.buttonDiv}>
                <Button
                  name="customer"
                  classes={{ root: classes.button }}
                  onClick={handleAdminClick}
                  id="delete"
                >
                  Delete User
                </Button>
                {error.emaildelete && (
                  <div className={classes.error}>{error.emaildelete}</div>
                )}
              </div>
            </div>
          )}
        </Container>
      </div>
    </Layout>
  );
}
