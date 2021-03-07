import { connectToDatabase } from "../../../util/mongodb";
import { isEmpty } from "../../../validation/product";

export default async function ordersHandler(req, res) {
  const {
      body: { cartItems, shippingDetails, orderNote },
      method,
    } = req,
    { db } = await connectToDatabase();

  switch (method) {
    case "POST":
      // @route POST api/orders
      // @desc save order in database
      // @access public
      {
        const orderedItems = cartItems.map((item) => {
          return {
            id: item.id,
            title: item.title,
            qty: item.qty,
            price: item.price,
            ...(!isEmpty(item.variations) && { variations: item.variations }), //if variations are not present dont save empty object in database
          };
        });

        try {
          await db.collection("orders").insertOne({
            Items: orderedItems,
            shippingDetails: shippingDetails,
            ...(orderNote && { orderNote: orderNote }), //if orderNote is present,send orderNote
          });
          res.status(200).json({ message: "order saved" });
        } catch (e) {
          e &&
            res
              .status(500)
              .json({ error: "there was some problem,please try again" });
        }
      }
      break;

    default:
      break;
  }
}
