import axios from "axios";

export default function insertMongodb() {
  const products = [
    {
      title: "test",
      price: "50",
      image: "asdasd",
      brand: "asdasd",
      category: "asdasd",
      countInStock: "asdasd",
      description: "asdasd",
    },
    {
      title: "test2",
      price: "50",
      image: "asdasd",
      brand: "asdasd",
      category: "asdasd",
      countInStock: "asdasd",
      description: "asdasd",
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
