import {
  View,
  SafeAreaView,
  ScrollView
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectedRestaurant } from "../features/restaurantSlice";
import { selectedBasketItems } from "../features/basketSlice";
import { useTailwind } from "tailwind-rn";
import BasketRow from "../components/Basket/BasketRow";
import BasketTotal from "../components/Basket/BasketTotal";
import BasketHeader from "../components/Basket/BasketHeader";

const BasketScreen = () => {
  const restaurant = useSelector(selectedRestaurant);
  const items = useSelector(selectedBasketItems);

  const tw = useTailwind();

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <View style={tw("flex-1 bg-gray-100")}>
        <BasketHeader restaurantTitle={restaurant.title} />

        <ScrollView style={tw("divide-y divide-gray-200")}>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <BasketRow
              key={key}
              id={key}
              count={items.length}
              image={items[0]?.image}
              name={items[0]?.name}
              price={items[0]?.price}
            />
          ))}
        </ScrollView>

        <BasketTotal />
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
