import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import tw from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "featured"] {
        ...,
        restaurants[]->{
            ...,
            type-> {
                name
            }
        }
    }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <SafeAreaView style={tw("bg-white pt-5")}>
      {/* HEADER */}
      <>
        <View style={tw("flex-row pb-3 items-center mx-4")}>
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            style={tw("h-7 w-7 bg-gray-300 rounded-full p-4 mr-2")}
          />
          <View style={tw("flex-1")}>
            <Text style={tw("font-bold text-gray-400 text-xs")}>
              Deliver Now!
            </Text>
            <Text style={tw("font-bold text-xl")}>
              Current Location
              <ChevronDownIcon size={20} color="#00CCBB" />
            </Text>
          </View>
          <UserIcon size={35} color="#00CCBB" />
        </View>
        {/* SEARCH */}
        <View style={tw("flex-row items-center mx-4 pb-2")}>
          <View style={tw("flex-row flex-1 p-3 bg-gray-200 mr-2")}>
            <MagnifyingGlassIcon color="#00CCBB" size={20} style={tw("mr-2")} />
            <TextInput
              placeholder="Restaurants and cuisines"
              keyboardType="default"
            />
          </View>
          <AdjustmentsHorizontalIcon color="#00CCBB" />
        </View>
        {/* BODY */}

        <ScrollView>
          <Categories />
          {featuredCategories?.map((category) => (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
              featuredCategory="featured"
              restaurants={category.restaurants}
            />
          ))}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default HomeScreen;
