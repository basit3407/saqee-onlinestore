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
  Avatar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";
import Image from "next/image";
import axios from "axios";
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
    // display: "inline-block",
    cursor: "pointer",
    "&:hover": {
      "& $item": {
        color: theme.palette.secondary.main,
      },
    },
    border: "none",
    background: "none",
    marginTop: theme.spacing(1),
    position: "relative",
  },
  //For nested hover to work we need to create empty class of child item
  item: {},
  bigMenu: {
    textAlign: "center",
  },
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
  avatar: {
    "&.MuiAvatar-colorDefault": {
      backgroundColor: theme.palette.secondary.main,
    },
    width: "20px",
    height: "20px",
    margin: "1% 0",
    fontSize: "1rem",
    position: "absolute",
    top: 0,
    right: 0,
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(2),
      height: theme.spacing(2),
      fontSize: "12px",
    },
  },
  searchList: {
    listStyleType: "none",
  },
}));

export default function NavBar(props) {
  const mainMenuBigScreenItems = [
      { title: "Home", href: "/" },
      { title: "SHOP", href: "#" },
      { title: "CONTACT US", href: "/contact" },
      { title: "ABOUT US", href: "/about" },
    ],
    mainMenuSmallScreenItems = [
      { title: "Home", href: "/" },
      { title: "Garments", href: "/products/garments" },
      { title: "Cosmetics", href: "products/Cosmetics" },
      { title: "Handbags", href: "/products/handbags" },
      { title: "Kitchenware", href: "/products/kitchenware" },
      { title: "Little Ones", href: "/products/babies" },
      { title: "CONTACT US", href: "/contact" },
      { title: "ABOUT US", href: "/about" },
    ],
    { cartItems } = props,
    classes = useStyles(),
    divRef = useRef(), //for using toolbar as anchor point for search popover,shopping menu and small screen main menu
    theme = useTheme(),
    matches = useMediaQuery(theme.breakpoints.down("sm"));

  //states
  const [anchorSearch, setAnchorSearch] = useState(), //anchor for search popover
    [anchorMenu, setAnchorMenu] = useState(), //anchor for main menu in small screens
    [anchorShopping, setAnchorShopping] = useState(), //anchor for shopping menu
    [searchQuery, setSearchQuery] = useState(""), //saving search Query
    [searchResults, setSearchResults] = useState(); //saving search result

  //Booleans for opening menus and popovers
  const openSearch = Boolean(anchorSearch), //for opening search bar popever
    openMenu = Boolean(anchorMenu), //for opening main menu in small screens
    openShopping = Boolean(anchorShopping); //for opening shopping menu

  //Funcion for handling change in search Query
  const handleSearchQuery = (event) => setSearchQuery(event.target.value);

  //send Search Query to database and get results
  useEffect(
    () =>
      searchQuery
        ? sendSearchQuery(searchQuery).then((results) =>
            setSearchResults(results)
          )
        : setSearchResults(),
    [searchQuery]
  );

  //Function for closing search Bar
  const handleSearchClose = () => {
    setAnchorSearch();
    setSearchResults();
    setSearchQuery("");
  };

  //Function for opening Menu in small screen and SearchBar in Big Screen
  const handleMenu = (event) => {
    const { id } = event.currentTarget;
    if (id === "menu") return setAnchorMenu(divRef.current);
    setAnchorSearch(divRef.current);
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
          Free delivery over order of PKR 10,000
        </Typography>
      </div>
      <AppBar position="sticky">
        <Toolbar ref={divRef} className={classes.toolbar}>
          <Container>
            <Grid className={classes.root} spacing={1} container>
              <Grid item xs>
                <Hidden implementation="css" smDown>
                  <button
                    id="search"
                    onClick={handleMenu}
                    className={classes.sideGridItem}
                  >
                    <Sides matches={matches} icon={SearchIcon} text="search" />
                  </button>
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
                    id="mainMenu"
                    onClose={() => setAnchorMenu()}
                    classes={{ paper: classes.menuPaper }}
                    //important for keeping menu to full left
                    marginThreshold={0}
                  >
                    <MenuItem>
                      {/* searchbar in small screen */}
                      <SearchBar
                        id="small"
                        onClose={handleSearchClose}
                        searchResults={searchResults}
                        handleSearchQuery={handleSearchQuery}
                        searchQuery={searchQuery}
                      />
                    </MenuItem>
                    <MapMenu
                      textColor="textSecondary"
                      element={MenuItem}
                      menuItems={mainMenuSmallScreenItems}
                    />
                  </Menu>
                </Hidden>
              </Grid>
              <Grid className={classes.bigMenu} item xs={8}>
                <Image
                  width={matches ? 125 : 150}
                  height={matches ? 75 : 100}
                  src="/images/logo.png"
                  alt=""
                />
              </Grid>
              <Grid style={{ textAlign: "right" }} item xs>
                <Link href="/cart" underline="none">
                  <button className={classes.sideGridItem}>
                    <Sides
                      matches={matches}
                      icon={ShoppingCartIcon}
                      text="cart"
                    />
                    {Array.isArray(cartItems) && cartItems.length > 0 && (
                      <Avatar classes={{ root: classes.avatar }}>
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </Avatar>
                    )}
                  </button>
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
                  menuItems={mainMenuBigScreenItems}
                  textColor={"primary"}
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
        handleSearchClose={handleSearchClose}
        searchResults={searchResults}
        handleSearchQuery={handleSearchQuery}
        searchQuery={searchQuery}
      />
      {/* shopping Menu */}
      <ShoppingMenu
        anchorShopping={anchorShopping}
        setAnchorShopping={setAnchorShopping}
        openShopping={openShopping}
      />
    </>
  );
}

