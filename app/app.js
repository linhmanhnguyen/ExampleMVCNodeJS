const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRouter = require('./routes/UserDetailRouter');
const userAccountRouter = require('./routes/UserAccountRouter');
const animalTypeRouter = require('./routes/AnimalTypeRouter');
const farmRouter = require('./routes/FarmRouter');
const createDatabaseAndAdmin = require('./configs/initDB');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Khởi tạo Database và tài khoản Admin
createDatabaseAndAdmin();

app.use('/users', userRouter);
app.use('/accounts', userAccountRouter);
app.use('/animal-types', animalTypeRouter);
app.use('/farms', farmRouter);

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
