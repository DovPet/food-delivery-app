import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Currency from "react-currency-formatter";
import { useTailwind } from "tailwind-rn";
import { useSelector } from "react-redux";
import { selectedBasketTotal } from "../../features/basketSlice";

const BasketTotal = () => {
  const DELIVERY_FEE = 2.99;
  const tw = useTailwind();
  const basketSubtotal = useSelector(selectedBasketTotal);
  return (
    <View style={tw("p-5 bg-white mt-5")}>
      <View style={tw("flex-row justify-between mb-4")}>
        <Text style={tw("text-gray-400")}>Subtotal</Text>
        <Text style={tw("text-gray-400")}>
          <Currency quantity={basketSubtotal} currency="EUR" />
        </Text>
      </View>

      <View style={tw("flex-row justify-between mb-4")}>
        <Text style={tw("text-gray-400")}>Delivery Fee</Text>
        <Text style={tw("text-gray-400")}>
          <Currency quantity={DELIVERY_FEE} currency="EUR" />
        </Text>
      </View>

      <View style={tw("flex-row justify-between mb-4")}>
        <Text style={tw("")}>Order total</Text>
        <Text style={tw("font-extrabold")}>
          <Currency quantity={basketSubtotal + DELIVERY_FEE} currency="EUR" />
        </Text>
      </View>

      <TouchableOpacity style={tw("rounded-lg bg-[#00CCBB] p-4")}>
        <Text style={tw("text-center text-white text-lg font-bold")}>
          Place Order
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketTotal;
