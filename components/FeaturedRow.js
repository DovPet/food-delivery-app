import { View, Text, ScrollView } from "react-native";
import React from "react";
import tw from "tailwind-rn";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";

const FeaturedRow = ({ title, description, restaurants }) => {
console.log(restaurants)
  return (
    <View>
      <View style={tw("mt-4 flex-row items-center justify-between px-4")}>
        <Text style={tw("font-bold text-lg")}>{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <Text style={tw("text-xs text-gray-500 px-4")}>{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15
        }}
        showsHorizontalScrollIndicator={false}
        style={tw("pt-4")}
      >
        {restaurants?.map(restaurant => (
            <RestaurantCard 
                key={restaurant._id}
                id={restaurant._id}
                image={restaurant.image}
                address={restaurant.address}
                title={restaurant.title}
                rating={restaurant.rating}
                short_description={restaurant.short_description}
                genre={restaurant.genre}
                lat={restaurant.lat}
                long={restaurant.long}
            />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
