const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRouter = require('./routes/UserRouter');
const authRouter = require('./routes/auth');
const createDatabaseAndAdmin = require('./configs/initDB');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

createDatabaseAndAdmin();

app.use('/users', userRouter);
app.use('/', authRouter)

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
