import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchBar from "../compositions/SearchBar";
import HirizontalFlatList from "../compositions/HirizontalFlatList";
import SliderBoxSCreen from "../compositions/SliderBox";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getSelectedProduct,
} from "../services/product/product";
import { getImageUrl } from "../common/utils/Functions";
import StarRating from "react-native-star-rating";

const Home = () => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const allproducts = useSelector((state) => state.allProductSlice.allproducts);
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState("all");
  const desciptionMaxLength = 50;
  const brandMaxLength = 6;
  const nameMaxLength = 22;

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    if (allproducts.isSuccess) {
      if (categoryData === "all") {
        const array1 = [];
        allproducts?.data.forEach((val) => {
          array1.push({
            name: val.name,
            description: val.description,
            brand: val.brand,
            price: val.price,
            date: new Date(val.date).toDateString().slice(4, 11),
            image: getImageUrl(val.image),
            alcoholPercentage: val.alcoholPercentage,
            id: val.id,
            averageRating: val.averageRating,
          });
        });
        setData(array1);
      }
    }
  }, [allproducts, categoryData]);

  const images = [
    require("../assets/wineBottles.png"),
    require("../assets/arrackBottle.png"),
    require("../assets/shotGlass.png"),
    require("../assets/offers.png"),
    require("../assets/shotGlass.png"),
  ];

  const loadCategoryData = (value) => {
    if (allproducts.isSuccess) {
      const allData = allproducts?.data;
      if (value === "all") {
        const array1 = [];
        allData.forEach((val) => {
          array1.push({
            name: val.name,
            description: val.description,
            brand: val.brand,
            price: val.price,
            date: new Date(val.date).toDateString().slice(4, 11),
            image: getImageUrl(val.image),
            alcoholPercentage: val.alcoholPercentage,
            id: val.id,
            averageRating: val.averageRating,
          });
        });
        setData(array1);
      } else {
        const data = allData.filter((brandData) => {
          return brandData.brand.toLowerCase() === value;
        });
        const array1 = [];
        data.forEach((val) => {
          array1.push({
            name: val.name,
            description: val.description,
            brand: val.brand,
            price: val.price,
            date: new Date(val.date).toDateString().slice(4, 11),
            image: getImageUrl(val.image),
            alcoholPercentage: val.alcoholPercentage,
            id: val.id,
            averageRating: val.averageRating,
          });
        });
        setData(array1);
      }
    }
  };
  const getCardData = (item) => {
    dispatch(getSelectedProduct(item));
    Navigation.navigate("ProductScreen");
  };

  return (
    <SafeAreaView style={Styles.area}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 2.2,
        }}
      >
        <View style={Styles.searchBar}>
          <SearchBar />
        </View>
        <TouchableOpacity style={Styles.filter}>
          <Image source={require("../assets/filter.png")} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 6 }}>
        <SliderBoxSCreen />
      </View>

      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
        }}
      >
        <View style={{ flex: 3 }}>
          <Text style={Styles.categories}>Categories</Text>
        </View>

        <View style={Styles.Line} />
      </View>

      <View style={{ flex: 1.2 }}>
        <HirizontalFlatList
          item={(value) => {
            loadCategoryData(value);
            setCategoryData(value);
          }}
        />
      </View>

      <View style={{ flex: 10 }}>
        <FlatList
          style={Styles.flatList}
          data={data}
          renderItem={({ item }) => {
            const displayDescription =
              item.description.length > desciptionMaxLength
                ? item.description.substring(0, desciptionMaxLength) + "..."
                : item.description;

            const displayBrand =
              item.brand.length > brandMaxLength
                ? item.brand.substring(0, brandMaxLength) + "..."
                : item.brand;

            const displayName =
              item.name.length > nameMaxLength
                ? item.name.substring(0, nameMaxLength) + "..."
                : item.name;

            return (
              <TouchableOpacity
                style={Styles.Containor}
                onPress={() => {
                  getCardData(item);
                }}
              >
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <View style={Styles.imgContainor}>
                      <Image style={Styles.img} source={{ uri: item.image }} />
                    </View>
                  </View>
                  <View style={{ flex: 3 }}>
                    <View style={Styles.firstFlex}>
                      <View style={{ flex: 2 }}>
                        <Text style={Styles.bottleName}>{displayName}</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={Styles.brandName}>{displayBrand}</Text>
                      </View>
                    </View>
                    <View style={Styles.secondFlex}>
                      <View style={{ flex: 2 }}>
                        <Text style={Styles.description}>
                          {displayDescription}
                        </Text>
                      </View>
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={Styles.date}>{item.date}</Text>
                      </View>
                    </View>
                    <View style={Styles.thirdFlex}>
                      <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={parseFloat(item?.averageRating)}
                        fullStarColor={"#f7a214"}
                        starSize={17}
                      />
                      <View style={Styles.price}>
                        <Text style={{ color: "#DD8A00" }}>
                          Rs: {item.price}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const Styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  categories: {
    fontSize: 15,
    color: "#636363",
    marginLeft: "5%",
  },
  Line: {
    flex: 8,
    width: "30%",
    height: 1,
    backgroundColor: "#DFDFDF",
    marginLeft: "-4%",
    marginTop: "1%",
  },
  Containor: {
    backgroundColor: "#fff",
    borderColor: null,
    marginTop: "1%",
    marginBottom: "1%",
    marginLeft: "1%",
    marginRight: "1%",
    borderRadius: 15,
    shadowColor: "black",
    shadowRadius: 3,
    elevation: 7,
  },
  filter: {
    marginLeft: "18%",
    flex: 1,
  },
  searchBar: {
    flex: 7,
    width: "80%",
    marginLeft: "2%",
  },
  flatList: {
    backgroundColor: "#F9F9F9",
    shadowColor: "black",
  },
  imgContainor: {
    backgroundColor: "#fff",
    borderRadius: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
  },
  img: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
  firstFlex: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    marginTop: "2%",
  },
  secondFlex: {
    flex: 4,
    flexDirection: "row",
    width: "100%",
    marginTop: "2%",
  },
  thirdFlex: {
    flex: 2,
    flexDirection: "row",
    width: "100%",
    marginTop: "2%",
    marginBottom: "2%",
    marginLeft: "2%",
  },
  brandName: {
    backgroundColor: "#DD8A00",
    width: "75%",
    height: "90%",
    borderRadius: 8,
    color: "#fff",
    textAlign: "center",
    paddingLeft: "3%",
    paddingRight: "3%",
  },
  date: {
    color: "#BFBFBF",
    fontSize: 12,
    marginTop: "20%",
    marginRight: "5%",
  },
  bottleName: {
    marginTop: "1%",
    marginLeft: "3%",
    color: "black",
    fontSize: 15,
    fontWeight: "500",
  },
  description: {
    marginLeft: "3%",
    color: "#A6A6A6",
    fontSize: 14,
  },
  price: {
    flex: 1,
    flexDirection: "row",
    marginLeft: "40%",
  },
});
