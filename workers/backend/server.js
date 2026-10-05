const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PORT, API_PREFIX } = require("./config");

const bookingsRoutes = require("./routes/cosmacareBookings");
const disputesRoutes = require("./routes/cosmacareDisputes");
const settlementsRoutes = require("./routes/cosmacareSettlements");
const rewardsRoutes = require("./routes/cosmacareRewards");
const governanceRoutes = require("./routes/cosmacareGovernance");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(API_PREFIX, bookingsRoutes);
app.use(API_PREFIX, disputesRoutes);
app.use(API_PREFIX, settlementsRoutes);
app.use(API_PREFIX, rewardsRoutes);
app.use(API_PREFIX, governanceRoutes);

app.get(API_PREFIX + "/health", (req, res) => {
  res.json({ status: "ok", service: "CosmaCare Layer-4 API" });
});

app.listen(PORT, () => {
  console.log(`CosmaCare API running on port ${PORT}`);
});

