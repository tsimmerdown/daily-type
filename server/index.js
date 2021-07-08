const express = require("express");
const apiRoutes = require("./routes/apiRoutes");

const PORT = 3080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server started and listening on PORT: ${PORT}`);
});
