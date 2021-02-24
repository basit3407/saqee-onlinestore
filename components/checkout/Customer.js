import {
  Grid,
  Box,
  Avatar,
  Typography,
  Button,
  Collapse,
  TextField,
  Link,
} from "@material-ui/core";
import PropTypes from "prop-types";
import DoneIcon from "@material-ui/icons/Done";
import { useStyles } from "../../pages/checkout";

export default function Customer(props) {
  const classes = useStyles(),
    { editClicked, handleClick, matches } = props;

  return (
    <Grid container item xs={12} md={9}>
      <Grid item xs={4}>
        <Box display="flex" alignItems="center">
          <Avatar classes={{ root: classes.avatar }}>
            <DoneIcon classes={{ root: classes.icon }} />
          </Avatar>
          <Typography
            classes={{ root: classes.stepHeader }}
            variant={matches ? "body1" : "h6"}
          >
            Customer
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box display={editClicked ? "none" : "block"}>
          <Typography
            variant={matches ? "body2" : "body1"}
            classes={{ root: classes.email }}
            align={matches ? "center" : "left"}
          >
            email@test.com
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box display={editClicked ? "none" : "block"}>
          <Button
            name="customer"
            onClick={handleClick}
            classes={{ root: classes.editButton }}
          >
            <Typography variant="caption">Edit</Typography>
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <div>
          <Typography display="block">
            Checking out as a <strong>Guest</strong>?You&apos;ll be able to save
            your details to create an account with us later.
          </Typography>
          <Typography display="block">Email Address</Typography>
          <TextField fullWidth />
          <div>
            <Button variant="contained" name="customer" onClick={handleClick}>
              Continue as Guest
            </Button>
          </div>
          <Typography>
            Already have an account ? <Link href="#">Sign in now</Link>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}

Customer.propTypes = {
  editClicked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  matches: PropTypes.bool.isRequired,
};
