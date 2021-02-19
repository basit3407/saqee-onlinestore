import { Grid, makeStyles, Typography, Button } from "@material-ui/core";
import FadeIn from "../FadeIn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFemale,
  faDove,
  faAward,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faReadme } from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  section: {
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
    textAlign: "center",
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
    <section className={classes.section}>
      <Grid container>
        <FadeIn timeout={1000}>
          <Grid item xs={12} md>
            <img className={classes.img} src="images/home/about.png" alt="" />
          </Grid>
        </FadeIn>
        <FadeIn timeout={2000}>
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
                Saqee&apos;s Online Store is an independent online shopping
                brand created for female shopping lovers across the world. Our
                product range includes garments,cruelty-free beauty
                products,handbags, kitchenware and collection for babies. our
                mission is to ensure the availablity of good quality products at
                affordable prices to all the women.
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
    </section>
  );
}

const MapIcons = (props) => {
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

  return array.map((item, index) => {
    return (
      <FadeIn key={index} timeout={2000}>
        <Grid item xs>
          <div className={classes.iconDiv}>
            <FontAwesomeIcon icon={item.icon} className={classes.icon} />
            <Typography
              display="block"
              color="inherit"
              align="center"
              variant="caption"
              noWrap
            >
              {item.desc}
            </Typography>
          </div>
        </Grid>
      </FadeIn>
    );
  });
};

MapIcons.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.object.isRequired,
      desc: PropTypes.string.isRequired,
    })
  ),
};
