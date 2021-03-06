import {
  Grid,
  Box,
  Avatar,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import PropTypes from "prop-types";
import DoneIcon from "@material-ui/icons/Done";
import { useStyles } from "../../pages/checkout";
import { useState, useEffect } from "react";
import { validateEmail } from "../../validation/email";

export default function Customer(props) {
  const classes = useStyles(),
    { editClicked, handleClick, isDone, matches, handleSubmit } = props;

  const [email, setEmail] = useState();
  //validation of email
  const [inValidEmail, setinValidEmail] = useState(false);

  //on page load
  useEffect(() => {
    //if email is already saved get it,;
    const savedEmail = localStorage.getItem("email"),
      email = savedEmail || "";
    setEmail(email);
  }, []);

  return (
    <>
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
        {!editClicked && (
          <Typography
            variant={matches ? "body2" : "body1"}
            classes={{ root: classes.email }}
            align={matches ? "center" : "left"}
          >
            {email}
          </Typography>
        )}
      </Grid>
      <Grid item xs={2}>
        {!editClicked && (
          <Button
            onClick={handleClick}
            name="customer"
            classes={{ root: classes.editButton }}
          >
            <Typography variant="caption">Edit</Typography>
          </Button>
        )}
      </Grid>
      <Grid
        item
        classes={{
          root: editClicked ? classes.show : classes.collapse,
        }}
        xs={12}
      >
        <div className={classes.body}>
          <Typography display="block">
            Checking out as a <strong>Guest</strong>? You&apos;ll be able to
            save your details to create an account with us later.
          </Typography>
          <Typography classes={{ root: classes.emailAddress }} display="block">
            Email Address:
          </Typography>
          <TextField
            fullWidth
            placeholder="Email"
            variant="outlined"
            type="email"
            classes={{ root: classes.textField }}
            value={email ? email : ""}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* if invalid email show error */}
          {inValidEmail && (
            <span className={classes.error}>
              Please enter valid email address
            </span>
          )}
          <div className={classes.buttonDiv}>
            <Button
              name="customer"
              classes={{ root: classes.button }}
              onClick={(e) => {
                //email validation
                if (!validateEmail(email)) return setinValidEmail(true);
                localStorage.setItem("email", email);
                handleSubmit(e);
                //remove error of email validation if present
                inValidEmail && setinValidEmail(false);
              }}
            >
              Continue as Guest
            </Button>
          </div>
          <Typography>
            Already have an account ? <Button href="/login">Sign in now</Button>
          </Typography>
        </div>
      </Grid>
    </>
  );
}

Customer.propTypes = {
  editClicked: PropTypes.bool,
  isDone: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  matches: PropTypes.bool.isRequired,
};
