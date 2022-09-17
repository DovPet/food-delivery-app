import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <Stack.Navigator>
          <Stack name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </TailwindProvider>
    </NavigationContainer>
  );
}
