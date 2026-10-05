import { CosmaClient } from "./client";
import * as identity from "./identity/did";
import * as bookings from "./bookings";
import * as services from "./services";
import * as profiles from "./profiles";
import * as settlements from "./settlements";
import * as disputes from "./disputes";
import * as rewards from "./rewards";
import * as governance from "./governance";
import * as realtime from "./realtime";

export const CosmaSDK = {
  client: new CosmaClient(),
  identity,
  bookings,
  services,
  profiles,
  settlements,
  disputes,
  rewards,
  governance,
  realtime,
};

