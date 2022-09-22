import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { useTailwind } from "tailwind-rn";
import Currency from "react-currency-formatter";
import { urlFor } from "../../sanity";
import { removeFromBasket } from "../../features/basketSlice";

const BasketRow = ({ id, count, image, name, price }) => {
    const dispatch = useDispatch()
    const tw = useTailwind()
  return (
    <View
      style={tw("flex-row items-center space-x-3 bg-white py-2 px-5")}
    >
      <Text style={tw("text-[#00CCBB]")}>{count} x</Text>
      <Image
        source={{ uri: urlFor(image).url() }}
        style={tw("h-12 w-12 rounded-full mx-3")}
      />
      <Text style={tw("flex-1")}>{name}</Text>
      <Text>
        <Currency quantity={price} currency="EUR" />
      </Text>
      <TouchableOpacity onPress={() => dispatch(removeFromBasket({ id }))}>
        <Text style={tw("text-[#00CCBB] text-xs ml-3")}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketRow;
