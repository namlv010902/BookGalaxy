import Products from "../models/products"
import Categories from "../models/categories"
import unidecode from "unidecode"

import { validateProduct } from "../validation/products";


export const getAllProduct = async (req, res) => {
  const { _page = 1,
    _order = "asc",
    _limit = 9999,
    _sort = "createdAt",
    _q = "",
    _categoryId = "",
    _minPrice = "",
    _maxPrice = "",

  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
    populate: 'categoryId',
  };
  const searchText = _q ? unidecode(_q) : '';

  try {
    let query = {};
    if (searchText) {
      query = { title: { $regex: searchText, $options: 'i' } };
    }
    if (_categoryId) {
      query.categoryId = _categoryId
    }
    if (_minPrice) {
      query.price = { $gte: _minPrice }
    }
    if (_maxPrice) {
      query.price = { $lte: _maxPrice }
    }
    if (_minPrice && _maxPrice) {
      query.price = { $gte: _minPrice, $lte: _maxPrice }
    }
    const product = await Products.paginate(query, options);
    let maxPrice = 0
    for (let item of product.docs) {
      maxPrice = Math.max(item.price)
    }

    product["maxPrice"] = maxPrice
    return res.status(201).json({
      message: "Get all product successfully",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};


export const createProduct = async (req, res) => {
  try {
    const { error } = validateProduct.validate(req.body, { abortEarly: false })
    if (error) {
      return res.status(401).json({
        message: error.details.map(error => error.message)
      })
    }

    const product = await Products.create(req.body)
    await Categories.findByIdAndUpdate(product.categoryId, {
      $push: { productId: product._id }
    })

    return res.status(201).json({
      message: "Create product successfully",
      product
    })

  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}


export const updateProduct = async (req, res) => {
  try {
    const { error } = validateProduct.validate(req.body, { abortEarly: false })
    if (error) {
      return res.status(403).json({
        message: error.details.map(error => error.message)
      })
    }

    const { categoryId } = req.body;
    const product = await Products.findByIdAndUpdate(req.params.id, req.body);

    // Update new category
    await Categories.findByIdAndUpdate(product.categoryId, {
      $pull: {
        productId: product._id,
      },
    });
    await Categories.findByIdAndUpdate(categoryId, {

      $addToSet: {
        productId: product._id,
      },
    });

    return res.status(201).json({
      message: "Update product successfully",
      product
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}

export const getOneProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id).populate("categoryId")
    await product.populate("categoryId.productId")

    return res.status(201).json({
      message: "Get product successfully",
      product,

    })
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}
export const removeProduct = async (req, res) => {
  try {
    // Tìm và lấy thông tin sản phẩm cần xóa
    const product = await Products.findById(req.params.id);
    const { categoryId } = product;
    // Xóa id của sản phẩm khỏi bảng category
    await Categories.findByIdAndUpdate(categoryId, {
      $pull: {
        productId: req.params.id,
      },
    });
    // Xóa sản phẩm
    await Products.findByIdAndDelete(req.params.id);
    return res.status(201).json({
      message: "Remove product successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const filterPrice = async (req, res) => {
  const { _page = 1, _order = "asc", _limit = 8, _sort = "createAt", _q = "" } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
    populate: [{ path: 'categoryId' }],

  };

  try {
    return res.status(201).json({
      message: "Get all product successfully",

    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}


