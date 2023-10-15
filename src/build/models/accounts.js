import mongoose from "mongoose";
const Schema = mongoose.Schema;
const accountSchema = new Schema({
    accountDetails: {},
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
});
export default mongoose.model("Accounts", accountSchema);
