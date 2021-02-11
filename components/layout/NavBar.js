/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  makeStyles,
  fade,
  Toolbar,
  Link,
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
  Popover,
  InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  "@keyframes blinker": {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },

  top: {
    background: `linear-gradient(to right,#f08ccd 0,#8cd0e3 100%)`,
  },

  topText: {
    animationName: "$blinker",
    animationDuration: "2s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  toolbar: {
    backgroundColor: theme.palette.secondary.dark,
  },
  root: {
    marginTop: theme.spacing(1),
  },
  sideGridItem: {
    display: "inline-block",
    "&:hover": {
      "& $item": {
        color: theme.palette.secondary.main,
      },
      cursor: "pointer",
    },
    marginTop: theme.spacing(1),
  },
  //For nested hover to work we need to create empty class of child item
  item: {},
  bigMenu: {
    textAlign: "center",
  },
  logo: { width: "150px" },
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
    width: "100%",
    marginLeft: theme.spacing(0),
  },
  searchPaper: {
    backgroundColor: theme.palette.secondary.light,
    width: "90%",
    maxWidth: "unset",
    marginLeft: theme.spacing(0),
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: "20px auto",
    width: "50%",

    [theme.breakpoints.down("xs")]: {
      width: "75%",
    },
  },
  inputRoot: {
    color: theme.palette.secondary.dark,
    margin: "0 auto",
    textAlign: "center",
    display: "block",
  },
  inputInput: {
    padding: theme.spacing(2, 2, 2, 0),
    display: "block",
  },
  headingNavbar: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1),
    },
  },
}));

export default function NavBar() {
  const classes = useStyles(),
    [open, setOpen] = useState(false),
    [open1, setOpen1] = useState(false),
    theme = useTheme(),
    matches = useMediaQuery(theme.breakpoints.down("sm")),
    handleMenu = (event) => {
      const { id } = event.currentTarget;
      if (id === "menu") return setOpen(true);
      setOpen1(true);
    },
    handleClose = () => {
      setOpen(false);
      setOpen1(false);
    };

  return (
    <>
      <div className={classes.top}>
        <Typography
          classes={{ root: classes.topText }}
          align="center"
          color="primary"
          variant="subtitle2"
        >
          Free delivery over order of PKR 2500
        </Typography>
      </div>
      <AppBar position="sticky">
        <Toolbar className={classes.toolbar}>
          <Container>
            <Grid className={classes.root} spacing={1} container>
              <Grid item xs>
                <Hidden implementation="css" smDown>
                  <div
                    id="search"
                    onClick={handleMenu}
                    className={classes.sideGridItem}
                  >
                    <Sides matches={matches} icon={SearchIcon} text="search" />
                  </div>
                </Hidden>
                <Hidden implementation="css" mdUp>
                  <IconButton
                    color="primary"
                    edge="start"
                    onClick={handleMenu}
                    id="menu"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Popover
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 110, left: 0 }}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    keepMounted
                    open={open1}
                    onClose={handleClose}
                    classes={{ paper: classes.searchPaper }}
                    PaperProps={{ elevation: 0 }}
                  >
                    <SearchBar />
                  </Popover>

                  <Menu
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 65, left: 0 }}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    classes={{ paper: classes.menuPaper }}
                  >
                    <MenuItem>
                      <SearchBar />
                    </MenuItem>
                    <Map matches={matches} element={MenuItem} />
                  </Menu>
                </Hidden>
              </Grid>
              <Grid className={classes.bigMenu} item xs={8}>
                <img className={classes.logo} src="images/logo.png" alt="" />
              </Grid>
              <Grid style={{ textAlign: "right" }} item xs>
                <Link href="#" underline="none">
                  <div className={classes.sideGridItem}>
                    <Sides
                      matches={matches}
                      icon={ShoppingCartIcon}
                      text="cart"
                    />
                  </div>
                </Link>
              </Grid>
              <Grid
                display={{ xs: "none", md: "block" }}
                component={Box}
                className={classes.bigMenu}
                item
                xs={12}
              >
                <Map matches={matches} element={Fragment} />
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}

const Sides = (props) => {
  const classes = useStyles(),
    Icon = props.icon,
    { text, matches } = props;

  return (
    <>
      <Icon
        className={classes.item}
        fontSize={matches ? "small" : "large"}
        color="primary"
      />
      <Typography
        variant="caption"
        className={classes.item}
        color="primary"
        display="block"
        align="center"
      >
        {text}
      </Typography>
    </>
  );
};

Sides.propTypes = {
  icon: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  matches: PropTypes.bool.isRequired,
};

const Map = (props) => {
  const Element = props.element,
    { matches } = props,
    classes = useStyles(),
    sections = [
      { title: "BODY CARE PRODUCTS", href: "/" },
      { title: "SKINCARE", href: "#beauty" },
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
          color={matches ? "inherit" : "primary"}
        >
          {item.title}
        </Link>
      </Element>
    );
  });
};

Map.propTypes = {
  element: PropTypes.elementType.isRequired,
  matches: PropTypes.bool.isRequired,
};

const SearchBar = () => {
  const classes = useStyles();
  useEffect(() => {
    const names = document.getElementsByName("input");
    names.forEach((item) => {
      item.focus();
    });
  });

  return (
    <div className={classes.search}>
      <InputBase
        placeholder="What are you looking for ?"
        name="input"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </div>
  );
};
