import { useState, cloneElement, Fragment } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  makeStyles,
  Toolbar,
  Link,
  useScrollTrigger,
  Container,
  Grid,
  Typography,
  Hidden,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: theme.palette.secondary.dark,
  },
  root: {
    margin: theme.spacing(2, 0),
  },
  sideGridItem: {
    "&:hover": {
      "& $item": {
        color: theme.palette.secondary.main,
      },
    },
  },
  //For nested hover to work we need to create empty class of child item
  item: {},
  bigMenu: {
    textAlign: "center",
  },
  menuLink: {
    margin: theme.spacing(1),
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  cart: {
    textAlign: "right",
  },
  menuPaper: {
    backgroundColor: theme.palette.secondary.light,
    maxHeight: "calc(100% - 96px)",
  },
}));

export default function NavBar() {
  const classes = useStyles(),
    [anchorEl, setAnchorEl] = useState(null),
    open = Boolean(anchorEl),
    theme = useTheme(),
    matches = useMediaQuery(theme.breakpoints.down("sm")),
    handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    },
    handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <>
      <ElevationScroll>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            <Container>
              <Grid className={classes.root} container>
                <Grid item xs className={classes.sideGridItem}>
                  <Hidden implementation="css" smDown>
                    <Sides icon={SearchIcon} text="search" />
                  </Hidden>
                  <Hidden implementation="css" mdUp>
                    <IconButton
                      color="primary"
                      edge="start"
                      onClick={handleMenu}
                    >
                      <MenuIcon />
                    </IconButton>

                    <Menu
                      anchorEl={anchorEl}
                      getContentAnchorEl={null}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{ vertical: -30, horizontal: "center" }}
                      keepMounted
                      open={open}
                      onClose={handleClose}
                      classes={{ paper: classes.menuPaper }}
                    >
                      {/* for rcvng the ref from menu we add div */}
                      <div>
                        <Map element={MenuItem} />
                      </div>
                    </Menu>
                  </Hidden>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    align="center"
                    variant={matches ? "h6" : "h4"}
                    color="primary"
                  >
                    Saqees Online Store
                  </Typography>
                </Grid>
                <Grid
                  style={{ textAlign: "right" }}
                  className={classes.sideGridItem}
                  item
                  xs
                >
                  <Sides icon={ShoppingCartIcon} text="cart" />
                </Grid>
                <Grid
                  display={{ xs: "none", md: "block" }}
                  component={Box}
                  className={classes.bigMenu}
                  item
                  xs={12}
                >
                  <Map element={Fragment} />
                </Grid>
              </Grid>
            </Container>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar className={classes.toolbar} />
    </>
  );
}

const Sides = (props) => {
  const classes = useStyles(),
    Icon = props.icon,
    text = props.text;

  return (
    <>
      <Icon className={classes.item} color="primary" />
      <Typography
        variant="caption"
        className={classes.item}
        color="primary"
        display="block"
      >
        {text}
      </Typography>
    </>
  );
};

Sides.propTypes = {
  icon: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

const Map = (props) => {
  const Element = props.element,
    classes = useStyles(),
    sections = [
      { title: "BODY CARE PRODUCTS", href: "/" },
      { title: "SKINCARE", href: "/about" },
      { title: "OUTFITS", href: "/services" },
      { title: "FOOTWEAR", href: "/gallery" },
    ];

  return sections.map((item, index) => {
    return (
      <Element key={index}>
        <Link
          underline="none"
          variant="button"
          className={classes.menuLink}
          href={item.href}
        >
          {item.title}
        </Link>
      </Element>
    );
  });
};

Map.propTypes = {
  element: PropTypes.elementType.isRequired,
};

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};
