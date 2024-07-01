import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Star from "react-native-vector-icons/dist/FontAwesome";
import MaterialTopNavigator from "../Navigators/MaterialTopNavigator";
import { useDispatch, useSelector } from "react-redux";
import { getProductReviews } from "../services/product/product";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { getImageUrl } from "../common/utils/Functions";

const ProductScreen = () => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const selectedProduct = useSelector(
    (state) => state.productScreenSlice.selectedProduct
  );
  const productReviews = useSelector(
    (state) => state.getReviewsSlice.productReviews
  );
  const productId = selectedProduct.data.id;

  useEffect(() => {
    dispatch(getProductReviews(productId));
  }, []);

  const [data, setData] = useState({
    name: "",
    description: "",
    brand: "",
    price: null,
    date: "",
    image: getImageUrl(""),
    alcoholPercentage: null,
    id: null,
  });

  useEffect(() => {
    const selectedData = selectedProduct?.data;
    setData({
      ...data,
      name: selectedData.name,
      description: selectedData.description,
      brand: selectedData.brand,
      price: selectedData.price,
      date: selectedData.date,
      image: selectedData.image,
      alcoholPercentage: selectedData.alcoholPercentage,
      id: selectedData.id,
    });
  }, [selectedProduct]);

  return (
    <SafeAreaView style={styles.Containor}>
      <View style={styles.BottleContent}>
        <View style={styles.BottleContent1}>
          <TouchableOpacity
            onPress={() => Navigation.navigate("BottomTabNavigator")}
          >
            <MaterialIcons name="arrow-back-ios" size={20} color="#808080" />
          </TouchableOpacity>
        </View>
        <View style={styles.BottleContent2}>
          {data.image ? (
            <Image style={styles.img} source={{ uri: data.image }} />
          ) : (
            <Text>No image available</Text>
          )}
        </View>
        <View style={styles.BottleContent3}></View>
      </View>

      <View style={styles.BottomPart}>
        <View style={styles.DescriptionContainor}>
          <View style={styles.DescriptionBox}>
            <View style={styles.Description1}>
              <View style={styles.rate}>
                <Text>
                  <Star name="star" size={23} color="#f7a214" />
                </Text>
                <Text style={styles.RatingNumber}>
                  {" "}
                  {productReviews.data.averageRating}
                </Text>
                <Text style={styles.RatingReviews}>
                  {" "}
                  ({productReviews.data.reviewCount} Reviews)
                </Text>
              </View>
              <View style={styles.date}>
                <Text style={styles.DateTxt}>{data.date}</Text>
              </View>
            </View>

            <View style={styles.Description2}>
              <View style={styles.productname}>
                <Text style={styles.name}>
                  {data.name}
                  <Text style={styles.alcohole}>
                    {" "}
                    ({data.alcoholPercentage})
                  </Text>
                </Text>
              </View>
              <View style={styles.productprice}>
                <Text style={styles.Rs}>Rs: </Text>
                <Text style={styles.Amount}>{data.price}</Text>
              </View>
            </View>
            <View style={styles.Line} />
          </View>

          <View style={styles.DescriptionReview}>
            <MaterialTopNavigator Data={data} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  Containor: {
    flex: 1,
    backgroundColor: "#fff",
  },
  BottleContent: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "#E3E4E8",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    padding: "2%",
  },
  BottleContent1: {
    flex: 1,
    paddingTop: "2%",
  },
  BottleContent2: {
    flex: 3,
  },
  BottleContent3: {
    flex: 1,
  },
  BottomPart: {
    flex: 2.5,
  },
  img: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  DescriptionContainor: {
    flex: 1,
    flexDirection: "column",
  },
  DescriptionBox: {
    flex: 1,
    flexDirection: "column",
    marginTop: "1%",
  },
  DescriptionReview: {
    flex: 3,
  },
  Description1: {
    flex: 0.7,
    flexDirection: "row",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "1%",
  },
  Description2: {
    flex: 2,
    flexDirection: "row",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "1%",
  },
  rate: {
    flex: 3,
    flexDirection: "row",
  },
  date: {
    flex: 1,
  },
  productname: {
    flex: 4,
    flexDirection: "row",
    paddingRight: "1%",
  },
  productprice: {
    flex: 1,
    flexDirection: "row",
    paddingTop: "1%",
    justifyContent: "flex-end",
  },
  RatingNumber: {
    fontSize: 15,
    fontWeight: "700",
    color: "black",
  },
  RatingReviews: {
    fontSize: 15,
    fontWeight: "600",
    color: "#CDCDCD",
  },
  name: {
    fontSize: 25,
    fontWeight: "700",
    color: "black",
  },
  alcohole: {
    fontSize: 15,
    fontWeight: "500",
    color: "#CDCDCD",
    marginTop: "2%",
  },
  DateTxt: {
    textAlign: "right",
    color: "#ADADAD",
  },
  Line: {
    width: "90%",
    height: 1,
    backgroundColor: "#D6D6D6",
    marginLeft: "5%",
    marginRight: "5%",
  },
  Rs: {
    fontSize: 18,
    color: "black",
  },
  Amount: {
    fontSize: 18,
    color: "#DD8A00",
  },
});
