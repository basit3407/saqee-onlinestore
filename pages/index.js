import BestSellers from "../components/home/BestSellers";
import Top from "../components/home/Top";
import NavBar from "../components/layout/NavBar";
import Beauty from "../components/home/Products";
import BodyCare from "../components/home/BodyCare";

export default function Index() {
  return (
    <>
      <NavBar />
      <Top />
      <BestSellers />
      <Beauty />
      <BodyCare />
    </>
  );
}
