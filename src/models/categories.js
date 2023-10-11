import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "essential"
    },
})


export default mongoose.model("Categories", categoriesSchema);