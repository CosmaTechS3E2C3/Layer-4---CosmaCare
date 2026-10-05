import React, { useEffect } from "react";
import { View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../store/bookingsSlice";
import BookingCard from "../components/BookingCard";

export const BookingListScreen = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(state => state.bookings.items);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  return (
    <View>
      <FlatList
        data={bookings}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <BookingCard booking={item} />}
      />
    </View>
  );
};

