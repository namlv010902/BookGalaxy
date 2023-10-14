import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  cartId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Cart"
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User"
  },
  customerName: {
    type: String,
    required: true
  },

  products: [{
    productId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Products"
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sizeId:{
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Size"
    }
  }

  ],

  DeliveryDate: {
    type: String,
    default: null

  },
  pay: {
    type: Boolean,
    default: false
  },
  note: {
    type: String,

  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  status: {
    type: String,
    default: "Pending"
  }


}, { timestamps: true, versionKey: false });

export default mongoose.model("Order", orderSchema)