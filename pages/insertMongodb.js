import axios from "axios";

export default function insertMongodb() {
  const products = [
    {
      title: "3 Piece Lawn",
      price: "2999",
      image: "90",
      brand: "CHARIZMA",
      category: "garments",
      countInStock: "10",
      auxillaryImages: ["91", "92"],
    },
    {
      title: "3 pieceLawn",
      price: "2999",
      image: "93",
      brand: "BAROQUE",
      category: "garments",
      countInStock: "10",
      auxillaryImages: ["94", "95"],
    },
    {
      title: "3 piece PLawn",
      price: "2999",
      image: "97",
      brand: "BAROQUE",
      category: "garments",
      countInStock: "10",
      auxillaryImages: ["96", "98"],
    },
    {
      title: "FABRIC LAWN Trouser Dyed Color",
      price: "2799",
      image: "88",
      auxillaryImages: ["85", "89"],
      category: "garments",
      countInStock: "10",
      description:
        "EMBROIDERY DETAILS Neck Embroidered On Fabric \n Trouser Lace Embroidered \n Daman Bunch Embroidered For Purple Dress",
    },
    {
      title: "FABRIC LAWN",
      price: "2799",
      image: "77",
      brand: "CHARIZMA",
      category: "garments",
      countInStock: "10",
      auxillaryImages: ["86"],
    },
    {
      title: "Luxury Lawn ",
      price: "5200",
      image: "67",
      category: "garments",
      countInStock: "10",
      auxillaryImages: ["62", "63", "64", "65", "66"],
    },
    {
      title: "Luxury Lawn",
      price: "5999",
      image: "78",
      category: "garments",
      countInStock: "10",
      auxillaryImages: ["79", "80", "81", "82", "83", "84"],
    },
    {
      title: "Luxury Lawn",
      price: "6200",
      image: "76",
      category: "garments",
      countInStock: "10",
      auxillaryImages: ["68", "76"],
    },
    {
      title: "Luxury Lawn",
      price: "6200",
      image: "75",
      category: "garments",
      countInStock: "10",
      auxillaryImages: ["69", "70", "71", "72", "73", "74"],
    },
  ];

  return (
    <button
      onClick={() => {
        axios.post("http://localhost:3000/api/products/Garments", products);
      }}
    ></button>
  );
}
