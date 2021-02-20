import { makeStyles, Popover, Menu, MenuItem } from "@material-ui/core";
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
}));

export const SearchPopover = (props) => {
  const classes = useStyles(),
    { handleClose, anchorSearch, openSearch } = props;

  return (
    <Popover
      anchorEl={anchorSearch}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      keepMounted
      open={openSearch}
      onClose={handleClose}
      classes={{ paper: classes.searchPaper }}
      PaperProps={{ elevation: 0 }}
      //important for keeping popover to full left
      marginThreshold={0}
    >
      <SearchBar handleClose={handleClose} />
    </Popover>
  );
};

SearchPopover.propTypes = {
  handleClose: PropTypes.func.isRequired,
  anchorSearch: PropTypes.object,
  openSearch: PropTypes.bool.isRequired,
};

export const ShoppingMenu = (props) => {
  const classes = useStyles(),
    { anchorShopping, openShopping, handleClose } = props,
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
      onClose={handleClose}
      classes={{ paper: classes.shoppingPaper }}
      PaperProps={{ elevation: 0 }}
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
  handleClose: PropTypes.func.isRequired,
  anchorShopping: PropTypes.object,
  openShopping: PropTypes.bool.isRequired,
};
