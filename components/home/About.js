import { Card, Grid, makeStyles, Typography, Button } from "@material-ui/core";
import FadeIn from "../Fadein";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFemale,
  faDove,
  faAward,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faReadme } from "@fortawesome/free-brands-svg-icons";

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "none",
    margin: "5% 0",
  },
  img: {
    width: "100%",
  },
  outerDiv: {
    marginTop: "35%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "5%",
    },
  },
  para: {
    padding: "3% 5%",
  },
  iconDiv: {
    display: "inline-block",
    margin: "7% 25%",
    color: theme.palette.secondary.dark,
  },
  iconSubDiv: {
    textAlign: "center",
  },
  buttonDiv: {
    textAlign: "center",
    margin: "5% 0",
  },
  button: {
    borderRadius: 0,
    padding: "2% 10%",
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
}));

export default function About() {
  const classes = useStyles();
  return (
    <Card classes={{ root: classes.card }} id="about" component="section">
      <Grid container>
        <Grid item xs={12} md>
          <img className={classes.img} src="images/about.png" alt="" />
        </Grid>
        <FadeIn timeout={1000}>
          <Grid item xs={12} md>
            <div className={classes.outerDiv}>
              <Typography align="center" variant="h5">
                BEHIND THE BRAND
              </Typography>
              <Typography
                align="center"
                classes={{ root: classes.para }}
                variant="body1"
              >
                SaqeeOnlineStore is an independent beauty brand created for
                beauty lovers across the world. Our product range features
                exciting and cruelty-free products with innovative formulas and
                glamorous packaging that stand out with exceptionally gorgeous
                color results.
              </Typography>
              <Grid container>
                <MapIcons />
              </Grid>
              <div className={classes.buttonDiv}>
                <Button
                  classes={{
                    root: classes.button,
                  }}
                  variant="contained"
                  startIcon={<FontAwesomeIcon icon={faReadme} color="#fff" />}
                  href="/about"
                >
                  <Typography color="primary" variant="button">
                    Read more
                  </Typography>
                </Button>
              </div>
            </div>
          </Grid>
        </FadeIn>
      </Grid>
    </Card>
  );
}

const MapIcons = () => {
  const icons = [
      { icon: faFemale, desc: "Feminine" },
      {
        icon: faDove,
        desc: "Cruelty Free",
      },
      {
        icon: faAward,
        desc: "Quality",
      },
      {
        icon: faHeart,
        desc: "Honesty",
      },
    ],
    classes = useStyles();

  return icons.map((item, index) => {
    return (
      <Grid item xs key={index}>
        <div className={classes.iconDiv}>
          <div className={classes.iconSubDiv}>
            <FontAwesomeIcon icon={item.icon} className={classes.icon} />
            <Typography
              display="block"
              color="inherit"
              align="left"
              variant="caption"
              noWrap
            >
              {item.desc}
            </Typography>
          </div>
        </div>
      </Grid>
    );
  });
};
