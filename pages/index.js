import PropTypes from "prop-types";
import BestSellers from "../components/home/BestSellers";
import Top from "../components/home/Top";
import Products from "../components/home/Products";
import Products2 from "../components/home/Products2";
import About from "../components/home/About";
import Layout from "../components/layout";

export default function Home(props) {
  const { cartItems } = props;
  return (
    <Layout cartItems={cartItems}>
      <Top />
      <BestSellers />
      <Products />
      <Products2 />
      <About />
    </Layout>
  );
}

Home.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      variations: PropTypes.objectOf(PropTypes.string),
      qty: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      price: PropTypes.number,
    })
  ),
};
