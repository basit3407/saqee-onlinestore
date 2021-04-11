import {
  Typography,
  Box,
  Button,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useStyles = makeStyles((theme) => ({
  button: {
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
    marginTop: theme.spacing(1),
    color: theme.palette.error.main,
  },
}));

export default function Email() {
  const router = useRouter();
  const { email, name } = router.query;
  const classes = useStyles();
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme(),
    matches = useMediaQuery(theme.breakpoints.down("sm"));

  const sendEmail = () =>
    axios
      .post("/api/confirm", { email, name })
      .then((res) => setMessage(res.data.success))
      .catch((e) => setError(e.response.data.error))
      .finally(() => setIsLoading(false));

  useEffect(() => (!email || !name ? router.push("/") : sendEmail()));

  const handleClick = () => sendEmail();

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Box
      p={matches ? 15 : 40}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Typography>{message}</Typography>
      {!isLoading && (
        <Button onClick={handleClick} classes={{ root: classes.button }}>
          Resend Token
        </Button>
      )}

      {error && <div className={classes.error}>{error}</div>}
    </Box>
  );
}
