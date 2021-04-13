import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
  },
  form: {
    marginTop: theme.spacing(1),
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
    margin: theme.spacing(1, 0),
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
  },
  error: {
    color: theme.palette.error.main,
  },
}));

export default function Reset() {
  const classes = useStyles();
  const router = useRouter();
  const { email, token } = router.query;
  const [Message, setMessage] = useState();
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loginDetails, setLoginDetails] = useState({
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginDetails((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const { password, confirm } = loginDetails;

    if (password !== confirm)
      return setErrors({ password: "passwords do not match" });
    setIsLoading(true);

    axios
      .put(`/api/password`, { email, password, token })
      .then((res) => {
        setErrors();
        setMessage(res.data.message);
      })
      .catch((e) => {
        console.log(e.response.data);
        setErrors(e.response.data);
      })
      .finally(() => {
        setIsLoading(false);
        setIsDone(true);
      });
  };

  if (isDone && !errors)
    return (
      <Container maxWidth="xs">
        <div className={classes.paper}>
          <Typography>{Message}</Typography>
          <Button classes={{ root: classes.submit }} href="/login">
            Go to Login
          </Button>
        </div>
      </Container>
    );

  if (isDone && errors && errors.error)
    return (
      <Container maxWidth="xs">
        <div className={classes.paper}>
          <div className={classes.error}>{errors.error}</div>
          <Button classes={{ root: classes.submit }} href="/forgot">
            Resend
          </Button>
        </div>
      </Container>
    );

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={loginDetails.password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm"
            label="Confirm Password"
            type="password"
            value={loginDetails.confirm}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            onClick={handleClick}
            className={classes.submit}
          >
            Reset Password
          </Button>
          {isLoading && <Typography variant="caption">Loading...</Typography>}
          {!isLoading &&
            (errors && errors.password ? (
              <div className={classes.error}>{errors.password}</div>
            ) : (
              <Typography>{Message}</Typography>
            ))}
        </form>
      </div>
    </Container>
  );
}
