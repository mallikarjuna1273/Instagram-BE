const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["interest", "ignore", "reject", "accept"],
        message: `{VALUE} is not listed`,
      },
    },
  },
  { timestamps: true },
);

connectionSchema.index({ fromUserId: 1, toUserId: 1 });

connectionSchema.pre('save', function(next){
  const Connection = this;
  if(Connection.fromUserId.equals(Connection.toUserId)){
  throw new Error("self request is not allowed")
  }
  next;
})

module.exports = mongoose.model("Connection", connectionSchema);
