import { Typography, Button, makeStyles, Container } from "@material-ui/core";
import Layout from "../components/layout";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    margin: "50% 0",
  },
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
  const classes = useStyles();

  return (
    <Layout>
      <Container maxWidth="xs">
        <div className={classes.root}>
          <Typography display="block" variant="h3">
            Thank you
          </Typography>
          <Typography classes={{ root: classes.typo }} display="block">
            Your order will be delivered in 2 to 3 days
          </Typography>
          <div>
            <Button href="/" classes={{ root: classes.button }}>
              <Typography>Explore</Typography>
            </Button>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
