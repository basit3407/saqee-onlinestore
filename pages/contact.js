import {
  Card,
  Grid,
  TextField,
  Container,
  makeStyles,
  Box,
  Typography,
  Divider,
  Link,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "5% 0",
  },
  root: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
      border: "1px solid #ccc",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #ccc",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #ccc",
    },
  },
  button: {
    borderRadius: 0,
    backgroundColor: theme.palette.secondary.dark,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  info: {
    color: "rgb(0,0,0,0.87)",
    margin: "5% 0",
    padding: "5%",
  },
  email: {
    margin: "5% 0",
    padding: "5% 0",
  },
}));
export default function Contact() {
  const classes = useStyles();
  return (
    <Card elevation={0} classes={{ root: classes.card }} component="section">
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography display="block" align="center" variant="h6">
              CONTACT US
            </Typography>
          </Grid>
          <Grid item component={Box} md display={{ xs: "none", md: "block" }}>
            <Info />
          </Grid>
          <Grid item xs={12} md={9}>
            <form>
              <TextField
                variant="outlined"
                margin="normal"
                placeholder="Name"
                size="small"
                fullWidth
                className={classes.root}
              />
              <TextField
                variant="outlined"
                margin="normal"
                placeholder="Email"
                className={classes.root}
                size="small"
                fullWidth
              />

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                placeholder="Phone (optional)"
                className={classes.root}
                size="small"
              />

              <TextField
                variant="outlined"
                margin="normal"
                placeholder="Message"
                multiline
                size="small"
                className={classes.root}
                rows="10"
                fullWidth
              />
              <Button variant="contained" classes={{ root: classes.button }}>
                <Typography variant="button">send message</Typography>
              </Button>
            </form>
          </Grid>
          <Grid
            item
            component={Box}
            xs={12}
            display={{ xs: "block", md: "none" }}
          >
            <Info />
          </Grid>
        </Grid>
      </Container>
    </Card>
  );
}

const Info = () => {
  const classes = useStyles();

  return (
    <div className={classes.info}>
      <div className={classes.email}>
        <Typography display="block" variant="body1">
          <strong>Email:</strong>
        </Typography>
        <Typography display="block" variant="body2">
          {"you can also email your quiries at \n"}

          <Link color="inherit" underline="always" href="mailto:@test.com">
            test@test.com
          </Link>
        </Typography>
      </div>
      <Divider />
      <div className={classes.email}>
        <Typography display="block" variant="body1">
          <strong>Mobile:</strong>
        </Typography>
        <Typography display="block" variant="body2">
          {"you can call us at \n #########"}
        </Typography>
      </div>
    </div>
  );
};
