import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useState } from "react";
import { validateEmail } from "../../validation/email";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "50%",
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,

      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          border: "2px solid #ccc",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.secondary.dark,
        },
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "2px solid #ccc",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.dark,
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: theme.palette.secondary.dark,
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    boxShadow: `3px 3px 0 ${theme.palette.secondary.dark}`,
    borderRadius: 0,
    background: `linear-gradient(to right,rgb(115 210 230), rgb(247 235 97) 40%) right`,
    transition: "all 0.2s ease",
    WebkitTransition: "all 0.2s ease",
    msTransition: "all 0.2s ease",
    MozTransition: "all 0.2s ease",
    backgroundSize: "200%",
    "&:hover": {
      backgroundPosition: "left",
      boxShadow: `3px 3px 0 ${theme.palette.secondary.dark}`,
    },
  },
  error: {
    color: theme.palette.error.main,
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState();
  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => setEmail(event.target.value);

  const handleClick = (e) => {
    if (!validateEmail(email))
      return setErrors("Please enter valid email address");
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`/api/forgot`, { email })
      .then((res) => {
        setMessage(res.data.message);
        setErrors();
      })
      .catch((e) => setErrors(e.response.data.error))
      .finally(() => setIsLoading(false));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Typography>Please enter your email address</Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          type="email"
          value={email}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleClick}
          className={classes.submit}
        >
          Reset Password
        </Button>
        {isLoading && <Typography variant="caption">Sending...</Typography>}
        {!isLoading && !errors && message && <Typography>{message}</Typography>}
        {!isLoading && errors && <div className={classes.error}>{errors}</div>}
      </div>
    </Container>
  );
}
