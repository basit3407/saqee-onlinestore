import {
  Grid,
  Box,
  Avatar,
  Typography,
  Button,
  TextField,
  Link,
} from "@material-ui/core";
import PropTypes from "prop-types";
import DoneIcon from "@material-ui/icons/Done";
import { useStyles } from "../../pages/checkout";
import { useState } from "react";
import { validateEmail } from "../../validation/user";

export default function Customer(props) {
  const classes = useStyles(),
    { editClicked, handleClick, isDone, matches, handleSubmit } = props;

  //if email is already saved get it,else save null;
  const savedEmail = localStorage.getItem("email"), //will be null if nothing is saved
    savedEmailExist = savedEmail,
    [email, setEmail] = useState(savedEmailExist);

  //validation of email
  const [inValidEmail, setinValidEmail] = useState(false);

  return (
    <Grid container item xs={12} md={9}>
      <Grid item xs={4}>
        <Box display="flex" alignItems="center">
          <Avatar classes={{ root: classes.avatar }}>
            {isDone ? <DoneIcon classes={{ root: classes.icon }} /> : "1"}
          </Avatar>
          <Typography
            classes={{ root: classes.stepHeader }}
            variant={matches ? "body1" : "h6"}
          >
            Customer
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
            {email}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box display={editClicked ? "none" : "block"}>
          <Button
            onClick={handleClick}
            name="customer"
            classes={{ root: classes.editButton }}
          >
            <Typography variant="caption">Edit</Typography>
          </Button>
        </Box>
      </Grid>

      <Grid
        item
        classes={{
          root: editClicked ? classes.show : classes.collapse,
        }}
        xs={12}
      >
        <div>
          <Typography display="block">
            Checking out as a <strong>Guest</strong>?You&apos;ll be able to save
            your details to create an account with us later.
          </Typography>
          <Typography display="block">Email Address</Typography>
          <TextField
            fullWidth
            placeholder="Email"
            type="email"
            value={email ? email : ""}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* if invalid email show error */}
          {inValidEmail && (
            <span className={classes.error}>
              please enter valid email address
            </span>
          )}
          <div>
            <Button
              variant="contained"
              name="customer"
              onClick={(e) => {
                // check that email is not empty.
                if (email) return setinValidEmail(true);
                //check if email format is valid.
                if (!validateEmail(email)) return setinValidEmail(true);
                //if valid then save the email in local storage.
                localStorage.setItem("email", email);
                handleSubmit(e);
              }}
            >
              Continue as Guest
            </Button>
          </div>
          <Typography>
            Already have an account ? <Link href="#">Sign in now</Link>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}

Customer.propTypes = {
  editClicked: PropTypes.bool.isRequired,
  isDone: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  matches: PropTypes.bool.isRequired,
};
