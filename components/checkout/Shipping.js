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
import { useDispatch } from "react-redux";
import { useStyles } from "../../pages/checkout";
import validate from "../../validation/shippingDetails";
import { saveShippingDetails } from "../../actions/cartActions";

export default function Shipping(props) {
  const classes = useStyles(),
    dispatch = useDispatch(),
    { matches, editClicked, handleClick, isDone, handleSubmit } = props,
    [details, setDetails] = useState({
      name: "",
      number: "",
      address: "",
      address2: "",
      city: "",
      postalCode: "",
      country: "",
    }),
    { name, number, address, address2, city, postalCode, country } = details,
    [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setDetails({ ...details, [name]: value });
  };

  return (
    <Grid container item xs={12} md={9}>
      <Grid item xs={4}>
        <Box display="flex" alignItems="center">
          <Avatar classes={{ root: classes.avatar }}>
            {isDone.shipping ? ( //if shipping is done show tick,else show number
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
      <Grid item xs={6}></Grid>
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
              <select name="country" onChange={handleChange} value={country}>
                <option>Pakistan</option>
              </select>
            </div>

            <Button
              onClick={(event) => {
                //check validation
                const { errors, isValid } = validate(details);
                //if valid submit form else show errors
                if (isValid) {
                  dispatch(saveShippingDetails(details));
                  handleSubmit(event);
                } else setErrors(errors);
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
};
