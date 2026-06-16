import productModel from "../model/product.model.js";

export async function GetProducts(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const totalproduct = await productModel.countDocuments();
    const totalPages = Math.ceil(totalproduct / limit);

    if (page > totalPages) {
      return res.status(404).json({
        message: `Page ${page} does not exist`,
        totalPages,
      });
    }
    const skip = (page - 1) * limit;

    const Products = await productModel.find().skip(skip).limit(limit);

    return res.json({
      currentPage: page,
      totalPages,
      totalproduct,
      Products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function AddProduct(req, res) {
  try {
    const newproduct = new productModel(req.body);

    await newproduct.save();

    res.status(201).json({
      message: "Product added successfully",
      data: newproduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function AddBulkProducts(req, res) {
  try {
    const Products = await productModel.insertMany(req.body);

    res.status(201).json({
      message: "Bulk Products added successfully",
      data: Products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function UpdateProduct(req, res) {
  try {
    const productId = req.params.id;
    const UpdatedProduct = req.body;

    const Products = await productModel.findByIdAndUpdate(
      productId,
      UpdatedProduct,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!Products) {
      return res.json({
        message: "Product Not Found",
      });
    }

    await Products.save();

    res.json({
      message: "Products are Updated",
      data: Products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function DeleteProduct(req, res) {
  try {
    const DeletedProduct = await productModel.findByIdAndDelete(req.params.id);

    if (!DeletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
      data: DeletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
