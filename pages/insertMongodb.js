import axios from "axios";

export default function insertMongodb() {
  const products1 = [
    {
      category: "fabrics",
      title: "Shirt & Trousers (2 piece)",
      brand: "Aiman Zaman",
      price: 2250,
      image: 4,
    },
    {
      category: "fabrics",
      title: "Shirt, Duppatta & Lehenga (3 piece)",
      brand: "Aisha Imran",
      price: 3450,
      image: 5,
    },
    {
      category: "fabrics",
      title: "Shirt, Duppatta & Trousers (3 piece)",
      brand: "Gul Warin",
      price: 3550,
      image: 2,
    },
  ];

  return (
    <button
      onClick={() => {
        axios.post("http://localhost:3000/api/products/Garments", products1);
      }}
    ></button>
  );
}
