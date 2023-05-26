const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const authRouter = require('./routes/AuthRouter');
const userRouter = require('./routes/UserDetailRouter');
const userAccountRouter = require('./routes/UserAccountRouter');
const animalTypeRouter = require('./routes/AnimalTypeRouter');
const farmRouter = require('./routes/FarmRouter');
const animalRouter = require('./routes/AnimalRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/accounts', userAccountRouter);
app.use('/animal-types', animalTypeRouter);
app.use('/farms', farmRouter);
app.use('/animals', animalRouter);

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
