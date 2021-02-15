import ProtoType from "../components/ProtoType";

export default function Lips() {
  const array = [
    {
      img: "mosturizingLipstick",
      name: "Mosturizing Lipstick",
      price: 500,
    },
    {
      img: "liquidLipstick",
      name: "Liquid Lipstick",
      price: 500,
    },
    {
      img: "liquidLipstick",
      name: "Liquid Lipstick",
      price: 500,
    },
    {
      img: "signatureLipstick",
      name: "Signature Lipstick",
      price: 500,
    },
    {
      img: "hydratingLipPrimer",
      name: "Hydrating Lip Primer",
      price: 500,
    },
    {
      img: "lipLiner",
      name: "Lip Liner",
      price: 500,
    },
  ];
  return <ProtoType heading="Lips" array={array} />;
}
