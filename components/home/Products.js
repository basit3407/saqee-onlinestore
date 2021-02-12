import { Card, Grid, makeStyles, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "10% 0",
    boxShadow: "none",
  },
  gridItem: {
    "& :hover": {
      "& $img": {
        transform: `scale3d(1.1,1.1,1)`,
      },
    },
  },
  imgDiv: {
    overflow: "hidden",
    position: "relative",
  },
  img: {
    width: "110%",
    transition: "transform 4000ms",
    WebkitTransition: "transform 4000ms",
    MozTransition: "transform 4000ms",
    msTransition: "transform 4000ms",
  },
  overlay: {
    position: "absolute",
    left: "30%",
    bottom: "25%",
  },
  button: {
    marginTop: "7%",
    borderRadius: 0,
  },
  buttonColor: {
    background: `linear-gradient(to right,${theme.palette.secondary.light} 50%,transparent 50%) right`,
    border: `1px solid ${theme.palette.secondary.light}`,
    backgroundSize: "200%",
    transition: "all 0.2s",
    WebkitTransition: "all 0.2s",
    MozTransition: "all 0.2s",
    msTransition: "all 0.2s",
    "&:hover": {
      backgroundPosition: "left",
    },
  },
}));

export default function Beauty() {
  const classes = useStyles();
  return (
    <Card id="beauty" classes={{ root: classes.card }} component="section">
      <Grid container>
        <MapImages />
      </Grid>
    </Card>
  );
}

const MapImages = () => {
  const images = [
      { img: "lips", caption: "Lips" },
      { img: "eyes", caption: "Eyes" },
      { img: "face", caption: "Face" },
    ],
    classes = useStyles();

  return images.map((item, index) => {
    return (
      <Grid className={classes.gridItem} item xs={12} md key={index}>
        <div className={classes.imgDiv}>
          <img className={classes.img} src={`images/${item.img}.png`} alt="" />
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
    );
  });
};
