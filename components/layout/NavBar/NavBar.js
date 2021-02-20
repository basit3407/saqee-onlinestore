/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState, Fragment, useEffect, useRef } from "react";
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
  InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";
import { SearchPopover, ShoppingMenu } from "./extended";

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
    cursor: "pointer",
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
  const mainMenuItems = [
      { title: "Home", href: "/" },
      { title: "SHOP", href: "#" },
      { title: "CONTACT US", href: "/contact" },
      { title: "ABOUT US", href: "/about" },
    ],
    classes = useStyles(),
    //for using toolbar as anchor point for search popover and menu
    divRef = useRef(),
    //anchor for search popover
    [anchorSearch, setAnchorSearch] = useState(null),
    //anchor for main menu in small screens
    [anchorMenu, setAnchorMenu] = useState(null),
    //anchor for shopping menu
    [anchorShopping, setAnchorShopping] = useState(null),
    //for opening search bar popever
    openSearch = Boolean(anchorSearch),
    //for opening main menu in small screens
    openMenu = Boolean(anchorMenu),
    //for opening shopping menu
    openShopping = Boolean(anchorShopping),
    theme = useTheme(),
    matches = useMediaQuery(theme.breakpoints.down("sm")),
    handleMenu = (event) => {
      const { id } = event.currentTarget;
      if (id === "menu") return setAnchorMenu(divRef.current);
      setAnchorSearch(divRef.current);
    },
    handleClose = () => {
      setAnchorMenu(null);
      setAnchorSearch(null);
      setAnchorShopping(null);
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
        <Toolbar ref={divRef} className={classes.toolbar}>
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

                  {/* main menu in small screen */}
                  <Menu
                    anchorEl={anchorMenu}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    //important for custom position of anchor origin
                    getContentAnchorEl={null}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    keepMounted
                    open={openMenu}
                    onClose={handleClose}
                    classes={{ paper: classes.menuPaper }}
                    //important for keeping menu to full left
                    marginThreshold={0}
                  >
                    <MenuItem>
                      {/* searchbar in small screen */}
                      <SearchBar handleClose={handleClose} />
                    </MenuItem>
                    <MapMenu
                      handleClose={handleClose}
                      matches={matches}
                      element={MenuItem}
                      menuItems={mainMenuItems}
                    />
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
                //hide main menu of big screen on smaller screens
                display={{ xs: "none", md: "block" }}
                component={Box}
                className={classes.bigMenu}
                item
                xs={12}
              >
                <MapMenu
                  setAnchorShopping={setAnchorShopping}
                  divRef={divRef}
                  matches={matches}
                  element={Fragment}
                  menuItems={mainMenuItems}
                />
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>

      {/* search popover */}
      <SearchPopover
        anchorSearch={anchorSearch}
        openSearch={openSearch}
        handleClose={handleClose}
      />
      {/* shopping Menu */}
      <ShoppingMenu
        anchorShopping={anchorShopping}
        openShopping={openShopping}
        handleClose={handleClose}
        matches={matches}
      />
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

export const MapMenu = (props) => {
  const Element = props.element,
    { matches, handleClose, setAnchorShopping, divRef, menuItems } = props,
    classes = useStyles();

  return menuItems.map((item, index) => {
    return (
      <Element key={index}>
        <Link
          onClick={handleClose}
          underline="none"
          variant="button"
          className={classes.menuLink}
          href={item.href}
          //open shopping menu when hovered on SHOP in bigscreen only
          onMouseOver={() =>
            item.title === "SHOP" && setAnchorShopping(divRef.current)
          }
          color={matches ? "inherit" : "primary"}
        >
          {item.title}
        </Link>
      </Element>
    );
  });
};

MapMenu.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
  element: PropTypes.elementType.isRequired,
  divRef: PropTypes.object,
  matches: PropTypes.bool,
  setAnchorShopping: PropTypes.func,
  handleClose: PropTypes.func,
};

export const SearchBar = (props) => {
  const classes = useStyles(),
    { handleClose } = props;
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClose();
            e.target.value = "";
          }
        }}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </div>
  );
};

SearchBar.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
