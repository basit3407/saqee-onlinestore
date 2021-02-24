import {
  Container,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import Top from "../components/checkout/Top";
import Customer from "../components/checkout/Customer";
import Shipping from "../components/checkout/Shipping";

export const useStyles = makeStyles((theme) => ({
  avatar: {
    "&.MuiAvatar-colorDefault": {
      backgroundColor: theme.palette.secondary.dark,
    },
    width: theme.spacing(3),
    height: theme.spacing(3),

    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(2),
      height: theme.spacing(2),
    },
    margin: "1% 0",
  },
  stepHeader: {
    marginLeft: "5%",
  },
  editButton: {
    "&.MuiButtonBase-root": {
      textTransform: "none",
    },
    marginTop: "4%",
    paddingLeft: 0,
  },
  email: {
    marginTop: "2%",
  },
  icon: {
    fontSize: "1rem",
  },
  shipping: {
    margin: "0 5%",
  },
}));
export default function Checkout() {
  const theme = useTheme(),
    matches = useMediaQuery(theme.breakpoints.down("sm")),
    [editClicked, setEditClicked] = useState({
      customer: false,
      shipping: false,
      payment: false,
    });

  const handleClick = (event) => {
    const name = event.currentTarget.getAttribute("name");
    setEditClicked({ ...editClicked, [name]: !editClicked[name] });
  };
  return (
    <>
      <Top matches={matches} />
      <section>
        <Container>
          <Grid container>
            <Grid
              component={Box}
              display={{ xs: "block", md: "none" }}
              container
              item
              xs={12}
            ></Grid>
          </Grid>
          <Customer
            editClicked={editClicked.customer}
            handleClick={handleClick}
            matches={matches}
          />
          <Shipping
            editClicked={editClicked.shipping}
            handleClick={handleClick}
            matches={matches}
          />
          <Grid
            component={Box}
            display={{ xs: "none", md: "block" }}
            container
            item
            xs={12}
            md={3}
          ></Grid>
        </Container>
      </section>
    </>
  );
}
