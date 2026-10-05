import { BookingResolvers } from "./bookings";
import { DisputeResolvers } from "./disputes";
import { GovernanceResolvers } from "./governance";
import { ProfileResolvers } from "./profiles";
import { RewardResolvers } from "./rewards";
import { SettlementResolvers } from "./settlements";

export const resolvers = {
  Query: {
    ...BookingResolvers.Query,
    ...DisputeResolvers.Query,
    ...GovernanceResolvers.Query,
    ...ProfileResolvers.Query,
    ...RewardResolvers.Query,
    ...SettlementResolvers.Query
  }
};
