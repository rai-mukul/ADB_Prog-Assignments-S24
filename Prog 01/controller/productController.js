const Product = require("../model/productModel");

// Controller functions
exports.getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Page number (default: 1)
  const pageSize = parseInt(req.query.pageSize) || 10; // Page size (default: 10)

  try {
    // Count total number of documents in the collection
    const totalDocs = await Product.countDocuments();

    // Calculate the number of documents to skip
    const skip = (page - 1) * pageSize;

    // Fetch paginated products from the database
    const products = await Product.find().skip(skip).limit(pageSize);

    res.json({
      currentPage: page,
      pageSize: pageSize,
      totalPages: Math.ceil(totalDocs / pageSize),
      totalItems: totalDocs,
      products: products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ code: req.params.code });
    if (product == null) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ code: req.params.code });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.body.name !== undefined) {
      product.name = req.body.name;
    }
    if (req.body.ratings !== undefined) {
      product.ratings = req.body.ratings;
    }
    if (req.body.no_of_ratings !== undefined) {
      product.no_of_ratings = req.body.no_of_ratings;
    }
    if (req.body.actual_price !== undefined) {
      product.actual_price = req.body.actual_price;
    }
    if (req.body.discount_price !== undefined) {
      product.discount_price = req.body.discount_price;
    }

    // Save the updated product
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ code: req.params.code });
    if (product == null) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//code modification
exports.productBegin = async (req, res) => {
    try {
        // Define the pipeline stages for aggregation
        const pipeline = [
            {
                $match: {
                    name: { $exists: true } // Filter out documents where name exists
                }
            },
            {
                $group: {
                    _id: { $substr: ["$name", 0, 1] }, // Extract the first character of the name
                    count: { $sum: 1 } // Count the occurrences
                }
            },
            {
                $sort: { "_id": 1 } // Sort by the first character
            }
        ];

        // Execute the aggregation pipeline
        const result = await Product.aggregate(pipeline);

        // Find count of products with null names
        const nullNameCount = await Product.countDocuments({ name: null });

        // Sum of all counts
        const totalCount = result.reduce((acc, curr) => acc + curr.count, 0) + nullNameCount;

        // Append count for null names
        result.push({ _id: "null", count: nullNameCount });

        // Append sum of all counts
        result.push({ _id: "total", count: totalCount });

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
//   try {
//     // finding all name and sort
//     const products = await Product.aggregate(
//       [
//         {
//           $group: {
//             _id: "$name",
//             count: { $sum: 1 },
//           },
//         },
//         {
//           $sort: { _id: 1 },
//         },
//       ],
//       { allowDiskUse: true }
//     );
//     //  for null name type count
//     const nullNameType = await Product.countDocuments({ name: null });

//     res.json({
//       products: products,
//       nullNameType: nullNameType,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
};
