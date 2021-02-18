import { connectToDatabase } from "../../../../util/mongodb";
import validate from "../../../../validation/product";
import { ObjectId } from "mongodb";

export default async function productHandler(req, res) {
  const {
      query: { id, name },
      method,
    } = req,
    { db } = await connectToDatabase();

  switch (method) {
    case "GET":
      {
        // @route GET api/products/[name]/[id]
        // @desc get product of [id] from products of [name] from data base
        // @access public

        //get product by Id
        const product = await db
          .collection(name)
          .findOne({ _id: ObjectId(id) });

        res.status(200).json({ product: product });
      }
      break;

    case "PUT":
      {
        // @route PUT api/products/[name]/[id]
        // @desc edit product of [id] in products of [name] in data base
        // @access Admin

        // Form validation
        const { errors, isValid } = validate(req.body);
        //if not valid retrun error
        if (!isValid) return res.status(400).json(errors);

        //if no error update the product
        await db
          .collection(name)
          .updateOne({ _id: ObjectId(id) }, { $set: req.body });

        res.status(200).json({ message: " updated product saved" });
      }
      break;

    case "DELETE":
      // @route DELETE api/products/[name]/[id]
      // @desc delete product of [id] in products of [name] in data base
      // @access Admin

      await db.collection(name).deleteOne({ _id: ObjectId(id) });

      res.status(200).json({ message: "product deleted" });

      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
