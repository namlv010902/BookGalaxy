import Order from "../models/orders";
import Cart from "../models/carts";
import Products from "../models/products";
import { checkout } from "../validation/checkout"
import User from "../models/users";
import { transporter } from "../config/mail";
//Tạo mới đơn hàng
export const createOrder = async (req, res) => {
  try {
    const { cartId, address, phone, note, customerName } = req.body;
    const userId = req.user._id
    const cart = await Cart.findById(cartId).populate("products.productId");
    const products = cart.products.map((item) => {
      const { productId, quantity, price, sizeId } = item;
      return {
        productId: productId._id,
        price,
        quantity,
        sizeId
      }

    });
    console.log(products);
    const { error } = checkout.validate({address,phone,customerName}, { abortEarly: false });
    if (error) {
      return res.status(402).json({
        message: error.details.map(item => item.message)
      })
    }
    const order = await Order.create({
      userId,
      cartId,
      address,
      phone,
      note,
      products,
      totalPrice: cart.totalPrice,
      customerName
    });
    await order.populate("products.productId")
    await order.populate("products.sizeId")
    const user = await User.findById(userId);
    // thêm idOrder vào bảng user
    await User.findByIdAndUpdate(userId,{
      $push:{
        orderId:order._id
      }
    })

    const productInOrder = order.products;
    var checkTime = new Date(order.createdAt);
    var outTime = checkTime.toLocaleString();
    // Gửi mail thông báo đặt hàng thành công
    const mailOptions = {
      from: 'namphpmailer@gmail.com',
      to: user.email,
      subject: 'Thông báo đặt hàng thành công',
      html: `
        <div style="margin-bottom: 10px;">
        <img src="https://charmee-store-demo.myshopify.com/cdn/shop/files/logo.png?v=1613708277" style="width: 200px; height: auto; margin-right: 10px;" />
          <p style="margin: 0; font-size: 16px; color: blue; font-weight: 500;">Đơn hàng của bạn đã được khởi tạo:</p>
    
          <div style="display: flex; align-items: center;">
            <div>
              <p style="font-size: 16px; color: #002140; margin-right: 10px;font-weight:"bold">Mã đơn hàng: ${order._id}</p>
              <p style="font-size: 16px; color: #002140;">Tên người đặt: ${user.name}</p>
              <p style="font-size: 16px; color: #002140;">Địa chỉ nhận hàng: ${address}</p>
              <p style="font-size: 16px; color: #002140;">Số điện thoại: ${order.phone}</p>
              <p style="font-size: 16px; color: #002140;">Tổng tiền thanh toán: $${order.totalPrice}</p>
             
              <div style="margin-top: 10px;">
             <strong style="border-bottom:1px solid #ccc">Chi tiết sản phẩm : </strong>
                ${productInOrder.map(product => `
                  <div style="display: flex; align-items: center;">
                    <img src="${product.productId.image}" style="width: 90px; height: auto; " />
                    <div>
                    <p style="font-size: 16px; font-weight:bold;color: #2a9dcc; "> ${product.productId.name} ( ${product.sizeId.name} )</p>
                   <div>
                   <p style="font-size: 16px; color: #002140; "> $${product.price} X ${product.quantity} </p>
    
                   </div>
                    </div>
                    </div>
                `).join('')}
                <p style="font-size: 16px; color: #002140;">Thời gian đặt hàng: ${outTime}</p>
              </div>
            </div>
          </div>
        </div>
      `,
    };
    // Gửi email
    const result = await transporter.sendMail(mailOptions);
    console.log('Email gửi thành công:', result);
    // cập nhật lại giỏ hàng 
    cart.products = []
    cart.totalPrice = 0
    cart.save()
     // lặp lấy ra từng sp trong đơn hàng ra
    for (const product of products) {
      const { productId, quantity, sizeId } = product;
      // Cập nhật inStock và unitsSold cho kích thước tương ứng
      await Products.findOneAndUpdate(
        { _id: productId, 'sizes.sizeId': sizeId },
        {
          $inc: {
            'sizes.$.inStock': -quantity, // Giảm inStock
            'sizes.$.unitsSold': quantity, // Tăng unitsSold
          },
        }
      );
    }

    return res.status(201).json({
      message: "Create order successfully",
      order,
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
    const order = await Order.findById(req.params.id).populate("userId").populate("products.productId").populate('products.sizeId')
    if (!order) {
      return res.status(401).json({
        message: "Order not found"
      })
    }
    const { canCancel, remainingTime } = checkCancellationTime(order);
    let remainingTimeMessage = null
    let formattedTime = Number(remainingTime.toFixed(2))
    if (canCancel) {
      remainingTimeMessage = "Còn lại: " + formattedTime + "h để hủy đơn hàng này";

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

