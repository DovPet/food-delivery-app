import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectedRestaurant } from "../features/restaurantSlice";
import { selectedBasketItems } from "../features/basketSlice";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectedRestaurant);
  const items = useSelector(selectedBasketItems);
  const dispatch = useDispatch();

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[items.id] = results[items.id] || []).push(item);
      return results;
    });
    setGroupedItemsInBasket(groupedItems)
  }, [items]);

  return (
    <View>
      <Text>BasketScreen</Text>
    </View>
  );
};

export default BasketScreen;
