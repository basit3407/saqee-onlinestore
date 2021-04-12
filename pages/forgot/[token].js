import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Copyright } from "../login";

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

export default function Reset() {
  const classes = useStyles();
  const router = useRouter();
  const { message, status, email, token } = router.query;
  const [requestMessage, setRequestMessage] = useState();
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
    const { password, confirm } = loginDetails;
    if (password !== confirm) return setErrors("passwords donot match");
    setIsLoading(true);

    e.preventDefault();
    axios
      .put(`/api/password`, { email, password, token })
      .then((res) => {
        setErrors();
        setRequestMessage(res.data.message);
      })
      .catch((e) => setErrors(e.response.data.error))
      .finally(() => {
        setIsLoading(false);
        setIsDone(true);
      });
  };

  if (status === "done") {
    if (!isDone)
      return (
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
              variant="contained"
              color="primary"
              onClick={handleClick}
              className={classes.submit}
            >
              Reset Password
            </Button>
            {isLoading && <Typography variant="caption">Loading...</Typography>}
            {!isLoading && errors && (
              <div className={classes.error}>{errors}</div>
            )}
          </form>
        </div>
      );
    if (errors) return <div className={classes.error}>{errors}</div>;
    return <Typography>{requestMessage}</Typography>;
  }

  return (
    <div className={classes.root}>
      <Typography> {message}</Typography>
      <Button classes={{ root: classes.submit }} href="/forgot">
        Resend
      </Button>
      <Box mt={8}>
        <Copyright />
      </Box>
    </div>
  );

  // return (
  //   <Container component="main" maxWidth="xs">
  //     {status === "done" ? (
  //       !isDone ? (
  //         <div className={classes.paper}>
  //           <Avatar className={classes.avatar}>
  //             <LockOutlinedIcon />
  //           </Avatar>
  //           <Typography component="h1" variant="h5">
  //             Reset Password
  //           </Typography>
  //           <form className={classes.form} noValidate>
  //             <TextField
  //               variant="outlined"
  //               margin="normal"
  //               required
  //               fullWidth
  //               label="Password"
  //               name="password"
  //               type="password"
  //               value={loginDetails.password}
  //               onChange={handleChange}
  //             />
  //             <TextField
  //               variant="outlined"
  //               margin="normal"
  //               required
  //               fullWidth
  //               name="confirm"
  //               label="Confirm Password"
  //               type="password"
  //               value={loginDetails.confirm}
  //               onChange={handleChange}
  //             />
  //             <Button
  //               type="submit"
  //               fullWidth
  //               variant="contained"
  //               color="primary"
  //               onClick={handleClick}
  //               className={classes.submit}
  //             >
  //               Reset Password
  //             </Button>
  //             {isLoading && (
  //               <Typography variant="caption">Loading...</Typography>
  //             )}
  //             {!isLoading && errors && (
  //               <div className={classes.error}>{errors}</div>
  //             )}
  //           </form>
  //         </div>
  //       ) : (
  //         !isLoading && (
  //           <>
  //             <Typography>{requestMessage}</Typography>
  //             {errors && <div className={classes.error}>{errors}</div>}
  //           </>
  //         )
  //       )
  //     ) : (
  //   <div className={classes.root}>
  //     <Typography> {message}</Typography>
  //     <Button classes={{ root: classes.submit }} href="/forgot">
  //       Resend
  //     </Button>
  //   </div>
  // )}

  // </Container>
  // );
}
