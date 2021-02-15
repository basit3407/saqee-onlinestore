import {
  Grid,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import PropTypes from "prop-types";
import FadeIn from "../components/FadeIn";

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: "5% 0",
  },
  toolbar: {
    boxShadow: "1px 1px #dbdada,-1px -1px #dbdada",
  },
  gridButton: {
    textAlign: "right",
    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
    },
  },
  button: {
    borderLeft: "1px solid #dbdada",
    borderRadius: 0,
    width: "100%",
    padding: "7% 0",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  arrayGrid: {
    textAlign: "center",
  },
}));

export default function ProtoType(props) {
  const { heading, array } = props,
    classes = useStyles();
  return (
    <section className={classes.section}>
      <Grid container>
        <FadeIn timeout={1000}>
          <Grid item xs={12}>
            <div>
              <Container>
                <Typography
                  classes={{ root: classes.heading }}
                  align="center"
                  variant="h3"
                >
                  {heading}
                </Typography>
              </Container>
              <div className={classes.toolbar}>
                <Grid container>
                  <Grid item xs={0} sm={10}></Grid>
                  <Grid classes={{ root: classes.gridButton }} item xs={6} sm>
                    <Button classes={{ root: classes.button }}>
                      <Typography align="center" variant="button">
                        sort
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item classes={{ root: classes.gridButton }} xs={6} sm>
                    <Button classes={{ root: classes.button }}>
                      <Typography align="center" variant="button">
                        filter
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </FadeIn>
      </Grid>
      <Container>
        <Grid container>
          <MapArray heading={heading} array={array} />
        </Grid>
      </Container>
    </section>
  );
}

ProtoType.propTypes = {
  heading: PropTypes.string.isRequired,
  array: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ),
};

const MapArray = (props) => {
  const { array, heading } = props,
    classes = useStyles();

  return array.map((item, index) => {
    return (
      <FadeIn key={index} timeout={2000}>
        <Grid classes={{ root: classes.arrayGrid }} item xs={12} sm={6} md={3}>
          <div>
            <img src={`images/${heading}/${item.img}.png`} alt="" />
            <Typography variant="body1">{item.name}</Typography>
            <Typography variant="body1">{item.price}</Typography>
          </div>
        </Grid>
      </FadeIn>
    );
  });
};
