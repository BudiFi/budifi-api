const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const expenseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
}, { timestamps: true });
export default mongoose.model("Expense", expenseSchema);
