import {
  Card,
  Grid,
  makeStyles,
  Container,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    background: "linear-gradient(to bottom,#8cd0e3 0,#f08ccd 100%)",
    margin: "5% 0",
  },
  gridItem: {
    "& :hover": {
      "& $img": {
        transform: `scale3d(1.1,1.1,1)`,
      },
    },
  },
  imgDiv: {
    padding: "0 3%",
    overflow: "hidden",
    position: "relative",
  },

  img: {
    width: "95%",
    [theme.breakpoints.down("sm")]: {
      margin: "5% 0",
    },
    margin: "15% 0",
    WebkitTransition: "transform 4s",
    MozTransition: "transform 4s",
    msTransition: "transform 4s",
    transition: "transform 4s",
  },

  overlay: {
    position: "absolute",
    left: "30%",
    bottom: "15%",
  },
  button: {
    borderRadius: 0,
    marginTop: "7%",
    boxShadow: `3px 3px 0 ${theme.palette.secondary.main} `,
    "&:hover": {
      boxShadow: `3px 3px 0 ${theme.palette.secondary.main} `,
    },
  },
  buttonColor: {
    background:
      "linear-gradient(to right, rgb(140, 208, 227) 50%, rgb(240, 140, 205) 100%) left",
    backgroundSize: "200%",
    transition: "all 0.2s",
    WebkitTransition: "all 0.2s",
    MozTransition: "all 0.2s",
    msTransition: "all 0.2s",

    "&:hover": {
      backgroundPosition: "right",
    },
  },
}));

export default function BodyCare() {
  const classes = useStyles();

  return (
    <Card id="body" classes={{ root: classes.card }} component="section">
      <Container>
        <Grid container>
          <MapImages />
        </Grid>
      </Container>
    </Card>
  );
}

const MapImages = () => {
  const images = [
      { img: "perfume", caption: "Perfumes" },
      { img: "nailPolish2", caption: "Nail Paints" },
    ],
    classes = useStyles();

  return images.map((item, index) => {
    return (
      <Grid item classes={{ root: classes.gridItem }} xs={12} md key={index}>
        <Grid className={classes.gridItem} item xs={12} md key={index}>
          <div className={classes.imgDiv}>
            <img
              className={classes.img}
              src={`images/${item.img}.png`}
              alt=""
            />
            <div className={classes.overlay}>
              <Typography color="textSecondary" display="block" variant="h4">
                {item.caption}
              </Typography>

              <Button
                classes={{
                  root: classes.button,
                  containedPrimary: classes.buttonColor,
                }}
                size="large"
                variant="contained"
                color="primary"
              >
                <Typography color="textSecondary" variant="button">
                  view products
                </Typography>
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    );
  });
};
