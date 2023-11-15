import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
 
  userId: {
    type: mongoose.Schema.Types.Mixed,
    default:null
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
    productTitle:{
      type: String,
      required: true,
    },
    productImage:{
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
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
    default: null
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  totalPayment: {
    type: Number,
    required:true
  },
  status: {
    type: String,
    default: "Pending"
  },
  orderDate:{
    type:String,
    default: function(){
      return new Date().toLocaleDateString()
    }
  }

}, { timestamps: true, versionKey: false });

export default mongoose.model("Order", orderSchema)