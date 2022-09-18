import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import tw from "tailwind-rn";

const RestaurantScreen = () => {
  const {
    params: {
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
    }
  } = useRoute();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <ScrollView>
      <View style={tw("relative")}>
        <Image
          source={{ uri: urlFor(image).url() }}
          style={tw("w-full h-56 bg-gray-300 p-4")}
        />
        <TouchableOpacity
          style={tw("absolute top-14 left-5 p-2 bg-gray-100 rounded-full")}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={20} color="#00CCBB" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RestaurantScreen;
