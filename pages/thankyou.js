import {
  Typography,
  Box,
  Button,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
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
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 7),
    },

    "&:hover": {
      backgroundPosition: "left",
      boxShadow: `3px 3px 0 ${theme.palette.secondary.dark}`,
    },
  },
  typo: {
    margin: theme.spacing(2, 0),
  },
}));
export default function Thankyou() {
  const classes = useStyles(),
    theme = useTheme(),
    matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyItems="center"
      padding={matches ? 10 : 20}
    >
      <Typography align={matches ? "center" : "left"} variant="h3">
        Thank you
      </Typography>
      <Typography
        align={matches ? "center" : "left"}
        classes={{ root: classes.typo }}
      >
        Your order will be delivered in 2 to 3 days
      </Typography>
      <Button classes={{ root: classes.button }}>
        <Typography>Explore</Typography>
      </Button>
    </Box>
  );
}
