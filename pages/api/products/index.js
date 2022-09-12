import { connectToDatabase } from "../../../util/mongodb";
// import validate from "../../../validation/product";

export default async function productsHandler(req, res) {
  const {
      query: { category, sort },
      method,
    } = req,
    { db } = await connectToDatabase();

  switch (method) {
    case "GET":
      // @route GET /api/products?category=[category]&sort=${sort}
      // @desc get all the products from data base,
      // @access public
      {
        //Find by category
        const Category = category
            ? {
                category: category.slice(0).toLowerCase(),
              }
            : {},
          //if sort selected then sort also.
          sortWord = sort ? { [sort]: 1 } : {};
        //combine above 2 quiries and fetch data from database.

        try {
          const products = await db
            .collection("products")
            .find(Category)
            .sort(sortWord)
            .toArray();
          //give error if no products
          if (!products.length)
            return res.status(404).json({ error: "no such category" });
          //if no errors send success response
          res.status(200).json(products);
        } catch (e) {
          res
            .status(500)
            .json({ error: "there was some problem,please try again" });
        }
      }

      break;
    // case "POST":
    //   // @route POST /api/products
    //   // @desc create product in products of [name] in data base
    //   // @access public
    //   {
    //     const { errors, isValid } = validate(req.body); // Form validation
    //     if (!isValid) return res.status(400).json(errors); //if not valid retrun error

    //     //delete extra entries in product
    //     let product = req.body;
    //     for (const prop in product) !product[prop] && delete product[prop]; //delete optional empty fields
    //     delete product.auxImagesQty;
    //     delete product.variationsQty;

    //     //save to db
    //     try {
    //       await db.collection("products").insertOne(product);
    //       res.status(200).json({ message: "product saved" }); //save product in db
    //     } catch (e) {
    //       res
    //         .status(500)
    //         .json({ server: "there was some problem,please try again" });
    //     }
    //   }

    //   break;
    case "POST":
      // @route POST api/products/[name]
      // @desc create product in products of [name] in data base
      // @access public
      {
        // // Form validation
        // const { errors, isValid } = validate(req.body);
        // //if not valid retrun error
        // if (!isValid) return res.status(400).json(errors);

        //if no errors save
        try {
          console.log(" i got called");
          await db.collection("products").insertMany(req.body);
          console.log("hulla");
          res.status(200).json({ message: "product saved" });
        } catch (e) {
          console.log(e);
          e &&
            res
              .status(500)
              .json({ error: "there was some problem,please try again" });
        }
      }

      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
