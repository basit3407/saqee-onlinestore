import BestSellers from "../components/home/BestSellers";
import Top from "../components/home/Top";
import Beauty from "../components/home/Products";
import BodyCare from "../components/home/BodyCare";
import About from "../components/home/About";

export default function Index() {
  return (
    <>
      <Top />
      <BestSellers />
      <Beauty />
      <BodyCare />
      <About />
    </>
  );
}
