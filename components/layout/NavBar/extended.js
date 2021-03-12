import {
  makeStyles,
  Popover,
  Menu,
  MenuItem,
  ClickAwayListener,
  Popper,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { MapMenu, SearchBar } from "./NavBar";

const useStyles = makeStyles((theme) => ({
  searchPaper: {
    backgroundColor: theme.palette.secondary.light,

    width: "99%",
    maxWidth: "unset",
  },
  shoppingPaper: {
    backgroundColor: theme.palette.secondary.light,
  },
  popover: {
    pointerEvents: "none",
  },
}));

export const SearchPopover = (props) => {
  const classes = useStyles(),
    {
      anchorSearch,
      handleSearchClose,
      openSearch,
      searchResults,
      handleSearchQuery,
      searchQuery,
    } = props;

  return (
    // <ClickAwayListener onClickAway={handleSearchClose}>
    <Popover
      anchorEl={anchorSearch}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      keepMounted
      open={openSearch}
      onClose={handleSearchClose}
      classes={{ paper: classes.searchPaper }}
      PaperProps={{ elevation: 0 }}
      elevation={0}
      //important for keeping popover to full left
      marginThreshold={0}
    >
      <SearchBar
        id="big"
        handleSearchQuery={handleSearchQuery}
        searchResults={searchResults}
        onClose={handleSearchClose}
        searchQuery={searchQuery}
      />
    </Popover>
    // </ClickAwayListener>
  );
};

SearchPopover.propTypes = {
  handleSearchClose: PropTypes.func.isRequired,
  anchorSearch: PropTypes.object,
  openSearch: PropTypes.bool.isRequired,
  handleSearchQuery: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
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

export const ShoppingMenu = (props) => {
  const classes = useStyles(),
    { anchorShopping, setAnchorShopping, openShopping } = props,
    shoppingMenuItems = [
      { title: "Garments", href: "/products/garments" },
      { title: "Cosmetics", href: "products/Cosmetics" },
      { title: "Handbags", href: "/products/handbags" },
      { title: "Kitchenware", href: "/products/kitchenware" },
      { title: "Little Ones", href: "/products/babies" },
    ];

  return (
    <Menu
      anchorEl={anchorShopping}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      open={openShopping}
      onClose={() => setAnchorShopping()}
      classes={{ paper: classes.shoppingPaper }}
      PaperProps={{ elevation: 0, id: "shopping" }}
      marginThreshold={0}
      getContentAnchorEl={null}
    >
      {/* div is here to recieve the ref  */}
      <div>
        <MapMenu
          element={MenuItem}
          menuItems={shoppingMenuItems}
          textColor={"textSecondary"}
        />
      </div>
    </Menu>
  );
};

ShoppingMenu.propTypes = {
  setAnchorShopping: PropTypes.func.isRequired,
  anchorShopping: PropTypes.object,
  openShopping: PropTypes.bool.isRequired,
};
