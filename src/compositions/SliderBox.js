import { View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const SliderBoxSCreen = () => {
  const Images = [
    require("../assets/wineBottles.png"),
    require("../assets/shotGlass.png"),
    require("../assets/offers.png"),
    require("../assets/arrackBottle.png"),
  ];
  return (
    <View>
      <SliderBox
        images={Images}
        sliderBoxHeight={200}
        dotColor="#DD8A00"
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={20}
        autoplay={true}
        autoplayIntervel={1000}
        circleLoop={true}
        resizeMethod={"resize"}
        resizeMode={"cover"}
        firstItem={4}
        alignSelf="center"
        paginationBoxStyle={{
          position: "absolute",
          bottom: 0,
          padding: 0,

          paddingVertical: 10,
        }}
        dotStyle={{
          width: 15,
          height: 15,
          borderRadius: 100,
          padding: 0,
          margin: 0,
        }}
        ImageComponentStyle={{
          borderRadius: 28,
          width: "90%",
          height: "100%",
        }}
        imageLoadingColor="Black"
      />
    </View>
  );
};

export default SliderBoxSCreen;
