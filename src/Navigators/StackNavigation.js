import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";
import SignUP from "../screens/SignUp";
import BottomTabNavigator from "../screens/BottomTabNavigator";
import ProductScreen from "../screens/ProductScreen";
import BottomTabNavigator2 from "../screens/BottomTabNavigator2";
import GoogleMap from "../screens/GoogleMap";
import EditProfile from "../screens/EditProfile";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function StackNavigation() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("alreadylaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadylaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch == null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen
            options={{ headerShown: false }}
            name="OnBoardScreen"
            component={OnBoardingScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={SignUP}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="BottomTabNavigator"
            component={BottomTabNavigator}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ProductScreen"
            component={ProductScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="EditProfile"
            component={EditProfile}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="BottomTabNavigator2"
            component={BottomTabNavigator2}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Map"
            component={GoogleMap}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={SignUP}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="BottomTabNavigator"
            component={BottomTabNavigator}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ProductScreen"
            component={ProductScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="EditProfile"
            component={EditProfile}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="BottomTabNavigator2"
            component={BottomTabNavigator2}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Map"
            component={GoogleMap}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default StackNavigation;
