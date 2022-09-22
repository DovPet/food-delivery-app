import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Currency from "react-currency-formatter";
import {
  selectedBasketItems,
  selectedBasketTotal
} from "../../features/basketSlice";
import { useTailwind } from "tailwind-rn";

const BasketInfo = () => {
  const navigation = useNavigation();
  const items = useSelector(selectedBasketItems);
  const basketTotal = useSelector(selectedBasketTotal);

  const tw = useTailwind();

  if (items.length === 0) return null;

  return (
    <View style={tw("absolute bottom-10 w-full z-50")}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        style={tw(
          "mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-1"
        )}
      >
        <Text
          style={tw("text-white font-extrabold text-lg bg-[#01A296] py-1 px-2")}
        >
          {items.length}
        </Text>
        <Text
          style={tw("flex-1 text-white font-extrabold text-lg text-center")}
        >
          View Basket
        </Text>
        <Text style={tw("text-lg text-white font-extrabold")}>
          <Currency quantity={basketTotal} currency="EUR" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketInfo;
