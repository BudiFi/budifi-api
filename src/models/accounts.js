const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    accountDetails:{},
    user:{}
})

module.exports = mongoose.model("Accounts", accountSchema)