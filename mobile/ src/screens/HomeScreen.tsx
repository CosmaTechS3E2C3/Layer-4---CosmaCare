import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../store/bookingsSlice";
import { RootState } from "../store";

export const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((s: RootState) => s.bookings.items);

  useEffect(() => {
    dispatch(fetchBookings() as any);
  }, [dispatch]);

  return (
    <View>
      <Text>CosmaCare Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Text>{item.id} — {item.status}</Text>
        )}
      />
    </View>
  );
};

