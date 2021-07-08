const express = require("express");
const cors = require("cors");

const apiRoutes = require("./routes/apiRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(process.env.PORT || 3080, () => {
  console.log(`Server started and listening on PORT: 3080`);
});
