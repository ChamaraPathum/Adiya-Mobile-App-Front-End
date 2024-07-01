import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/dist/AntDesign";

const OnBoardingScreen = () => {
  const Navigation = useNavigation();

  const Done = ({ ...props }) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity {...props}>
        <View
          style={{
            marginRight: "10%",
            flexDirection: "row",
            gap: -5,
          }}
        >
          <Icon name="doubleright" size={30} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );

  const Dots = ({ selected }) => {
    let backgroundColor;
    backgroundColor = selected ? "#fff" : "#bfbcb2";
    return (
      <View
        style={{
          width: 12,
          height: 12,
          borderRadius: 100,
          marginHorizontal: 7,
          backgroundColor,
          marginTop: "-50%",
        }}
      ></View>
    );
  };

  return (
    <Onboarding
      bottomBarHighlight={false}
      showSkip={false}
      showNext={false}
      bottomBarHeight={100}
      onDone={() => Navigation.navigate("Login")}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      pages={[
        {
          title: "",
          subtitle: "",
          backgroundColor: "#DD8A00",
          image: <Image source={require("../assets/beer.png")} />,
        },
        {
          title: "",
          backgroundColor: "#DD8A00",
          image: <Image source={require("../assets/map.png")} />,
          subtitle: "",
        },
        {
          title: "",
          backgroundColor: "#DD8A00",
          image: <Image source={require("../assets/shop.png")} />,
          subtitle: "",
        },
        {
          title: "",
          backgroundColor: "#DD8A00",
          image: <Image source={require("../assets/text.png")} />,
          subtitle: "",
        },
      ]}
    />
  );
};

export default OnBoardingScreen;
