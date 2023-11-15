import Order from "../models/orders";
import Product from "../models/products";
import { validateCheckout } from "../validation/checkout"
import User from "../models/users";
import { transporter } from "../config/mail";
//Tạo mới đơn hàng
export const createOrder = async (req, res) => {
  try {
    const { error } = validateCheckout.validate(req.body, { abortEarly: false })
    if (error) {
      return res.status(401).json({
        message: error.details.map(err => err.message)
      })
    }

    for (let product of req.body.products) {
      const productIndex = await Product.findById(product.productId)
      // console.log(productIndex);
      let quantity = product.quantity
      if (productIndex.stock == 0) {
        return res.status(402).json({
          message: "The product is out of stock",
          data: [{ productId: product.productId }]
        })
      }
      if (productIndex.stock < quantity) {
        return res.status(402).json({
          message: "The remaining product is not enough",
          data: [{ productId: product.productId }]
        })
      }
      await Product.findByIdAndUpdate(productIndex._id, {
        $set: {
          "stock": productIndex.stock - quantity,
          // "sold": productIndex.sold + quantity
        }
      })
    }
    console.log(req.user._id);
    if(req.user._id){
      req.body["userId"]=req.user._id
    }
    const data = await Order.create(req.body)
    return res.status(201).json({
      message: "Create order successfully",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
//User lấy tất cả order
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id
    console.log(userId);
    const order = await Order.find({ userId: userId })
    return res.status(201).json({
      message: "Get orders successfully",
      order
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}
//Admin lấy tất cả order
export const getAdminOrders = async (req, res) => {
  try {
    const order = await Order.find()
    return res.status(201).json({
      message: "Get orders successfully",
      order
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });

  }
}

//Chi tiết order
export const getOrderDetail = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("userId")
    if (!order) {
      return res.status(401).json({
        message: "Order not found"
      })
    }
    const { canCancel, remainingTime } = checkCancellationTime(order);
    let remainingTimeMessage = null
    let formattedTime = Number(remainingTime.toFixed(2))
    if (canCancel) {
      remainingTimeMessage = true;

    } else {
      remainingTimeMessage = false;

    }
    if (!order) {
      return res.status(401).json({
        message: "order ko tồn tại",
      });
    }
    return res.status(201).json({
      message: "Chi tiết order lấy được",
      order,
      remainingTimeMessage: remainingTimeMessage

    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });

  }
}

// admin update orders
// status: (chưa xử lý, chờ xác nhận => KH có thể hủy),đang giao, đã nhận hàng,đã hủy
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
      return res.status(401).json({
        message: "Update order Failed"
      })
    }
    return res.status(201).json({
      message: "Update order successfully",
      order
    })


  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });

  }
}
//Khách hàng được phép hủy đơn hàng khi đơn hàng ở trạng thái chưa xử lý hoặc đang chờ xác nhận
// => hủy đơn hàng chỉ thay đổi trạng thái thành đã hủy
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: "Cancelled" }, { new: true }).populate("products.productId").populate("products.sizeId");
    const { canCancel } = checkCancellationTime(order);
    if (!order) {
      return res.status(401).json({
        message: "Cancel order Failed"
      })
    }
    if (!canCancel) {
      return res.status(403).json({
        message: "Cancel order Failed"
      })
    }
    return res.status(201).json({
      message: "Cancel order successfully",
      order,

    })


  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });

  }
}

export const filterOrders = async (req, res) => {
  try {
    const userId = req.user._id
    let order = await Order.find({ userId: userId, status: req.body.status })
    console.log(req.params.idUser, req.body.status);
    if (req.body.status == "") {
      order = await Order.find({ userId: userId })
    }
    if (!order) {
      return res.status(401).json({
        message: "Filter orders field",
        order
      })
    }
    return res.status(201).json({
      message: "Filter orders successfully",
      order
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });

  }
}
const checkCancellationTime = (order) => {
  const checkTime = new Date(order.createdAt);
  const currentTime = new Date();

  const timeDifference = (currentTime - checkTime) / 1000 / 60 / 60; // Chênh lệch thời gian tính bằng giờ

  if (timeDifference < 24) {
    return {
      canCancel: true,
      remainingTime: 24 - timeDifference,
    };
  } else {
    return {
      canCancel: false,
      remainingTime: 0,
    };
  }
};

