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
    padding: "5% 0",
  },

  gridItem1: {
    [theme.breakpoints.up("md")]: {
      paddingRight: "15%",
    },
  },

  img: {
    width: "100%",
  },
}));

export default function BodyCare() {
  const classes = useStyles();

  return (
    <Card classes={{ root: classes.card }} component="section">
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
      <Grid item xs={12} md key={index}>
        <Grid className={classes.gridItem} item xs={12} md key={index}>
          <div className={classes.imgDiv}>
            <img
              className={classes.img}
              src={`images/${item.img}.png`}
              alt=""
            />
            <div className={classes.overlay}>
              <Typography display="block" variant="h4">
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
                <Typography variant="button">view products</Typography>
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    );
  });
};
