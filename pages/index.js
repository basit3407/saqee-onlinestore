import BestSellers from "../components/home/BestSellers";
import Top from "../components/home/Top";
import NavBar from "../components/layout/NavBar";

export default function Index() {
  return (
    <>
      <NavBar />
      <Top />
      <BestSellers />
    </>
  );
}
