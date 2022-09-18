import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "tailwind-rn";
import { MapPinIcon, StarIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({
  id,
  image,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={tw("bg-white mr-3")}
      onPress={() => navigation.navigate("Restaurant", {
        id,
        image,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat
      })}
    >
      <Image
        source={{ uri: urlFor(image).url() }}
        style={tw("h-36 w-64 rounded-sm")}
      />
      <View style={tw("px-3 pb-3")}>
        <Text style={tw("font-bold text-lg pt-2")}>{title}</Text>
        <View style={tw("flex-row items-center mx-1")}>
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text style={tw("text-xs text-gray-500")}>
            <Text style={tw("text-green-500")}>{rating}</Text> - {genre}
          </Text>
        </View>

        <View style={tw("flex-row items-center mr-1")}>
          <MapPinIcon color="green" opacity={0.4} size={22} />
          <Text style={tw("text-xs")}>Nearby - {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
