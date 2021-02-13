import {
  Card,
  Grid,
  makeStyles,
  Typography,
  Container,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "5%",
    boxShadow: "none",
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
export default function Top() {
  const classes = useStyles();
  return (
    <Card className={classes.card} component="section">
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.topDiv}>
              <Typography classes={{ root: classes.topHeading }} variant="h4">
                WHAT DEFINES US
              </Typography>
              <Typography variant="body1">
                At SaqeeOnlineStore we take the buisness of beauty very
                seriously. We deal in skin care, clothings and footwear products
                for females. Our skin care products are clean and cruelty-free.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img className={classes.img} alt="" src="images/about/heart.png" />
          </Grid>
          <Grid item xs={12} md>
            <div className={classes.typoDiv}>
              <Typography classes={{ root: classes.topHeading }} variant="h4">
                OUR MISSION
              </Typography>
              <Typography variant="body1">
                As a woman-led indie brand, we’re passionate about providing
                easy to use, functional products you’ll want to use every single
                day.The company was founded with the purpose of providing high
                quality products with an affordable price tag, but without ever
                compromising on ethics.
              </Typography>
            </div>
          </Grid>
          <Grid
            component={Box}
            item
            xs={12}
            display={{ xs: "block", md: "none" }}
            md
          >
            <img
              className={classes.img}
              alt=""
              src="images/about/cruelty-free.png"
            />
          </Grid>
          <Grid xs={12} md={6}>
            <div className={classes.typoDiv}>
              <Typography classes={{ root: classes.topHeading }} variant="h4">
                CLEAN AND CRUELTY FREE
              </Typography>
              <Typography variant="body1">
                All our products are cruelty free, safe and free from over 1,300
                harmful substances you don&apos;t want on your skin or body. We
                partner with the most responsible suppliers and follow the
                strict standards for skincare safety.
              </Typography>
            </div>
          </Grid>
          <Grid
            component={Box}
            item
            xs={12}
            display={{ xs: "none", md: "block" }}
            md
          >
            <img
              className={classes.img}
              alt=""
              src="images/about/cruelty-free.png"
            />
          </Grid>
        </Grid>
      </Container>
    </Card>
  );
}
