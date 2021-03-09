import {
  Avatar,
  Box,
  Grid,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useStyles } from "../../pages/checkout";
import { isEmpty } from "../../validation/product";
import validate from "../../validation/shippingDetails";

export default function Shipping(props) {
  const classes = useStyles(),
    {
      matches,
      editClicked,
      handleClick,
      isDone,
      handleSubmit,
      shippingDetails,
      handleChange,
    } = props,
    { name, number, address, address2, city, postalCode } = shippingDetails,
    [errors, setErrors] = useState({});

  //reset errors if present when shipping section is closed
  useEffect(() => {
    !editClicked.shipping && !isEmpty(errors) && setErrors({});
  }, [editClicked.shipping]);

  return (
    <>
      <Grid item xs={4}>
        <Box display="flex" alignItems="center">
          <Avatar classes={{ root: classes.avatar }}>
            {isDone ? ( //if shipping is done show tick,else show number
              <DoneIcon classes={{ root: classes.icon }} />
            ) : (
              "2"
            )}
          </Avatar>
          <Typography
            classes={{ root: classes.stepHeader }}
            variant={matches ? "body1" : "h6"}
          >
            Shipping
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        {!editClicked.shipping && (
          <Typography
            variant={matches ? "body2" : "body1"}
            classes={{ root: classes.email }}
            align={matches ? "center" : "left"}
          >
            {address},{city}
          </Typography>
        )}
      </Grid>
      <Grid item xs={2}>
        {!editClicked.customer && //dont show edit button of shipping when customer is open
          !editClicked.shipping && (
            <Button
              name="shipping"
              onClick={handleClick}
              classes={{ root: classes.editButton }}
            >
              <Typography variant="caption">Edit</Typography>
            </Button>
          )}
      </Grid>

      <Grid
        classes={{
          root: editClicked.shipping ? classes.show : classes.collapse,
        }}
        item
        xs={12}
      >
        <div className={classes.body}>
          <Typography classes={{ root: classes.shipping }} display="block">
            Shipping Address
          </Typography>
          <form className={classes.form}>
            <div className={classes.textFieldDiv}>
              <TextField
                onChange={handleChange}
                name="name"
                fullWidth
                variant="outlined"
                label="Name"
                classes={{ root: classes.textField }}
                value={name}
              />
              {errors.name && (
                <span className={classes.error}>{errors.name}</span>
              )}
            </div>
            <div className={classes.textFieldDiv}>
              <TextField
                onChange={handleChange}
                name="number"
                fullWidth
                label="Phone Number"
                variant="outlined"
                classes={{ root: classes.textField }}
                value={number}
              />
              {errors.number && (
                <span className={classes.error}>{errors.number}</span>
              )}
            </div>
            <div className={classes.textFieldDiv}>
              <TextField
                onChange={handleChange}
                name="address"
                variant="outlined"
                classes={{ root: classes.textField }}
                fullWidth
                label="Address"
                value={address}
              />
              {errors.address && (
                <span className={classes.error}>{errors.address}</span>
              )}
            </div>
            <div className={classes.textField}>
              <TextField
                onChange={handleChange}
                variant="outlined"
                label="Address Line 2 (optional)"
                name="address2"
                fullWidth
                value={address2}
              />
            </div>
            <Grid container classes={{ root: classes.city }}>
              <Grid item xs={12} sm={6}>
                <div className={classes.cityDiv}>
                  <TextField
                    onChange={handleChange}
                    classes={{ root: classes.textField }}
                    fullWidth
                    variant="outlined"
                    label="City"
                    value={city}
                    name="city"
                    placeholder="City"
                  />
                </div>
                {errors.city && (
                  <div className={classes.error}>{errors.city}</div>
                )}
              </Grid>
              <Grid item xs={12} sm>
                <TextField
                  onChange={handleChange}
                  classes={{ root: classes.textField }}
                  fullWidth
                  variant="outlined"
                  name="postalCode"
                  label="Postal Code"
                  value={postalCode}
                  type="number"
                />
                <div>
                  {errors.postalCode && (
                    <div className={classes.error}>{errors.postalCode}</div>
                  )}
                </div>
              </Grid>
            </Grid>
            <TextField
              select
              variant="outlined"
              fullWidth
              SelectProps={{ native: true }}
              className={classes.textField}
              label="Country"
              name="country"
            >
              <option>Pakistan</option>
            </TextField>
            <div className={classes.buttonDiv}>
              <Button
                onClick={(event) => {
                  //check validation
                  const { errors, isValid } = validate(shippingDetails);
                  if (!isValid) return setErrors(errors);
                  //if no errors save to localStorage for future and submit
                  localStorage.setItem(
                    "shippingDetails",
                    JSON.stringify(shippingDetails)
                  );
                  handleSubmit(event);
                }}
                name="shipping"
                classes={{ root: classes.button }}
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      </Grid>
    </>
  );
}

Shipping.propTypes = {
  isDone: PropTypes.bool.isRequired,
  matches: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  editClicked: PropTypes.shape({
    customer: PropTypes.bool,
    shipping: PropTypes.bool,
  }),
  shippingDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    address2: PropTypes.string,
    city: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
  }),
};
