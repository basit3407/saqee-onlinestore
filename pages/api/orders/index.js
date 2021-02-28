import { connectToDatabase } from "../../../util/mongodb";

export default async function ordersHandler(req, res) {
  const {
      body: { cartItems, shippingDetails },
      method,
    } = req,
    { db } = await connectToDatabase();

  switch (method) {
    case "POST":
      // @route POST api/orders
      // @desc save order in database
      // @access public

      try {
        await db
          .collection("orders")
          .insertOne({ Items: cartItems, shippingDetails: shippingDetails });
        res.status(200).json({ message: "order saved" });
      } catch (e) {
        e &&
          res
            .status(500)
            .json({ error: "there was some problem,please try again" });
      }

      break;

    default:
      break;
  }
}
