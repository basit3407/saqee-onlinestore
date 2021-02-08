import {
  Card,
  Grid,
  makeStyles,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.secondary.light,
    paddingTop: "3%",
  },
  gridItem: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  image: {
    margin: "4% 0 0 4%",
    width: "70%",
  },
  heading: {
    marginTop: "5%",
  },
  button: {
    margin: "10% 20% 0",
  },
  buttonColor: {
    backgroundColor: theme.palette.error.main,
  },
  buttonSize: {
    padding: "2% 7%",
  },
}));

export default function Top() {
  const classes = useStyles(),
    theme = useTheme(),
    matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card elevation={0} className={classes.card} component="section">
      <Grid container>
        <Grid className={classes.gridItem} item xs={12} md>
          <img className={classes.image} src="images/homepage.jpg" alt="" />
        </Grid>
        <Grid item xs={12} md>
          <Typography
            color="textSecondary"
            classes={{ root: classes.heading }}
            variant={matches ? "h2" : "h1"}
            align={matches ? "center" : "left"}
          >
            Remain Beautiful Forever
          </Typography>
          <Typography
            classes={{ root: classes.heading }}
            color="textSecondary"
            variant={matches ? "h6" : "h4"}
            align={matches ? "center" : "left"}
          >
            Order our best sellers before someone else does
          </Typography>
          <Button
            classes={{
              root: classes.button,
              containedSecondary: classes.buttonColor,
              sizeLarge: classes.buttonSize,
            }}
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<ShoppingBasketIcon color="primary" />}
          >
            <Typography color="primary" variant="button">
              Start Shopping
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
