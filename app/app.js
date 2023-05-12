const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/UserRouter');
const farmRouter = require('./routes/FarmRouter');
const createDatabaseAndAdmin = require('./configs/initDB');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

createDatabaseAndAdmin();

app.use('/', authRouter)
app.use('/users', userRouter);
app.use('/farms', farmRouter);

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
