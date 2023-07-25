const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const MONGO_SECRET = process.env.MONGO_SECRET;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_SECRET}@cluster0.l6ikclz.mongodb.net/?retryWrites=true&w=majority`;

const expenseRoutes = require("./routes/expense");
const authRoutes = require("./routes/auth")
const transactionsRoutes = require("./routes/transactions")
const categoryRoutes = require("./routes/categories")
const accountsRoutes = require("./routes/accounts")
const incomeRoutes = require("./routes/income")


const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.use("/expenses", expenseRoutes);
app.use('/auth', authRoutes);
app.use("/transactions", transactionsRoutes);
app.use("/category", categoryRoutes);
app.use("/accounts", accountsRoutes);
app.use("/income", incomeRoutes);



mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to db successfully!")
    app.listen(process.env.PORT||5050, () => {
        console.log("App is running on port 5050" )
    })
}).catch((err) => {
    console.log("Error connecting to db")
    throw err
})
