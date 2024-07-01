import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Home from "../screens/Home";
import GoogleMap from "../screens/GoogleMap";
import Profile from "../screens/Profile";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Category from "../screens/Category";
import Food from "../screens/Food";
import Promotion from "../screens/Promotion";

const Tab = createBottomTabNavigator();

const TabNavigation2 = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                showLabel: false,
                tabBarStyle: {
                    position: "relative",
                    elevation: 0,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 30,
                    height: "9%",
                    borderTopColor: "#FFFFFF"
                },
                tabBarActiveTintColor: "#DD8A00",
                tabBarInactiveTintColor: "gray",
            }}
        >
            <Tab.Screen
                name="Caregory"
                component={Category}
                options={{
                    headerShown: false,
                    tabBarLabel: "Caregory",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="glass-mug" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Food"
                component={Food}
                options={{
                    headerShown: false,
                    tabBarLabel: "Food",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="noodles"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Promotion"
                component={Promotion}
                options={{
                    headerShown: false,
                    tabBarLabel: "Promotion",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="wallet-giftcard" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigation2;

