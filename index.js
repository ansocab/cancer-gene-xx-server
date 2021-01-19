require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
const colors = require("colors/safe");
const { connectDB, connection } = require("./models");

const {
  createUser,
  getUser,
  loginUser,
  logoutUser,
} = require("./controllers/user");
const {
  getUserSearchById,
  getUserSearchByUserId,
  createUserSearch,
  updateUserSearch,
  deleteUserSearch,
} = require("./controllers/UserSearch");

const {
  createCancerData,
  getCancerDataById,
  deleteCancerData,
} = require("./controllers/CancerData");

const app = express();
const { PORT = 4000 } = process.env;

const origin =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_CLIENT
    : process.env.DEVELOPMENT_CLIENT;

app.use(cors({ credentials: true, origin }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {sameSite: "none"}
  })
);

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.sessionID);
  next();
});

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

app.get("/user/usersearchs", getUserSearchByUserId);

app.post("/usersearchs", createUserSearch);
app.get("/usersearchs/:searchId", getUserSearchById);
app.put("/usersearchs/:searchId", updateUserSearch);
app.delete("/usersearchs/:searchId", deleteUserSearch);

app.post("/cancerdata", createCancerData);
app.get("/cancerdata/:cancerDataId", getCancerDataById);
app.delete("/cancerdata/:cancerDataId", deleteCancerData);
(async () => {
  await connectDB();
  app.listen(PORT, () =>
    console.log(
      colors.green.inverse(`api-make API running at http://localhost:${PORT}`)
    )
  );
})();
