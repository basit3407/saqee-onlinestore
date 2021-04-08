import PropTypes from "prop-types";
import Navbar from "./NavBar";
import Footer from "./Footer";
import ContactIcon from "../ContactIcon";

export default function Layout(props) {
  const { cartItems } = props;

  return (
    <>
      <Navbar cartItems={cartItems} />
      {props.children}
      <ContactIcon />
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      variations: PropTypes.objectOf(PropTypes.string),
      qty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      price: PropTypes.number,
    })
  ),
};
