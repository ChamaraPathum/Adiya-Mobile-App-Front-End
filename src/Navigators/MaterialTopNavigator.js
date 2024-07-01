import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Description from "../screens/InCard/Description";
import Reviews from "../screens/InCard/Reviews";

const Tab = createMaterialTopTabNavigator();

const MaterialTopNavigator = (props) => {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "transparent",
        },
        tabBarActiveTintColor: "#5B5B5B",
        tabBarInactiveTintColor: "#CCCCCC",
        tabBarStyle: {
          marginRight: "35%",
          elevation: 0,
        },
        tabBarPressColor: "#fff",
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontSize: 15,
        },
      }}
    >
      <Tab.Screen name="Description">
          {()=><Description data={props} />}
      </Tab.Screen>

      <Tab.Screen name="Reviews">
          {()=><Reviews data={props} /> }
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default MaterialTopNavigator;
