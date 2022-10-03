import { SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { useTailwind } from "tailwind-rn";
import * as Animatible from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setOrderWasPlaced, emptyBasket } from "../features/basketSlice";

const PreparingOrderScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setOrderWasPlaced());
    dispatch(emptyBasket());
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 10000);
  }, []);
  return (
    <SafeAreaView style={tw("bg-[#00CCBB] flex-1 justify-center items-center")}>
      <Animatible.Image
        source={require("../assets/processOrder.gif")}
        animation="slideInUp"
        iterationCount={1}
        style={tw("h-96 w-96")}
      />

      <Animatible.Text
        animation="slideInUp"
        iterationCount={1}
        style={tw("text-lg my-10 text-white font-bold text-center")}
      >
        Waiting for Restaurant to accept your order!
      </Animatible.Text>
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
