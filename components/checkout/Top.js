import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  headingBox: {
    borderRadius: 0,
    backgroundColor: theme.palette.secondary.light,
    margin: "5% 0",
    padding: "3% 0",
  },
}));

export default function Top(props) {
  const classes = useStyles(),
    { matches } = props;

  return (
    <section>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Container>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                classes={{ root: classes.headingBox }}
              >
                <Typography variant={matches ? "h6" : "h4"}>
                  Checkout
                </Typography>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

Top.propTypes = {
  matches: PropTypes.bool.isRequired,
};
