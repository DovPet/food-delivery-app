import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import { XCircleIcon } from "react-native-heroicons/solid";

const BasketHeader = ({ restaurantTitle }) => {
  const navigation = useNavigation();
  const tw = useTailwind();
  return (
    <>
      <View style={tw("p-5 border-b border-[#00CCBB] bg-white shadow-xs")}>
        <View>
          <Text style={tw("text-lg font-bold text-center")}>Basket</Text>
          <Text style={tw("text-center text-gray-400")}>
            {restaurantTitle}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw("rounded-full bg-gray-100 absolute top-3 right-5 ")}
        >
          <XCircleIcon color="#00CCBB" height={50} width={50} />
        </TouchableOpacity>
      </View>

      <View
        style={tw("flex-row items-center space-x-4 px-4 py-3 bg-white my-5")}
      >
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          style={tw("h-7 w-7 bg-gray-300 p-4 rounded-full mr-3")}
        />
        <Text style={tw("flex-1")}>Deliver in 20-35 min</Text>
        <TouchableOpacity>
          <Text style={tw("text-[#00CCBB]")}>Change</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BasketHeader;
