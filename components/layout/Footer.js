import {
  Grid,
  makeStyles,
  Typography,
  Container,
  Link,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: theme.palette.secondary.dark,
    paddingBottom: theme.spacing(7),
  },
  outerDiv: {
    margin: theme.spacing(7, 0),
    color: "#343434",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        marginBottom: 0,
      },
    },
  },
  para: {
    margin: theme.spacing(1, 0),
  },
  para2: {
    margin: theme.spacing(1, 0),
    textAlign: "center",
  },
  icons: {
    margin: "5% 0",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      marginBottom: 0,
    },
  },
  icon: {
    margin: "0 3%",
  },
  copyright: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <section className={classes.section}>
      <Container>
        <Grid container>
          <Grid item xs={12} md>
            <div className={classes.outerDiv}>
              <Typography color="inherit" variant="body1">
                ABOUT THE BRAND
              </Typography>
              <Typography
                className={classes.para}
                color="inherit"
                variant="body2"
              >
                Saqee Online Store deals in glamorous, high-quality and
                cruelty-free makeup poducts along with
                clothing,handbags,kitchenware and babies collection for ladies.
                Female-founded with a mission to empower women.
              </Typography>
              <div className={classes.icons}>
                <MapIcons />
              </div>
            </div>
          </Grid>
          <Grid item xs={6} md>
            <div className={classes.outerDiv}>
              <Typography align="center" color="inherit" variant="body1">
                CONTACT
              </Typography>
              <p className={classes.para2}>
                <Link href="/contact" color="inherit" underline="none">
                  Contact us
                </Link>
              </p>
            </div>
          </Grid>
          <Grid item xs={6} md>
            <div className={classes.outerDiv}>
              <Typography align="center" color="inherit" variant="body1">
                ABOUT US
              </Typography>
              <p className={classes.para2}>
                <Link href="/about" color="inherit" underline="none">
                  Who We Are
                </Link>
              </p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography
              className={classes.copyright}
              align="center"
              variant="caption"
              display="block"
            >
              Copyright:{new Date().getFullYear()} Design and Developed by{" "}
              <Link
                underline="none"
                variant="caption"
                href="http://www.basitminhas.com"
              >
                Basit Minhas
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

const MapIcons = () => {
  const icons = [faFacebookF, faInstagram, faTwitter, faYoutube],
    classes = useStyles();

  return icons.map((item, index) => {
    return (
      <Link className={classes.icon} href="#" key={index}>
        <FontAwesomeIcon color="#343434" icon={item} />
      </Link>
    );
  });
};
