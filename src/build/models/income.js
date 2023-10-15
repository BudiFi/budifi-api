import mongoose from "mongoose";
const Schema = mongoose.Schema;
const incomeSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    amount: {
        type: Number,
        required: true
    },
    transactionId: {
        type: Schema.Types.ObjectId,
        ref: "transactions",
        required: false
    }
}, { timestamps: true });
export default mongoose.model('Income', incomeSchema);
