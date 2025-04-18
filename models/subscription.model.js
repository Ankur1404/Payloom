import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subscription name is required"],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  price: {
    type: Number,
    required: [true, "Subscription price is required"],
    min: [0, "Price must be greater than 0"],
  },
  currency: {
    type: String,
    enum: ["USD", "INR"],
    default: "INR",
  },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly", "yearly"],
    required: true,
  },
  category:{
    type:String,
    enum:['sports','news','entertainment','technology','finance','other'],
    required:true,
  },
  paymentMethod: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["active", "cancelled", "expired"],
    default: "active",
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: "Start date must be in the past",
    },
  },
  renewDate: {
    type: Date,
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: "Renew date must be after the start date",
    },
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
    index:true,
  }
}, { timestamps: true });

subscriptionSchema.pre('save',function(next){
  if(!this.renewDate){
    const renewPeriod={
      daily:1,
      weekly:7,
      monthly:30,
      yearly:365,
    };
    this.renewDate=new Date(this.startDate);
    this.renewDate.setDate(this.renewDate.getDate()+ renewPeriod[this.frequency]);
  }

  if(this.renewDate<new Date()){
    this.status='expired';
  }

  next();

});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
