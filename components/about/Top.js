import {
  Card,
  Grid,
  makeStyles,
  Typography,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(10),
    boxShadow: "none",
  },
}));
export default function Top() {
  const classes = useStyles();
  return (
    <Card className={classes.card} component="section">
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6">
              We take the buisness of beauty very seriously. We deal in skin
              care, clothings and footwear products for females. Our skin care
              products are clean and cruelty-free.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Card>
  );
}
