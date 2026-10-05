import * as bookings from "./routes/bookings";
import * as profiles from "./routes/profiles";
import * as services from "./routes/services";
import * as settlements from "./routes/settlements";
import * as disputes from "./routes/disputes";
import * as rewards from "./routes/rewards";
import * as governance from "./routes/governance";

export function registerRoutes(app) {
  app.use("/api/bookings", bookings.router);
  app.use("/api/profiles", profiles.router);
  app.use("/api/services", services.router);
  app.use("/api/settlements", settlements.router);
  app.use("/api/disputes", disputes.router);
  app.use("/api/rewards", rewards.router);
  app.use("/api/governance", governance.router);
}

