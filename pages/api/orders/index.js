import { connectToDatabase } from "../../../util/mongodb";
import { isEmpty } from "../../../validation/product";
import nodemailer from "nodemailer";
import { totalAmount } from "../../checkout";
import { ObjectID } from "mongodb";

export default async function ordersHandler(req, res) {
  const {
      body: { cartItems, shippingDetails, orderNote },
      method,
    } = req,
    { db } = await connectToDatabase();

  switch (method) {
    case "POST":
      // @route POST /api/orders
      // @desc save order in database
      // @access public
      {
        const orderedItems = cartItems.map((item) => {
          return {
            _id: ObjectID(item.id),
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
          //send email to admin
          const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: "basit.prevail@gmail.com",
              pass: "Pe@14012020",
            },
          });
          const mailOptions = {
            from: "basit.prevail@gmail.com",
            to: "basit3407@gmail.com",
            subject: "Saqee's Online Store Order",
            text:
              "Following is the new order recevied:\n\n" +
              "Total number of items = " +
              cartItems.length +
              "\n\n" +
              cartItems
                .map(
                  (item, index) =>
                    "item # " +
                    index +
                    ":\n" +
                    "title: " +
                    item.title +
                    "\n" +
                    "id: " +
                    item.id +
                    "\n" +
                    "qty: " +
                    item.qty +
                    "\n" +
                    "price: " +
                    item.price
                )
                .join("\n\n") +
              "\n\n\n" +
              "shipping details are as follow:\n" +
              "name: " +
              shippingDetails.name +
              "\n" +
              "number: " +
              shippingDetails.number +
              "\n" +
              "address: " +
              shippingDetails.address +
              "\n" +
              "city: " +
              shippingDetails.city +
              "\n\n" +
              "Total price(including delivery charges) = " +
              "Rs " +
              totalAmount(orderedItems, "Karachi"),
          };

          transporter.sendMail(mailOptions);
          res.status(200).json({ message: "order saved" });
        } catch (e) {
          res
            .status(500)
            .json({ error: "there was some problem,please try again" });
        }
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
