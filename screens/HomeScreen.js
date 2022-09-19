import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
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
  const tailwind = useTailwind();
  return (
    <SafeAreaView style={tailwind("bg-white pt-5")}>
      {/* HEADER */}
      <>
        <View style={tailwind("flex-row pb-3 items-center mx-4")}>
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            style={tailwind("h-7 w-7 bg-gray-300 rounded-full p-4 mr-2")}
          />
          <View style={tailwind("flex-1")}>
            <Text style={tailwind("font-bold text-blue-400 text-xs")}>
              Deliver Now!
            </Text>
            <Text style={tailwind("font-bold text-xl")}>
              Current Location
              <ChevronDownIcon size={20} color="#00CCBB" />
            </Text>
          </View>
          <UserIcon size={35} color="#00CCBB" />
        </View>
        {/* SEARCH */}
        <View style={tailwind("flex-row items-center mx-4 pb-2")}>
          <View style={tailwind("flex-row flex-1 p-3 bg-gray-200 mr-2")}>
            <MagnifyingGlassIcon color="#00CCBB" size={20} style={tailwind("mr-2")} />
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
