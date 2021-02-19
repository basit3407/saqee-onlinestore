import BestSellers from "../components/home/BestSellers";
import Top from "../components/home/Top";
import Products from "../components/home/Products";
import Products2 from "../components/home/Products2";
import About from "../components/home/About";

export default function Index() {
  return (
    <>
      <Top />
      <BestSellers />
      <Products />
      <Products2 />
      <About />
    </>
  );
}
