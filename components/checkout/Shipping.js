import {
  Avatar,
  Box,
  Grid,
  Typography,
  Button,
  Collapse,
  TextField,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import PropTypes from "prop-types";
import { useStyles } from "../../pages/checkout";

export default function Shipping(props) {
  const classes = useStyles(),
    { matches, editClicked, handleClick } = props;
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
            Shipping
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}></Grid>
      <Grid item xs={2}>
        <Box display={editClicked ? "none" : "block"}>
          <Button
            name="shipping"
            onClick={handleClick}
            classes={{ root: classes.editButton }}
          >
            <Typography variant="caption">Edit</Typography>
          </Button>
        </Box>
      </Grid>
      {/* <Collapse timeout={400} in={editClicked}> */}
      <Grid item xs={12}>
        <div className={classes.shipping}>
          <Typography display="block" variant="h6">
            Shipping Address
          </Typography>
          <form>
            <TextField fullWidth placeholder="Name" />
            <TextField fullWidth placeholder="Addres" />
          </form>
          <Button variant="contained" name="shipping" onClick={handleClick}>
            Continue as Guest
          </Button>
        </div>
      </Grid>
      {/* </Collapse> */}
    </Grid>
  );
}

Shipping.propTypes = {
  editClicked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  matches: PropTypes.bool.isRequired,
};
