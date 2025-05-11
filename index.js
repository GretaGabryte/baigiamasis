// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const userRoutes = require("./routes/users");
// const { authRouter } = require("./routes/auth");

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose
//   .connect(process.env.MONGO_URI)

//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// app.use("/api/users", userRoutes);

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/users");
const { authRouter } = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ✅ This is the missing piece:
app.use("/api", authRouter);

app.use("/api/users", userRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
