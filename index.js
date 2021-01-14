require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
const colors = require("colors/safe");
const { connectDB } = require("./models");

const {
  createUser,
  getUser,
  loginUser,
  logoutUser,
} = require("./controllers/user");
const {
  getUserSearchByUserId,
  createUserSearch,
} = require("./controllers/UserSearch");

const app = express();
const { PORT = 4000 } = process.env;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use((err, req, res, next) => {
  res.status(err.status).send(err);
});

app.get("/", (req, res) => {
  req.session.requestCount = req.session.requestCount
    ? req.session.requestCount + 1
    : 1;
  res.json(req.session);
});

app.post("/register", createUser);
app.post("/login", loginUser);
app.get("/logout", logoutUser);
app.get("/profile", getUser);

app.post("/usersearchs", createUserSearch);
app.get("/usersearchs/:userId", getUserSearchByUserId);

(async () => {
  await connectDB();
  app.listen(PORT, () =>
    console.log(
      colors.green.inverse(`api-make API running at http://localhost:${PORT}`)
    )
  );
})();