NavBar.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      variations: PropTypes.objectOf(PropTypes.object),
      qty: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      price: PropTypes.number,
    })
  ),
};

//This function is for side icons of cart and search.
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

//This function map the items for small screen menu,big screen menu and shopping menu
export const MapMenu = (props) => {
  const Element = props.element,
    { textColor, setAnchorShopping, divRef, menuItems } = props,
    classes = useStyles();
  return menuItems.map((item, index) => {
    return (
      <Element key={index}>
        <Link
          underline="none"
          variant="button"
          classes={{ root: classes.menuLink }}
          href={item.href}
          //open shopping menu when hovered on SHOP only
          onMouseOver={() =>
            item.title === "SHOP" && setAnchorShopping(divRef.current)
          }
          color={textColor}
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
  textColor: PropTypes.string.isRequired,
  setAnchorShopping: PropTypes.func,
};

//This function is for search bar
export const SearchBar = (props) => {
  const classes = useStyles(),
    { onClose, id, handleSearchQuery, searchResults, searchQuery } = props;

  //Focus the input when loaded
  useEffect(() => {
    document.getElementById(id).focus();
  });
  return (
    <div className={classes.search}>
      <InputBase
        placeholder="What are you looking for ?"
        onChange={handleSearchQuery}
        value={searchQuery}
        id={id}
        name="input"
        onKeyDown={(event) => event.key === "Enter" && onClose()}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
      {Array.isArray(searchResults) &&
        (searchResults.length > 0 ? (
          searchResults.map((item, index) => {
            return (
              <ul className={classes.searchList} key={index}>
                <li>
                  <Link
                    color="textSecondary"
                    href={`/products/${item.category}/${item._id}`}
                    underline="none"
                  >
                    {item.title}
                  </Link>
                </li>
              </ul>
            );
          })
        ) : (
          <span>0 product results for {`'${searchQuery}'`} </span>
        ))}
    </div>
  );
};

SearchBar.propTypes = {
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  searchQuery: PropTypes.string,
  handleSearchQuery: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      countInStock: PropTypes.number.isRequired,
      description: PropTypes.string,
      brand: PropTypes.string,
      auxillaryImages: PropTypes.arrayOf(PropTypes.string),
      variations: PropTypes.arrayOf(
        PropTypes.shape({
          variationTitle: PropTypes.string,
          variations: PropTypes.arrayOf(PropTypes.string),
        })
      ),
    })
  ),
};

//This function sends query to database
const sendSearchQuery = async (query) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/search?keyword=${query}`
    );
    return data.products;
  } catch (e) {
    if (e.response.status === 404) return [];
  }
};
