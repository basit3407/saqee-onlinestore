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
import { useState } from "react";
import { useStyles } from "../../pages/checkout";
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

  return (
    <Grid container item xs={12} md={9}>
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
        <Box display={editClicked ? "none" : "block"}>
          <Typography
            variant={matches ? "body2" : "body1"}
            classes={{ root: classes.email }}
            align={matches ? "center" : "left"}
          >
            {address},
            {city.charAt[0].toUpperCase() + city.slice(1).toLowerCase()}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={2}>
        {isDone && ( //only show edit button of if done
          <Box display={editClicked ? "none" : "block"}>
            <Button
              name="shipping"
              onClick={handleClick}
              classes={{ root: classes.editButton }}
            >
              <Typography variant="caption">Edit</Typography>
            </Button>
          </Box>
        )}
      </Grid>

      <Grid
        classes={{ root: editClicked ? classes.show : classes.collapse }}
        item
        xs={12}
      >
        <div className={classes.shipping}>
          <Typography display="block" variant="h6">
            Shipping Address
          </Typography>
          <form>
            <TextField
              onChange={handleChange}
              name="name"
              fullWidth
              placeholder="Name"
              value={name}
            />
            {errors.name && (
              <span className={classes.error}>{errors.name}</span>
            )}
            <TextField
              onChange={handleChange}
              name="number"
              fullWidth
              placeholder="Number"
              value={number}
            />
            {errors.number && (
              <span className={classes.error}>{errors.number}</span>
            )}
            <TextField
              onChange={handleChange}
              name="address"
              fullWidth
              placeholder="Addres Line1"
              value={address}
            />
            {errors.address && (
              <span className={classes.error}>{errors.address}</span>
            )}
            <TextField
              onChange={handleChange}
              name="address2"
              fullWidth
              placeholder="Addres Line2(optional)"
              value={address2}
            />
            <TextField
              onChange={handleChange}
              value={city}
              name="city"
              placeholder="City"
            />
            {errors.city && (
              <span className={classes.error}>{errors.city}</span>
            )}
            <TextField
              onChange={handleChange}
              name="postalCode"
              placeholder="Postal Code"
              value={postalCode}
            />
            {errors.postalCode && (
              <span className={classes.error}>{errors.postalCode}</span>
            )}
            <div>
              <Typography>Country:</Typography>
              {/* eslint-disable-next-line jsx-a11y/no-onchange */}
              <select name="country">
                <option>Pakistan</option>
              </select>
            </div>

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
                errors && setErrors({}); //remove errors on success
              }}
              variant="contained"
              name="shipping"
            >
              Continue
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

Shipping.propTypes = {
  editClicked: PropTypes.bool.isRequired,
  isDone: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  matches: PropTypes.bool.isRequired,
  shippingDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    address2: PropTypes.string,
    city: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
  }),
  handleChange: PropTypes.func.isRequired,
};
