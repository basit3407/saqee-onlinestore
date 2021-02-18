import { connectToDatabase } from "../../../../util/mongodb";
import validate from "../../../../validation/product";

export default async function productsHandler(req, res) {
  const {
      query: { name },
      method,
    } = req,
    { db } = await connectToDatabase();

  switch (method) {
    case "GET":
      // @route GET api/products/[name]
      // @desc get products of [name] from data base
      // @access public
      {
        const products = await db.collection(name).find({}).toArray();

        res.status(200).json({ products: products });
      }

      break;
    case "POST":
      // @route POST api/products/[name]
      // @desc create product in products of [name] in data base
      // @access public
      {
        // Form validation
        const { errors, isValid } = validate(req.body);
        //if not valid retrun error
        if (!isValid) return res.status(400).json(errors);

        //if no errors save product
        await db.collection(name).insertOne(req.body);

        res.status(200).json({ message: "product saved" });
      }

      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
