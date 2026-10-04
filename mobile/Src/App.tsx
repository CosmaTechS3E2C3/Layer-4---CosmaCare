import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "./screens/HomeScreen";
import { BookingScreen } from "./screens/BookingScreen";
import { ProviderDashboardScreen } from "./screens/ProviderDashboardScreen";
import { PayoutsScreen } from "./screens/PayoutsScreen";
import { DisputeScreen } from "./screens/DisputeScreen";

const Tab = createBottomTabNavigator();

export const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Book" component={BookingScreen} />
        <Tab.Screen name="Provider" component={ProviderDashboardScreen} />
        <Tab.Screen name="Payouts" component={PayoutsScreen} />
        <Tab.Screen name="Disputes" component={DisputeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

