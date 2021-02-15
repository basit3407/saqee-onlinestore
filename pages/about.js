import {
  Grid,
  makeStyles,
  Typography,
  Container,
  Box,
} from "@material-ui/core";
import FadeIn from "../components/FadeIn";

const useStyles = makeStyles((theme) => ({
  section: {
    marginTop: "5%",
  },
  topDiv: {
    textAlign: "center",
    marginBottom: "7%",
  },
  topHeading: {
    marginBottom: theme.spacing(3),
  },
  img: {
    width: "100%",
  },
  typoDiv: {
    margin: "15%",
    textAlign: "center",
    padding: "5%",
  },
}));
export default function About() {
  const classes = useStyles();
  return (
    <section className={classes.section}>
      <Container>
        <Grid container>
          <FadeIn timeout={1000}>
            <Grid item xs={12}>
              <div className={classes.topDiv}>
                <Typography classes={{ root: classes.topHeading }} variant="h4">
                  WHAT DEFINES US
                </Typography>
                <Typography variant="body1">
                  At SaqeeOnlineStore we take the buisness of beauty very
                  seriously. We deal in skin care, clothings and footwear
                  products for females. Our skin care products are clean and
                  cruelty-free.
                </Typography>
              </div>
            </Grid>
          </FadeIn>
          <FadeIn timeout={1000}>
            <Grid item xs={12} md={6}>
              <img
                className={classes.img}
                alt=""
                src="images/about/heart.png"
              />
            </Grid>
          </FadeIn>
          <FadeIn timeout={2000}>
            <Grid item xs={12} md>
              <div className={classes.typoDiv}>
                <Typography classes={{ root: classes.topHeading }} variant="h4">
                  OUR MISSION
                </Typography>
                <Typography variant="body1">
                  As a woman-led indie brand, we&apos;re passionate about
                  providing easy to use, functional products you’ll want to use
                  every single day.The company was founded with the purpose of
                  providing high quality products with an affordable price tag,
                  but without ever compromising on ethics.
                </Typography>
              </div>
            </Grid>
          </FadeIn>
          <FadeIn timeout={1000}>
            <Grid
              component={Box}
              item
              xs={12}
              display={{ xs: "block", md: "none" }}
            >
              <img
                className={classes.img}
                alt=""
                src="images/about/cruelty-free.png"
              />
            </Grid>
          </FadeIn>
          <FadeIn timeout={2000}>
            <Grid xs={12} item md={6}>
              <div className={classes.typoDiv}>
                <Typography classes={{ root: classes.topHeading }} variant="h4">
                  CLEAN AND CRUELTY FREE
                </Typography>
                <Typography variant="body1">
                  All our products are cruelty free, safe and free from over
                  1,300 harmful substances you don&apos;t want on your skin or
                  body. We partner with the most responsible suppliers and
                  follow the strict standards for skincare safety.
                </Typography>
              </div>
            </Grid>
          </FadeIn>
          <FadeIn timeout={1000}>
            <Grid
              component={Box}
              item
              display={{ xs: "none", md: "block" }}
              md={6}
            >
              <img
                className={classes.img}
                alt=""
                src="images/about/cruelty-free.png"
              />
            </Grid>
          </FadeIn>
        </Grid>
      </Container>
    </section>
  );
}
