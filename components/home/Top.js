import {
  Card,
  Grid,
  makeStyles,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Fade,
} from "@material-ui/core";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.secondary.light,
    paddingTop: "3%",
    height: "100vh",
  },
  containerGrid: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3),
    },
  },
  gridItem: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  image: {
    width: "75%",
  },

  buttonDiv: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
    marginBottom: "5%",
  },
  para: {
    marginTop: "5%",
  },
  button: {
    marginTop: "10%",
    borderRadius: 0,
    backgroundColor: theme.palette.error.main,
    padding: "2% 7%",
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
}));

export default function Top() {
  const classes = useStyles(),
    theme = useTheme(),
    matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card elevation={0} className={classes.card} component="section">
      <Grid container className={classes.containerGrid}>
        <Fade in timeout={1000}>
          <Grid className={classes.gridItem} item xs={12} md>
            <img className={classes.image} src="images/cosmetics.png" alt="" />
          </Grid>
        </Fade>
        <Fade in timeout={2000}>
          <Grid item xs={12} md>
            <Typography
              variant={matches ? "h4" : "h1"}
              align={matches ? "center" : "left"}
            >
              Remain Beautiful Forever
            </Typography>
            <Typography
              classes={{ root: classes.para }}
              variant={matches ? "h6" : "h4"}
              align={matches ? "center" : "left"}
            >
              Order our best sellers before someone else does
            </Typography>
            <div className={classes.buttonDiv}>
              <Button
                classes={{
                  root: classes.button,
                }}
                variant="contained"
                startIcon={<ShoppingBasketIcon color="primary" />}
                href="#bestSellers"
              >
                <Typography color="primary" variant="button">
                  Start Shopping
                </Typography>
              </Button>
            </div>
          </Grid>
        </Fade>
      </Grid>
    </Card>
  );
}
