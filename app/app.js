const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const authRouter = require("./routes/AuthRouter");
const userRouter = require("./routes/UserDetailRouter");
const userAccountRouter = require("./routes/UserAccountRouter");
const animalTypeRouter = require("./routes/AnimalTypeRouter");
const farmRouter = require("./routes/FarmRouter");
const cageRouter = require("./routes/CageRouter");
const animalRouter = require("./routes/AnimalRouter");
const addressRouter = require("./routes/AddressRouter");
const weatherRouter = require("./routes/WeatherRouter");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use("/", authRouter);
app.use("/animal-types", animalTypeRouter);
app.use("/users", userRouter);
app.use("/accounts", userAccountRouter);
app.use("/farms", farmRouter);
app.use("/cages", cageRouter);
app.use("/animals", animalRouter);
app.use("/address", addressRouter);
app.use("/weather", weatherRouter);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
