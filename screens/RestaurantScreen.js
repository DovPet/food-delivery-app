import { View, Image, TouchableOpacity, ScrollView, Text } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import client, { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  StarIcon
} from "react-native-heroicons/solid";
import { useTailwind } from "tailwind-rn";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketInfo from "../components/BasketInfo";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

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
      long,
      lat
    }
  } = useRoute();
  const tw = useTailwind();
  const navigation = useNavigation();
  const [dishes, setDishes] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setRestaurant({
        id,
        image,
        title,
        rating,
        genre,
        address,
        short_description,
        long,
        lat
    }))
  },[])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "restaurant" && _id == $id]{
        ...,
              dishes[]->
      }[0]`,
        { id }
      )
      .then((data) => {
        setDishes(data.dishes);
      });
  }, [id]);
  return (
    <>
      <BasketInfo />
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

        <View style={tw("bg-white")}>
          <View style={tw("px-4 pt-4")}>
            <Text style={tw("text-3xl font-bold")}>{title}</Text>
            <View style={tw("flex-row my-1")}>
              <View style={tw("flex-row items-center")}>
                <StarIcon color="green" opacity={0.5} size={22} />
                <Text style={tw("text-xs text-gray-500 mx-2")}>
                  <Text style={tw("text-green-500")}>{rating}</Text> - {genre}
                </Text>
              </View>

              <View style={tw("flex-row items-center")}>
                <MapPinIcon color="gray" opacity={0.4} size={22} />
                <Text style={tw("text-xs text-gray-500 mx-2")}>{address}</Text>
              </View>
            </View>
            <Text style={tw("text-gray-500 mt-2 pb-4")}>
              {short_description}
            </Text>
          </View>
          <TouchableOpacity
            style={tw("flex-row items-center p-4 border-y border-gray-300")}
          >
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
            <Text style={tw("pl-2 flex-1 text-base font-bold")}>
              Have a food allergy?
            </Text>
            <ChevronRightIcon color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View style={tw("pb-36")}>
          <Text style={tw("px-4 pt-6 mb-3 font-bold text-xl")}>Menu</Text>
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
